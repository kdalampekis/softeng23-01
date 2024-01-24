from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload/titlebasics/', UploadTitleBasics, name='upload_title_basics')
]