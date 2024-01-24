from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload/titlebasics/', UploadTitleBasics, name='upload_title_basics'),
    path('healthcheck', health_check, name='health_check'),
    path('resetall', reset_all, name='reset_all'),
]