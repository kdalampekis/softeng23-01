from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload/titlebasics/', UploadTitleBasics, name='upload_title_basics'),
    path('upload/titleakas/', UploadTitleAkas, name='upload_title_akas'),
    path('upload/names/', UploadNames, name='upload_names'),
    path('upload/principals/', UploadNames, name='upload_names'),

    path('healthcheck', health_check, name='health_check'),
]