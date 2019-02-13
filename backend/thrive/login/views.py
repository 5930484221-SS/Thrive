import re
import secrets
from bson.objectid import ObjectId
from bson.son import SON
from django.http import (HttpResponseBadRequest, HttpResponseNotFound, JsonResponse,
                         HttpResponseForbidden, HttpResponse)
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from thrive.mongo_connection import mongo_db


course_fields = ['topic', 'description', 'descriptionProfile', 'duration',
                 'fee', 'location', 'subject', 'tuition', 'img']
user_detail_fields = ['user', 'display']
course_number_fields = ['fee', 'tuition', 'rating']


def set_response_header(response):
    response.__setitem__("Content-type", "application/json")
    response.__setitem__("Access-Control-Allow-Origin", "*")
    return response


def get_or_create_token(user):
    collection = mongo_db.get_collection('active_token')
    match = collection.find_one({'user': user})

    if match is None:
        token = secrets.token_hex()
        collection.insert_one({'user': user, 'token': token})
    else:
        token = match['token']

    return token


def authenticate(username, password):
    collection = mongo_db.get_collection('users')
    match = collection.find_one({'user': username, 'password': password})

    if match:
        return get_or_create_token(username)
    return None


def get_username_from_token(token):
    collection = mongo_db.get_collection('active_token')
    match = collection.find_one({'token': token})

    user = None
    if match is not None:
        user = match['user']

    return user


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    if username is None or password is None:
        return HttpResponseBadRequest('Please provide both username and password')

    token = authenticate(username=username, password=password)

    if not token:
        return HttpResponseNotFound('Invalid Credentials')

    return JsonResponse(dict(token=token))


@csrf_exempt
@require_http_methods(["POST"])
def create_course(request):
    token = request.POST.get('token')
    user = get_username_from_token(token)
    
    if user is None:
        return HttpResponseForbidden("please login first")

    record = dict(tutor=user)

    for field in course_fields:
        value = request.POST.get(field)
        if field in course_number_fields:
            value = float(value)
        record[field] = value

    record['rating_1'] = 0
    record['rating_2'] = 0
    record['rating_3'] = 0
    record['rating_4'] = 0
    record['rating_5'] = 0

    collection = mongo_db.get_collection('courses')
    collection.insert_one(record)

    return HttpResponse('')


def get_course_query_object(data):
    fields_exact = ['subject', 'tutor']
    fields_substring = ['description', 'descriptionProfile', 'location', 'topic']
    fields_range = ['fee', 'tuition', 'rating']

    query_object = dict()

    for field in fields_exact:
        value = data.get(field)
        if value:
            query_object[field] = re.compile(rf'^{value}$', re.IGNORECASE)

    for field in fields_substring:
        value = data.get(field)
        if value:
            query_object[field] = re.compile(rf'.*{value}.*', re.IGNORECASE)

    for field in fields_range:
        value_min = data.get(f'{field}Min')
        value_max = data.get(f'{field}Max')

        q = dict()
        if value_min:
            q['$gte'] = float(value_min)
        if value_max:
            q['$lte'] = float(value_max)

        if q:
            query_object[field] = q

    return query_object


@csrf_exempt
@require_http_methods(["POST", "GET"])
def get_courses(request):
    
    print(request.GET.get('tutor'))
    
    collection = mongo_db.get_collection('courses')

    limit = request.GET.get('limit')
    last_id = request.GET.get('lastId')
    _id = request.GET.get('id')
    order = int(request.GET.get('order', 1))

    qobj = dict()
    if _id:
        qobj = {'_id': ObjectId(_id)}
    else:
        qobj = get_course_query_object(request.GET)
        if last_id:
            cmp = '$gt' if order == 1 else '$lt'
            qobj['_id'] = {cmp: ObjectId(last_id)}

    lookup_stage = {'as': 'tutor_detail', 'foreignField': 'user', 'from': 'users', 'localField': 'tutor'}

    pipeline = [{'$match': qobj},
                {'$lookup': lookup_stage},
                {'$sort': SON([('_id', order)])}]
    if limit:
        pipeline.append({'$limit': int(limit)})

    query = collection.aggregate(pipeline)

    courses = []
    for record in query:
        course = {field: str(record[field]) for field in course_fields + ['_id']}
        course['tutor'] = record['tutor']
        course['tutor_display'] = record['tutor_detail'][0]['display']
        courses.append(course)

    response = JsonResponse(dict(courses=courses))

    return set_response_header(response)


@csrf_exempt
@require_http_methods(["POST", "GET"])
def get_tutors(request):
    collection = mongo_db.get_collection('users')

    limit = request.GET.get('limit')
    last_id = request.GET.get('lastId')
    _id = request.GET.get('id')
    order = int(request.GET.get('order', 1))

    user = request.GET.get('user')
    display = request.GET.get('display')

    qobj = dict()
    if _id:
        qobj = {'_id': ObjectId(_id)}
    elif user:
        qobj = {'user': user}
    else:
        if display:
            qobj['display'] = re.compile(rf'.*{display}.*', re.I)

        if last_id:
            cmp = '$gt' if order == 1 else '$lt'
            qobj['_id'] = {cmp: ObjectId(last_id)}

    lookup_stage = {'from': 'courses',
                    'let': {'tutor': '$user'},
                    'pipeline': [{'$match': {'$expr': {'$eq': ['$tutor', '$$tutor']}}},
                                 {'$count': 'n_courses'}],
                    'as': 'courses'}

    pipeline = [{'$match': qobj},
                {'$lookup': lookup_stage},
                {'$sort': SON([('_id', order)])},
                {'$match': {'courses': {'$not': {'$size': 0}}}}]
    if limit:
        pipeline.append({'$limit': int(limit)})

    query = collection.aggregate(pipeline)

    tutors = []
    for record in query:
        tutor = {field: str(record[field]) for field in user_detail_fields + ['_id']}
        tutor['n_courses'] = record['courses'][0]['n_courses']
        tutors.append(tutor)

    response = JsonResponse(dict(courses=tutors))

    return set_response_header(response)


@csrf_exempt
@require_http_methods(["POST"])
def logout(request):
    token = request.POST.get("token")
    collection = mongo_db.get_collection('active_token')
    collection.delete_many({'token': token})

    return HttpResponse('')


# sprint2
@csrf_exempt
@require_http_methods(["POST"])
def edit_course(request):
    token = request.POST.get('token')
    user = get_username_from_token(token)

    if user is None:
        return HttpResponseForbidden("please login first")

    _id = request.POST.get('id')

    record = dict()
    for field in course_fields:
        value = request.POST.get(field)
        if field in course_number_fields:
            value = float(value)
        record[field] = value

    collection = mongo_db.get_collection('courses')
    collection.update({'_id': _id}, {'$set': record})

    return HttpResponse('')


@csrf_exempt
@require_http_methods(["POST"])
def delete_course(request):
    token = request.POST.get('token')
    user = get_username_from_token(token)

    if user is None:
        return HttpResponseForbidden("please login first")

    _id = request.POST.get('id')

    pass  # check autherization bf delete course

    return HttpResponse('')


@csrf_exempt
@require_http_methods(["POST"])
def get_courses_by_student(request):  # rename???
    token = request.POST.get('token')
    user = get_username_from_token(token)
    pass
