from django.urls import path
from .views import TitleBasicList,TitleDetailView
from .views import SearchTitleView,FilteredTitleObjectsView,NameObjectView,NameObjectDetailView,SearchNameView

urlpatterns = [
    # ... other url patterns ...

    # ///////////////////////////   END POINTS NECESSARY           ////////////////////////////

    path('title/', TitleBasicList.as_view(), name='title-basic-list'),
    path('title/<str:titleID>/', TitleDetailView.as_view(), name='title-detail'),
    path('searchtitle/', SearchTitleView.as_view(), name='search-title'),
    path('bygenre/', FilteredTitleObjectsView.as_view(), name='filtered-title-objects'),
    
    path('name/', NameObjectView.as_view(), name='name-basic-list'),
    path('name/<str:nameID>/', NameObjectDetailView.as_view(), name='name-detail'),
    path('searchname/', SearchNameView.as_view(), name='search-name'),

    # //////////////////////////////////////////////////////////////////
    # //////////////////////////////////////////////////////////////////

    # ///////////////////////////   END POINTS FROM REQUIREMENTS    ////////////////////

    # 1ST REQUIREMENT:
    # Choose N movies with the best rating from a specific genre


    path('1strequirement/')


    # //////////////////////////////////////////////////////////////////////////////////

]
