from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('edit_profile', views.edit_profile, name='edit_profile'),
    path('register', views.register, name='register'),
    path('create_course', views.create_course, name='create_course'),
    path('edit_course', views.edit_course, name='edit_course'),
    path('get_courses', views.get_courses, name='get_courses'),
    path('get_courses_by_learner', views.get_courses_by_learner, name='get_courses_by_learner'),
    path('get_tutors', views.get_tutors, name='get_tutors'),
    path('user', views.user, name='user'),
    path('users', views.users, name='users'),
    path('delete_user', views.delete_user, name='delete_user'),
    path('logout', views.logout, name='logout'),
    path('delete_course', views.delete_course, name='delete_course'),
    path('create_reserve', views.create_reserve, name='create_reserve'),
    path('get_learner_transactions', views.get_learner_transactions, name='get_learner_transactions'),
    path('get_tutor_transactions', views.get_tutor_transactions, name='get_tutor_transactions'),
    path('close_course', views.close_course, name='close_course'),
    path('dashboard', views.get_dashboard_data, name='dashboard'),
    path('accept', views.accept, name='accept'),
    path('decline', views.decline, name='decline'),
    path('charge', views.charge, name='charge')
]
