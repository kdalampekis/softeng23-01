from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from django.db.models import Q
from collections import Counter
from .models import *
from .administrator.models import *
from .serializers import *
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login

class SignUpAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('firstname')
        last_name = request.data.get('lastname')
        print(username, last_name)
        # Create a new user with the provided information
        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name, is_active=False, is_superuser = False)

        return Response({"detail": "User created successfully. Activation required."}, status=status.HTTP_201_CREATED)

class LogoutApiView(APIView):
    def post(self, request, *args, **kwargs):
        # Get the token from the request header
        token_header = self.request.META.get('HTTP_AUTHORIZATION')
        if token_header:
            # Find the user associated with the token
            try:
                user = Token.objects.get(key=token_header).user
            except Token.DoesNotExist:
                return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

            # Delete the token
            Token.objects.filter(user=user).delete()

            return Response({"detail": "Successfully logged out and deleted auth token."},status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid token format."}, status=status.HTTP_400_BAD_REQUEST)

class LoginApiView(APIView):
    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        print(request.data)
        # Manually authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Manually generate or retrieve the authentication token
            token, created = Token.objects.get_or_create(user=user)
            response_data = {
                'token': token.key,
                'is_superuser': user.is_superuser
            }
            return Response(response_data)
        else:
            return Response({"error": "Invalid credentials"}, status=400)

# Following on the link: title/
class TitleBasicList(generics.ListAPIView):
    serializer_class = TitleObjectSerializer
    queryset = TitleObject.objects.all()

    def get_title(self):
        serializer_class = TitleObjectSerializer
        title = TitleObject.objects.all()

        return title

# Following on the link: title/<str:titleID>/
class TitleDetailView(APIView):
    def get(self, request, *args, **kwargs):
        # Extract the token and authenticate the user
        token_key = request.META.get('HTTP_AUTHORIZATION', '').replace('Token ', '')
        try:
            user = Token.objects.get(key=token_key).user
        except Token.DoesNotExist:
            return Response({"error": "Authentication credentials were not provided or are invalid."}, status=status.HTTP_401_UNAUTHORIZED)

        # Check if the user is active
        if not user.is_active:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=status.HTTP_403_FORBIDDEN)

        # Fetch and serialize the title
        titleID = self.kwargs.get('titleID')
        try:
            title = TitleObject.objects.get(tconst=titleID)
        except TitleObject.DoesNotExist:
            return Response({"error": "Title not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TitleObjectSerializer(title)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Following on the link: searchtitle/
class SearchTitleView(APIView):
    def get(self, request):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        user = Token.objects.get(key=token).user
        print(token)

        if user.is_active:
            title_query = request.GET.get('title', None)
            if title_query:
                title_objects = TitleObject.objects.filter(originalTitle__icontains=title_query)
                if title_objects.exists():
                    serializer = TitleObjectSerializer(title_objects, many=True)
                    return Response(serializer.data)
                else:
                    return Response({"error": "No Movies Found"})
                # , status=status.HTTP_404_NOT_FOUND)
            else:
                return render(request, 'search_title.html')
        # else:
        #     return Response({"error": "Permission denied. You don't have an active user account."}, status=status.HTTP_403_FORBIDDEN)

class FilteredTitleObjectsView(APIView):

    def get(self, request, *args, **kwargs):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        user = Token.objects.get(key=token).user
        print(token)

        if user.is_active:
            try:
                # Retrieve query parameters
                genre = request.GET.get('genre', None)
                minimum_rating = request.GET.get('minimumrating', None)
                year_from = request.GET.get('yearfrom', None)
                year_to = request.GET.get('yearto', None)

                if genre:
                    # Start building the query
                    query = Q()
                    if genre:
                        query &= Q(genres__icontains=genre)
                    if minimum_rating:
                        query &= Q(averageRating__gte=minimum_rating)
                    if year_from:
                        query &= Q(startYear__gte=year_from)
                    if year_to:
                        query &= Q(endYear__lte=year_to)

                    # Execute the query
                    title_objects = TitleObject.objects.filter(query)

                    # Serialize the queryset
                    serializer = TitleObjectSerializer(title_objects, many=True)
                else:
                    return render(request, 'search_criteria.html')
                # Return the response
                return Response(serializer.data)
            except Exception as e:
                return Response({"error": str(e)}, status=400)
        else:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=403)

class NameObjectView(generics.ListAPIView):
    serializer_class = NameObjectSerializer

    def get_queryset(self):


        queryset = NameObject.objects.all()

        return queryset

class NameBiography(APIView):
    def get(self, request, *args, **kwargs):
        # Extract token and get user
        token_key = request.META.get('HTTP_AUTHORIZATION')
        try:
            user = Token.objects.get(key=token_key).user
        except Token.DoesNotExist:
            return Response({"error": "Authentication credentials were not provided or are invalid."}, status=status.HTTP_401_UNAUTHORIZED)

        # Check if user is active
        if not user.is_active:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=status.HTTP_403_FORBIDDEN)

        # Proceed if user is active
        nameID = self.kwargs.get('nameID')
        if not nameID:
            return Response({"error": "Name ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch the NameObject using the provided nameID
            name_objects = NameObject.objects.filter(nconst=nameID)
            if not name_objects.exists():
                return Response({"error": "NameObject not found."}, status=status.HTTP_404_NOT_FOUND)
            # Serialize the queryset
            serializer = NameObjectSerializer(name_objects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            # Log the error or send it to a monitoring system
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SearchNameView(APIView):
    def get(self, request):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        user = Token.objects.get(key=token).user
        print(token)

        if user.is_active:
            try:
                name_query = request.GET.get('name', None)
                if name_query:
                    name_objects = NameObject.objects.filter(primaryName__icontains=name_query)
                    serializer = NameObjectSerializer(name_objects, many=True)
                    print(serializer.data)
                    return Response(serializer.data)
                else:
                    # Render the search form if no query is provided
                    return render(request, 'search_name.html')
            except Exception as e:
                return Response({"error": str(e)}, status=500)
        else:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=403)

class SearchByGenre(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        genre = request.GET.get('genre', None)
        number = request.GET.get('number',None)
        toprated = request.GET.get('toprated',None)
        # Check if the 'genre' parameter is provided
        if genre:
            # Filter by genre
            queryset = TitleObject.objects.filter(genres__icontains=genre)
            # Serialize the queryset

            if toprated=='true':
                if number:
                    queryset = queryset.order_by('-averageRating')[:int(number)]

                else:
                    context = {
                    'error_message': "You have to input a number."
                    }
                    return render(request, 'SearchByGenre.html', context)

            else:
                if number:
                    queryset = queryset[:int(number)]


            serializer = TitleObjectSerializer(queryset, many=True)
            # Return the serialized data
        else:
            # If 'genre' is not provided, render the search criteria form
            return render(request, 'SearchByGenre.html')

        return Response(serializer.data)

class SearchByYear(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        year = request.GET.get('year', None)
        # Check if the 'genre' parameter is provided
        if year:
            # Filter by genre
            queryset = TitleObject.objects.filter(startYear=year)
            # Serialize the queryset
            serializer = TitleObjectSerializer(queryset, many=True)

            # Return the serialized data
        else:
            return render(request, 'SearchByYear.html')

        return Response(serializer.data)

class SearchByName(APIView):

    def get(self, request, *args, **kwargs):
        # Retrieve query parameters
        name = request.GET.get('name', None)
        toprated = request.GET.get('toprated',None)
        newest = request.GET.get('newest',None)
        number = request.GET.get('number',None)
        # Check if the 'genre' parameter is provided
        if name:
            # Filter by genre
            queryset = TitleObject.objects.filter(primaryName__icontains=name)

            if (toprated == 'true' and newest== 'true'):
                context = {
                'error_message': "You can only choose 'Earliest Release' or 'Top Rated', not both."
                }
                return render(request, 'SearchByName.html', context)

            if number:
                if toprated=='true':
                    queryset = queryset.order_by('-averageRating')[:int(number)]
                # Serialize the queryset

                if newest=='true':
                    queryset = queryset.order_by('-startYear')[:int(number)]
            else:
                if toprated=='true':
                    queryset = queryset.order_by('-averageRating')[:1]
                # Serialize the queryset

                if newest=='true':
                    queryset = queryset.order_by('-startYear')[:1]



            serializer = TitleObjectSerializer(queryset, many=True)
            # Return the serialized data
        else:
            # If 'genre' is not provided, render the search criteria form
            return render(request, 'SearchByName.html')

        return Response(serializer.data)

class NameProfileView(APIView):

    def get(self, request, *args, **kwargs):

        name = request.GET.get('name', '')  # Default to an empty string if not provided

        actors_genre_percentages = {}

        if name:
            filtered_profiles = NameProfile.objects.filter(ActorName__icontains=name)

            for profile in filtered_profiles:
                if profile.AllGenres:
                    # Split the genres and strip whitespace from each genre individually
                    genres = [genre.strip() for genre in profile.AllGenres.split(',')]
                    # Count each genre
                    genre_counts = Counter(genres)

                    # Calculate the total number of genre occurrences
                    total_genres = sum(genre_counts.values())

                    # Calculate the percentage for each genre
                    genre_percentages = {genre: (count / total_genres) * 100 for genre, count in genre_counts.items()}

                    # Assign the result to the actor's name
                    actors_genre_percentages[profile.ActorName] = genre_percentages

            # Return the percentages as JSON or render your template
            return JsonResponse(actors_genre_percentages)

        else:
            return render(request, 'NameProfile.html')


# ///////////////////////////////// LIKE - DISLIKE ///////////////////////////////////

class TitleLikesView(APIView):
    def get(self, request, titleID):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        user = Token.objects.get(key=token).user

        if user.is_active:
            try:
                title_object = TitleObject.objects.get(tconst=titleID)
            except TitleObject.DoesNotExist:
                return Response({"error": "Title not found"}, status=status.HTTP_404_NOT_FOUND)

            like_object = Likes.objects.filter(tconst=title_object.tconst)
            likes_count = sum(1 for like in like_object if like.liked)
            dislikes_count = sum(1 for like in like_object if not like.liked)
            user_has_liked = like_object.filter(userId=user, liked=True).exists()
            user_has_disliked = like_object.filter(userId=user, liked=False).exists()
            
            response_data = {
                "title": title_object.originalTitle,
                "likes": likes_count,
                "dislikes": dislikes_count,
                "hasLiked": user_has_liked,
                "hasDisliked": user_has_disliked,
            }

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=403)


class PressLikeButton(APIView):
    def post(self, request, titleID):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        user = Token.objects.get(key=token).user

        if user.is_active:
            try:
                title_object = TitleObject.objects.get(tconst=titleID)
            except TitleObject.DoesNotExist:
                return Response({"error": "Title not found"}, status=status.HTTP_404_NOT_FOUND)

            likeTconst = TitleBasic.objects.get(tconst=title_object.tconst)
            
            # Use get instead of get_or_create
            try:
                like_object = Likes.objects.get(tconst=likeTconst, userId=user)
                
                if like_object.liked:
                    # User has already liked, remove the like instance
                    like_object.delete()
                    response_data = {"status": "remove liked"}
                elif like_object.liked is False:
                    # User has already disliked, switch from dislike to like
                    like_object.liked = True
                    like_object.save()
                    response_data = {"status": "switched to liked"}

            except Likes.DoesNotExist:
                like_object = Likes.objects.create(tconst=likeTconst, userId=user, liked=True)

                # User has not liked or disliked before, create a new like instance
                like_object.liked = True
                like_object.save()
                response_data = {"status": "liked"}

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=403)


class PressDislikeButton(APIView):
    def post(self, request, titleID):
        token = self.request.META.get('HTTP_AUTHORIZATION')
        user = Token.objects.get(key=token).user

        if user.is_active:
            try:
                title_object = TitleObject.objects.get(tconst=titleID)
            except TitleObject.DoesNotExist:
                return Response({"error": "Title not found"}, status=status.HTTP_404_NOT_FOUND)

            dislikeTconst = TitleBasic.objects.get(tconst=title_object.tconst)

            # Use get instead of get_or_create
            try:
                dislike_object = Likes.objects.get(tconst=dislikeTconst, userId=user)
                
                if dislike_object.liked:
                    # User has already liked, update the like instance to unliked
                    dislike_object.liked = False
                    dislike_object.save()
                    response_data = {"status": "switched to disliked"}
                elif dislike_object.liked is False:
                    # User has already disliked, remove the dislike instance
                    dislike_object.delete()
                    response_data = {"status": "remove disliked"}
            except Likes.DoesNotExist:
                dislike_object = Likes.objects.create(tconst=dislikeTconst, userId=user, liked=False)

                # User has not liked or disliked before, create a new dislike instance
                dislike_object.liked = False
                dislike_object.save()
                response_data = {"status": "disliked"}

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Permission denied. You don't have an active user account."}, status=403)
