from django.urls import path, include
from .views import *

urlpatterns = [
    # /////////////////////////////////// LOGIN ////////////////////////////////////
    
    path('login/', LoginApiView.as_view(), name = 'login'),
    path('logout/', LogoutApiView.as_view(), name = 'logout'),
    path('signup/', SignUpAPIView.as_view(), name = 'signup'),
    
    # /////////////////////////// NECESSARY ENDPOINTS ////////////////////////////
    
    path('title/', TitleBasicList.as_view(), name='title-basic-list'),
    path('title/<str:titleID>/', TitleDetailView.as_view(), name='title-detail'), #30th Requirement
    path('searchtitle/', SearchTitleView.as_view(), name='search-title'),
    path('bygenre/', FilteredTitleObjectsView.as_view(), name='filtered-title-objects'),
                    # //////// NameObject Views /////////// #
    path('name/', NameObjectView.as_view(), name='name-basic-list'),
    path('name/<str:nameID>/', NameBiography.as_view(), name='name-detail'), # 25th Requirement aswell
    path('searchname/', SearchNameView.as_view(), name='search-name'),
    
    # ////////////////////////// ENDPOINTS REQUIREMENTS ///////////////////////////
    
    path('SearchByGenre/', SearchByGenre.as_view(), name='SearchByGenre'),    # 17th Requirement and 1st Requirement
    path('SearchByYear/', SearchByYear.as_view(), name='SearchByYear'),    # 18th Requirement
    path('SearchByName/', SearchByName.as_view(), name='SearchByName'),    # 4,5,6,16th Requirement Requirement
    path('NameProfile/', NameProfileView.as_view(), name='name-profile'),
    # 25th and 30th Requirement see in the first block of code (Necessary Endpoints)
    
    # ///////////////////////////////// ADMIN //////////////////////////////////
    
    path('admin/', include('ntuaflix_api.administrator.urls')),
    
    # ///////////////////////////// LIKE - DISLIKE ///////////////////////////////

    path('title_likes/<str:titleID>/', TitleLikesView.as_view(), name='title-likes'),
    path('title_likes/press_like/<str:titleID>/', PressLikeButton.as_view(), name='press_like'),
    path('title_likes/press_dislike/<str:titleID>/', PressDislikeButton.as_view(), name='press_dislike'),
]
