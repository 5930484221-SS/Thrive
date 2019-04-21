import datetime
import re
import datetime
import secrets
from bson.objectid import ObjectId
from bson.son import SON
from django.http import (HttpResponseBadRequest, HttpResponseNotFound, JsonResponse,
                         HttpResponseForbidden, HttpResponse)
from django.http.request import QueryDict
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from thrive.mongo_connection import mongo_db
from pymongo.results import DeleteResult, UpdateResult


course_fields = ['topic', 'description', 'descriptionProfile', 'duration',
                 'fee', 'location', 'subject', 'tuition', 'img']
user_detail_fields = ['user', 'display']
course_number_fields = ['fee', 'tuition', 'rating']
user_info_fields = ['user', 'display']


def safe_cast(dtype, value, default=None):
    try:
        return dtype(value)
    except ValueError:
        return default


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

def now():
    return '11-04-2562'


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
def register(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    first_name = request.POST.get("firstName", '')
    last_name = request.POST.get("lastName", '')
    nickname = request.POST.get("nickname", '')
    display_name = request.POST.get("displayName", '')
    address = request.POST.get("address", '')
    phone_number = request.POST.get("phoneNumber", '')
    email = request.POST.get("email", '')
    contact = request.POST.get("contact", '')

    if username is None or password is None:
        return HttpResponseBadRequest('Please provide both username and password')

    collection = mongo_db.get_collection('users')
    match = collection.find_one({'user': username})

    if match:
        return HttpResponseBadRequest('The username already exists')

    record = {
        'user': username,
        'password': password,

        'first_name': first_name,
        'last_name': last_name,
        'nickname': nickname,
        'display': display_name,

        'address': address,
        'phone_number': phone_number,
        'email': email,
        'contact': contact,
    }
    collection.insert_one(record)

    return HttpResponse('')


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
    token = request.POST.get('token', 'test')
    user = get_username_from_token(token)

    if user is None:
        return HttpResponseForbidden("please login first")

    record = dict(tutor=user)

    for field in course_fields:
        value = request.POST.get(field, '')
        if field in course_number_fields:
            value = safe_cast(float, value, 0)
        record[field] = value

    record['rating_1'] = 0
    record['rating_2'] = 0
    record['rating_3'] = 0
    record['rating_4'] = 0
    record['rating_5'] = 0

    collection = mongo_db.get_collection('courses')
    collection.insert_one(record)

    return HttpResponse('')


def get_course_query_object(data: QueryDict):
    fields_exact = ['tutor']
    fields_substring = ['description', 'descriptionProfile', 'location', 'topic']
    fields_range = ['fee', 'tuition', 'rating']
    fields_multi = ['subject']

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

    for field in fields_multi:
        values = data.getlist('subject')
        if not values:
            continue
        value = '|'.join(values)
        if value:
            query_object[field] = re.compile(rf'^(?:{value})$', re.IGNORECASE)

    return query_object


def get_user_info_from_token(token):
    collection = mongo_db.get_collection('active_token')

    lookup_stage = {'as': 'user_info', 'foreignField': 'user', 'from': 'users', 'localField': 'user'}

    pipeline = [{'$match': {'token': token}},
                {'$lookup': lookup_stage}]

    query = list(collection.aggregate(pipeline))
    if query:
        record = query[0]['user_info'][0]
        user_info = {field: str(record[field]) for field in user_info_fields}
        return user_info
    return dict()


@csrf_exempt
@require_http_methods(["GET"])
def get_courses(request):
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
@require_http_methods(["GET"])
def user(request):
    result_keys = {'user': 'username', 'first_name': 'firstName', 'last_name': 'lastName', 'nickname': 'nickname',
                   'display': 'displayName', 'address': 'address', 'phone_number': 'phoneNumber', 'email': 'email',
                   'contact': 'contact'}

    collection = mongo_db.get_collection('users')

    username = request.GET.get('username')

    match = collection.find_one({'user': username})

    if not match:
        return HttpResponseNotFound('The given username does not exist')

    result = {v: match[k] for k, v in result_keys.items()}
    response = JsonResponse(result)

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
    collection.update({'_id': ObjectId(_id)}, {'$set': record})

    return HttpResponse('')


@csrf_exempt
@require_http_methods(["POST"])
def close_course(request):
    token = request.POST.get('token')
    user = get_username_from_token(token)

    if user is None:
        return HttpResponseForbidden("please login first")

    _id = request.POST.get('id')

    collection_course = mongo_db.get_collection('courses')
    collection_reserve = mongo_db.get_collection('reserve')

    filter_data = {'_id': ObjectId(_id), 'tutor': user}
    update_data = {'$set': {'status': 'closed'}}
    ret = collection_course.update_one(filter_data, update_data)  # type: UpdateResult

    if ret.modified_count:
        filter_data = {'course_id': ObjectId(_id), 'status': {'$nin': ['c', 's', 'cs', 'x']}}
        update_data = {'status': 'c'}
        collection_reserve.update_many(filter_data, {'$set': update_data})

        filter_data = {'course_id': ObjectId(_id), 'status': 's'}
        update_data = {'status': 'cs'}
        collection_reserve.update_many(filter_data, {'$set': update_data})

        return HttpResponse('')

    return HttpResponseForbidden('the action is not allowed')


@csrf_exempt
@require_http_methods(["POST"])
def delete_course(request):
    token = request.POST.get('token')
    user = get_username_from_token(token)

    if user is None:
        return HttpResponseForbidden("please login first")

    _id = request.POST.get('id')
    collection_reserve = mongo_db.get_collection('reserve')
    collection_course = mongo_db.get_collection('courses')

    filter_data = {'course_id': ObjectId(_id), 'status': 's'}
    reservation_sample = collection_reserve.find_one(filter_data)
    is_reserved = bool(reservation_sample)
    if is_reserved:
        if reservation_sample['tutor'] != user:
            return HttpResponseForbidden('the action is not allowed')
        return HttpResponseForbidden('the course has been reserved')

    filter_data = {'_id': ObjectId(_id), 'tutor': user}
    ret = collection_course.delete_one(filter_data)
    if not ret.deleted_count:
        return HttpResponseForbidden('the action is not allowed')

    collection_reserve.update_many({'course_id': ObjectId(_id)}, {'$set': {'status': 'x'}})

    return HttpResponse('')


@csrf_exempt
@require_http_methods(["POST"])
def get_courses_by_student(request):  # rename???
    token = request.POST.get('token')
    user = get_username_from_token(token)
    pass


@csrf_exempt
@require_http_methods(["GET"])
def get_user(request):
    token = request.GET.get('token')
    user_info = get_user_info_from_token(token)
    if user_info:
        response = JsonResponse(user_info)
        return set_response_header(response)

    return HttpResponseNotFound('token not found')

@csrf_exempt
@require_http_methods(["POST"])
def create_request(request):
    token = request.POST.get('token')
    tutor = request.POST.get('tutor')
    courseId = request.POST.get('courseId')
    user = get_username_from_token(token)

    collection = mongo_db.get_collection('requests')
    collection.insert_one({'courseId': ObjectId(courseId), 'learner': user, 'tutor': tutor, 'flag': 'REQUESTED',
    'requestTimestamp': datetime.datetime.now(), 'responseTimestamp': None, 'paymentTimestamp': None})
    return HttpResponse('')

@csrf_exempt
@require_http_methods(["POST"])
def get_learner_transactions(request):
    token = request.POST.get('token')
    user = get_username_from_token(token)
    #get all req and res as a learner

    lookup_stage = {'from': 'courses',
                    'let': {'id': '$courseId'},
                    'pipeline': [{'$match': {'$expr': {'$eq': ['$_id', '$$id']}}}],
                    'as': 'course'}

    qobj = dict()
    # print(user)
    qobj = {'learner': user}
    pipeline = [{'$match': qobj},
                {'$lookup': lookup_stage}]

    collection = mongo_db.get_collection('requests')
    query = collection.aggregate(pipeline)

    requests=[]
    for record in query:
        request = {field: str(record[field]) for field in ['_id']}
        record['_id'] =  str(record['_id'])
        record['courseId'] =  str(record['courseId'])
        record['course'][0]['_id'] =  str(record['course'][0]['_id'])
        # print(record)
        requests.append(record)
    response = JsonResponse(dict(requests=requests))
    return set_response_header(response)

@csrf_exempt
@require_http_methods(["POST"])
def get_tutor_transactions(request):  # rename???
    token = request.POST.get('token')
    user = get_username_from_token(token)
    #get all req and res as a learner

    lookup_stage = {'from': 'courses',
                    'let': {'id': '$courseId'},
                    'pipeline': [{'$match': {'$expr': {'$eq': ['$_id', '$$id']}}}],
                    'as': 'course'}

    qobj = dict()
    # print(user)
    qobj = {'tutor': user}
    pipeline = [{'$match': qobj},
                {'$lookup': lookup_stage}]

    collection = mongo_db.get_collection('requests')
    query = collection.aggregate(pipeline)

    requests=[]
    for record in query:
        request = {field: str(record[field]) for field in ['_id']}
        record['_id'] =  str(record['_id'])
        record['courseId'] =  str(record['courseId'])
        record['course'][0]['_id'] =  str(record['course'][0]['_id'])
        # print(record)
        requests.append(record)
    response = JsonResponse(dict(requests=requests))
    return set_response_header(response)

@csrf_exempt
@require_http_methods(["POST"])
def set_flag(request):  # rename???
    token = request.POST.get('token')
    user = get_username_from_token(token)

    if user is None:
        return HttpResponseForbidden("please login first")

    _id = request.POST.get('id')
    flag = request.POST.get('flag')

    record = dict()
    record['flag'] = flag

    collection = mongo_db.get_collection('requests')
    collection.update({'_id': ObjectId(_id)}, {'$set': record})

    return HttpResponse('')
