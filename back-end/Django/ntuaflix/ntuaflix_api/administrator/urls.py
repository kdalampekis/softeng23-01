from django.urls import path
from .views import *

urlpatterns = [
    path('upload/titlebasics/', UploadTitleBasics, name='upload_title_basics'),
    path('upload/titleakas/', UploadTitleAkas, name='upload_title_akas'),
    path('upload/namebasics/', UploadNameBasics, name='upload_name_basics'),
    path('upload/titlecrew/', UploadTitleCrew, name='upload_title_crew'),
    path('upload/titleepisode/', UploadTitleEpisode, name='upload_title_episode'),
    path('upload/titleprincipals/', UploadTitlePrincipals, name='upload_title_principals'),
    path('upload/titleratings/', UploadTitleRatings, name='upload_title_ratings'),
    path('healthcheck', health_check, name='health_check'),
    path('usermod/<str:username>/<str:password>/', add_user, name='add_user'),
    path('users/<str:username>/', UserInfoAPIView.as_view(), name='user_info'),
    path('resetall/', reset_all, name='reset_all'),
]
