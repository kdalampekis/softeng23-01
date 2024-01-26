from django.urls import path, include
from .views import *

urlpatterns = [


    path('admin/', include('ntuaflix_api.administrator.urls')),

    path('admin/resetall', reset_all),



    # ///////////////////////////   END POINTS NECESSARY           ////////////////////////////
    path('login/', LoginApiView.as_view(), name = 'login'),
    path('logout/', LogoutApiView.as_view(), name = 'logout'),
    path('signup/', SignUpAPIView.as_view(), name = 'signup'),
    path('title/', TitleBasicList.as_view(), name='title-basic-list'),

    path('title/<str:titleID>/', TitleDetailView.as_view(), name='title-detail'), #30th Requirement

    path('searchtitle/', SearchTitleView.as_view(), name='search-title'),

        # /////////////////     FILTERS     ////////////////////////////////////////
    path('bygenre/', FilteredTitleObjectsView.as_view(), name='filtered-title-objects'),


        # /////////////////     NAMES     ////////////////////////////////////////

    path('name/', NameObjectView.as_view(), name='name-basic-list'),

    path('name/<str:nameID>/', NameBiography.as_view(), name='name-detail'), # 25th Requirement aswell

    path('searchname/', SearchNameView.as_view(), name='search-name'),

    # /////////////////////////     END OF NECESSARY ENDPOINTS   /////////////////////////
    # //////////////////////////////////////////////////////////////////



    # ///////////////////////////   BELOW ARE ENDPOINTS FROM REQUIREMENTS    ////////////////////

    # 17th Requirement and 1st Requirement
    path('SearchByGenre/', SearchByGenre.as_view(), name='SearchByGenre'),

    # 18th Requirement
    path('SearchByYear/', SearchByYear.as_view(), name='SearchByYear'),


    # 4,5,6,16th Requirement Requirement
    path('SearchByName/', SearchByName.as_view(), name='SearchByName'),


    # 25th and 30th Requirement see in the first block of code (Necessary Endpoints)


    path('NameProfile/', NameProfileView.as_view(), name='name-profile'),

    # //////////////////////////////////////////////////////////////////////////////////




    # ////////////////      USER AUTHENTICATION     //////////////////////////





    # path('admin/upload/titlebasics', upload_titlebasics, name='upload_titlebasics'),
    # ////////////////      ADMIN       ////////////////////////////////////


]
