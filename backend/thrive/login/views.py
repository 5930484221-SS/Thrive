import secrets
from django.http import (HttpResponseBadRequest, HttpResponseNotFound, JsonResponse,
                         HttpResponseForbidden, HttpResponse)
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from thrive.mongo_connection import mongo_db


course_fields = ['topic', 'description', 'descriptionProfile', 'duration',
                 'fee', 'location', 'subject', 'tuition']


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

    record = dict()
    for field in course_fields:
        record[field] = request.POST.get(field)

    collection = mongo_db.get_collection('courses')
    collection.insert_one(record)

    return HttpResponse('')


@csrf_exempt
@require_http_methods(["POST", "GET"])
def get_courses(request):
    collection = mongo_db.get_collection('courses')
    courses = list({s:t[s] for s in course_fields} for t in collection.find({}))

    response = JsonResponse(dict(courses=courses))

    return set_response_header(response)


@csrf_exempt
@require_http_methods(["POST"])
def logout(request):
    token = request.POST.get("token")
    collection = mongo_db.get_collection('active_token')
    collection.delete_many({'token': token})

    return HttpResponse('')
