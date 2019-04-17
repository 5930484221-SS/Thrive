from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('create_course', views.create_course, name='create_course'),
    path('edit_course', views.edit_course, name='edit_course'),
    path('get_courses', views.get_courses, name='get_courses'),
    path('get_tutors', views.get_tutors, name='get_tutors'),
    path('user', views.user, name='user'),
    path('logout', views.logout, name='logout'),
    path('delete_course', views.delete_course, name='delete_course'),
    path('close_course', views.close_course, name='close_course'),
]
