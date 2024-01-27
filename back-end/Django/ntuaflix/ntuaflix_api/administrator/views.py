from django.shortcuts import render
from django.http import JsonResponse
import csv
from .forms import *
from .models import *
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.db import DatabaseError
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


class UserInfoAPIView(APIView):
    def get(self, request, username):
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            try:
                # Retrieve the user based on the provided username
                user = User.objects.get(username=username)

                # Serialize user data
                serializer = UserSerializer(user)
                user_data = serializer.data

                return Response(user_data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Permission denied. You don't have administrator privileges."}, status=status.HTTP_403_FORBIDDEN)


@csrf_exempt
def add_user(request, username, password):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)
# Check if the authenticated user is a superuser
        if token == superuser_token:
            try:
                # Retrieve the user by username
                user = User.objects.get(username=username)

                # Check if the user is not active
                if not user.is_active:
                    # Set is_active to True
                    user.is_active = True
                    user.set_password(password)
                    user.save()

                    return JsonResponse({"detail": "User activated successfully."}, status=200)
                else:
                    return JsonResponse({"detail": "User is already active."}, status=400)

            except User.DoesNotExist:
                return JsonResponse({"detail": "User not found."}, status=404)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        return JsonResponse({"detail": "Only GET requests are allowed."}, status=405)


def ProcessTitleBasicTSV(file, model):
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.reader(decoded_file, delimiter='\t')

    ignore_first_line = True
    for row_number, row in enumerate(reader, start=1):
        if ignore_first_line:
            ignore_first_line = False
            continue
        
        tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres, img_url_asset = row
        
        startYear = None if startYear == '\\N' else startYear
        endYear = None if endYear == '\\N' else endYear
        runtimeMinutes = None if runtimeMinutes == '\\N' else runtimeMinutes
        isAdult = None if isAdult == '\\N' else isAdult
        genres = None if genres == '\\N' else genres
        img_url_asset = None if img_url_asset == '\\N' else img_url_asset
        
        # Use get_or_create to insert a new element
        # into the table if not already existed
        try:
            title_obj, created = TitleBasic.objects.get_or_create(
                tconst=tconst,
                defaults={
                    'titleType': titleType,
                    'primaryTitle': primaryTitle,
                    'originalTitle': originalTitle,
                    'isAdult': isAdult,
                    'startYear': startYear,
                    'endYear': endYear,
                    'runtimeMinutes': runtimeMinutes,
                    'genres': genres,
                    'img_url_asset': img_url_asset,
                }
            )

            if created:
                print(f"Created new record for tconst: {tconst}")
            else:
                print(f"Record for tconst {tconst} already exists, skipping.")

        except TitleBasic.MultipleObjectsReturned:
            print(f"Multiple records found for tconst: {tconst}, skipping.")

        print(f"Processed row number: {row_number-1}")
    return row_number-1


def UploadTitleBasics(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                TitleBasic.objects.all().delete()
                Names.objects.all().delete()
                rows = ProcessTitleBasicTSV(file, TitleBasic)
                print(TitleBasic.objects.all())
                UploadNameProfile(request)
                UploadNameObject(request)
                UploadTitleObject(request)
                print(TitleObject.objects.all())
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({'detail': 'Permission denied. You don\'t have administrator privileges.'}, status=403)
    else:
        return JsonResponse({'detail': 'Only POST requests are allowed.'}, status=405)

def reset_database(request):
    TitleBasic.objects.all().delete()
    specific_file_path = 'path/to/specific/file.tsv'
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        ProcessTitleBasicTSV(file, TitleBasic)

    return JsonResponse({'status': 'success'})


def UploadTitleAkas(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                reader = csv.reader(decoded_file, delimiter='\t')

                ignore_first_line = True
                for row_number, row in enumerate(reader, start=1):
                    if ignore_first_line:
                        ignore_first_line = False
                        continue

                    tconst, ordering, title, region, language, types, attributes, isOriginalTitle = row

                    title = None if title == '\\N' else title
                    region = None if region == '\\N' else region
                    language = None if language == '\\N' else language
                    types = None if types == '\\N' else types
                    attributes = None if attributes == '\\N' else attributes

                    TitleAka.objects.create(
                        tconst=TitleBasic.objects.get(tconst=tconst),
                        ordering=ordering,
                        title=title,
                        region=region,
                        language=language,
                        types=types,
                        attributes=attributes,
                        isOriginalTitle=isOriginalTitle,
                    )

                    print(f"Processed row number: {row_number-1}")

                # You may want to call other upload functions here (e.g., UploadNameProfile, UploadNameObject, UploadTitleObject)

                return JsonResponse({'status': 'success', 'processed_rows': row_number-1})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})

def UploadNameBasics(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                reader = csv.reader(decoded_file, delimiter='\t')

                ignore_first_line = True
                for row_number, row in enumerate(reader, start=1):
                    if ignore_first_line:
                        ignore_first_line = False
                        continue

                    nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, imgUrl = row

                    primaryName = None if primaryName == '\\N' else primaryName
                    birthYear = None if birthYear == '\\N' else birthYear
                    deathYear = None if deathYear == '\\N' else deathYear
                    primaryProfession = None if primaryProfession == '\\N' else primaryProfession
                    knownForTitles = None if knownForTitles == '\\N' else knownForTitles
                    imgUrl = None if imgUrl == '\\N' else imgUrl

                    try:
                        name_obj, created = Names.objects.get_or_create(
                            nconst=nconst,
                            defaults={
                                'primaryName': primaryName,
                                'birthYear': birthYear,
                                'deathYear': deathYear,
                                'primaryProfession': primaryProfession,
                                'knownForTitles': knownForTitles,
                                'imgUrl': imgUrl,
                            }
                        )

                        if created:
                            print(f"Created new record for nconst: {nconst}")
                        else:
                            print(f"Record for nconst {nconst} already exists, skipping.")

                    except Names.MultipleObjectsReturned:
                        print(f"Multiple records found for nconst: {nconst}, skipping.")

                    print(f"Processed row number: {row_number-1}")

                # You may want to call other upload functions here (e.g., UploadNameProfile, UploadNameObject, UploadTitleObject)

                return JsonResponse({'status': 'success', 'processed_rows': row_number-1})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def UploadTitleCrew(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                reader = csv.reader(decoded_file, delimiter='\t')

                ignore_first_line = True
                for row_number, row in enumerate(reader, start=1):
                    if ignore_first_line:
                        ignore_first_line = False
                        continue

                    tconst, directors, writers = row

                    directors = None if directors == '\\N' else directors
                    writers = None if writers == '\\N' else writers

                    try:
                        crew_obj, created = Crew.objects.get_or_create(
                            tconst=TitleBasic.objects.get(tconst=tconst),
                            defaults={
                                'directors': directors,
                                'writers': writers,
                            }
                        )

                        if created:
                            print(f"Created new record for tconst: {tconst}")
                        else:
                            print(f"Record for tconst {tconst} already exists, skipping.")

                    except Crew.MultipleObjectsReturned:
                        print(f"Multiple records found for tconst: {tconst}, skipping.")

                    print(f"Processed row number: {row_number-1}")

                # You may want to call other upload functions here (e.g., UploadNameProfile, UploadNameObject, UploadTitleObject)

                return JsonResponse({'status': 'success', 'processed_rows': row_number-1})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def UploadTitleEpisode(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                reader = csv.reader(decoded_file, delimiter='\t')

                ignore_first_line = True
                for row_number, row in enumerate(reader, start=1):
                    if ignore_first_line:
                        ignore_first_line = False
                        continue

                    tconst, parentTconst, seasonNumber, episodeNumber = row

                    seasonNumber = None if seasonNumber == '\\N' else seasonNumber
                    episodeNumber = None if episodeNumber == '\\N' else episodeNumber

                    try:
                        episode_obj, created = Episode.objects.get_or_create(
                            tconst=TitleBasic.objects.get(tconst=tconst),
                            defaults={
                                'parentTconst': parentTconst,
                                'seasonNumber': seasonNumber,
                                'episodeNumber': episodeNumber,
                            }
                        )

                        if created:
                            print(f"Created new record for tconst: {tconst}")
                        else:
                            print(f"Record for tconst {tconst} already exists, skipping.")

                    except Episode.MultipleObjectsReturned:
                        print(f"Multiple records found for tconst: {tconst}, skipping.")

                    print(f"Processed row number: {row_number-1}")

                # You may want to call other upload functions here (e.g., UploadNameProfile, UploadNameObject, UploadTitleObject)

                return JsonResponse({'status': 'success', 'processed_rows': row_number-1})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def UploadTitlePrincipals(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                reader = csv.reader(decoded_file, delimiter='\t')

                ignore_first_line = True
                for row_number, row in enumerate(reader, start=1):
                    if ignore_first_line:
                        ignore_first_line = False
                        continue

                    tconst, ordering, nconst, category, job, characters, img_url_asset = row

                    ordering = None if ordering == '\\N' else ordering
                    category = None if category == '\\N' else category
                    job = None if job == '\\N' else job
                    characters = None if characters == '\\N' else characters
                    img_url_asset = None if img_url_asset == '\\N' else img_url_asset

                    try:
                        principals_obj, created = Principals.objects.get_or_create(
                            tconst=TitleBasic.objects.get(tconst=tconst),
                            nconst=Names.objects.get(nconst=nconst),
                            defaults={
                                'ordering': ordering,
                                'category': category,
                                'job': job,
                                'characters': characters,
                                'img_url_asset': img_url_asset,
                            }
                        )

                        if created:
                            print(f"Created new record for tconst: {tconst}")
                        else:
                            print(f"Record for tconst {tconst} already exists, skipping.")

                    except Principals.MultipleObjectsReturned:
                        print(f"Multiple records found for tconst: {tconst}, skipping.")

                    print(f"Processed row number: {row_number-1}")

                # You may want to call other upload functions here (e.g., UploadNameProfile, UploadNameObject, UploadTitleObject)

                return JsonResponse({'status': 'success', 'processed_rows': row_number-1})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def UploadTitleRatings(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(token)

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                reader = csv.reader(decoded_file, delimiter='\t')

                ignore_first_line = True
                for row_number, row in enumerate(reader, start=1):
                    if ignore_first_line:
                        ignore_first_line = False
                        continue

                    tconst, averageRating, numVotes = row

                    averageRating = None if averageRating == '\\N' else averageRating
                    numVotes = None if numVotes == '\\N' else numVotes

                    try:
                        ratings_obj, created = Rating.objects.get_or_create(
                            tconst=TitleBasic.objects.get(tconst=tconst),
                            defaults={
                                'averageRating': averageRating,
                                'numVotes': numVotes,
                            }
                        )

                        if created:
                            print(f"Created new record for tconst: {tconst}")
                        else:
                            print(f"Record for tconst {tconst} already exists, skipping.")

                    except Rating.MultipleObjectsReturned:
                        print(f"Multiple records found for tconst: {tconst}, skipping.")

                    print(f"Processed row number: {row_number-1}")

                # You may want to call other upload functions here (e.g., UploadNameProfile, UploadNameObject, UploadTitleObject)

                return JsonResponse({'status': 'success', 'processed_rows': row_number-1})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})

# /////////////////////////////////////////////////////////////////////////////////////////////


def health_check(request):
    superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
    token = request.META.get('HTTP_AUTHORIZATION')
    print(token)

    # Check if the authenticated user is a superuser
    if token == superuser_token:
        try:
            # Example: attempting to fetch the first row of some table
            # Replace 'your_model' with an actual model from your app
            TitleBasic.objects.first()

            # If you want to test raw database connectivity
            # connections['default'].cursor()

            connection_string = "Database connection successful"  # Customize as needed
            return JsonResponse({"status": "OK", "dataconnection": connection_string})
        except (DatabaseError, ValidationError):
            connection_string = "Database connection failed"  # Customize as needed
            return JsonResponse({"status": "failed", "dataconnection": connection_string})
    else:
        return JsonResponse({"status": "failed", "dataconnection": "Permission denied. You don't have superuser privileges."})


# def reset_all(request):
#     try:
#         with transaction.atomic():
#             # List all models that you want to reset
#             NameObject.objects.all().delete()
#             TitleObject.objects.all().delete()
#             TitleAka.objects.all().delete()
#             Principals.objects.all().delete()
#             Names.objects.all().delete()
#             Episode.objects.all().delete()
#             Rating.objects.all().delete()
#             Crew.objects.all().delete()
#             TitleBasic.objects.all().delete()
#             # Add similar lines for all other models you have

#         return JsonResponse({"status": "OK"})
#     except DatabaseError as e:
#         return JsonResponse({"status": "failed", "reason": str(e)})
