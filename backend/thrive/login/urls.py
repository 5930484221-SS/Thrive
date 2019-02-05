from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('create_course', views.create_course, name='create_course'),
    path('get_courses', views.get_courses, name='get_courses'),
    path('logout', views.logout, name='logout'),
]