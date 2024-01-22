from django.urls import path
from .views import *
urlpatterns = [
    # ... other url patterns ...

    # ///////////////////////////   END POINTS NECESSARY           ////////////////////////////

    path('title/', TitleBasicList.as_view(), name='title-basic-list'),
    path('title/<str:titleID>/', TitleDetailView.as_view(), name='title-detail'),
    path('searchtitle/', SearchTitleView.as_view(), name='search-title'),

        # /////////////////     FILTERS     ////////////////////////////////////////
    path('bygenre/', FilteredTitleObjectsView.as_view(), name='filtered-title-objects'),
    

        # /////////////////     NAMES     ////////////////////////////////////////

    path('name/', NameObjectView.as_view(), name='name-basic-list'),
    path('name/<str:nameID>/', NameBiography.as_view(), name='name-detail'),
    path('searchname/', SearchNameView.as_view(), name='search-name'),

    # /////////////////////////     END OF NECESSARY ENDPOINTS   /////////////////////////
    # //////////////////////////////////////////////////////////////////



    # ///////////////////////////   BELOW ARE ENDPOINTS FROM REQUIREMENTS    ////////////////////

    # 1ST REQUIREMENT:
    # Choose N movies with the best rating from a specific genre
    path('NBestRatedGenre/', NBestRatedGenre.as_view(), name='NBestRatedGenre'),


    # 4th Requirement    
    # path('SearchByNameTopRated/', SearchByNameTopRated.as_view(), name='SearchByNameTopRated'),


    # 16th Requirement    
    path('SearchByGenre/', SearchByGenre.as_view(), name='SearchByGenre'),
    
    # 17th Requirement    
    path('SearchByYear/', SearchByYear.as_view(), name='SearchByYear'),

    
    # 15th Requirement    
    path('SearchByName/', SearchByName.as_view(), name='SearchByName'),

    # //////////////////////////////////////////////////////////////////////////////////

]
