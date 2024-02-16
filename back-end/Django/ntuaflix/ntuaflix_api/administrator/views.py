from MySQLdb import IntegrityError
from django.shortcuts import render
from django.http import JsonResponse
import csv
from .forms import *
from .models import *
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.db import DatabaseError
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db import IntegrityError
import os



# /////////////////////////////// TITLE BASICS ///////////////////////////////////////

def ProcessTitleBasicsTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
                if reset == False:
                    UploadTitleObject(request, TitleBasic.objects.filter(tconst=tconst))
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
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessTitleBasicsTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({'detail': 'Permission denied. You don\'t have administrator privileges.'}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetTitleBasics(request):
    TitleBasic.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_title.basics.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessTitleBasicsTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# /////////////////////////////// TITLE AKAS ///////////////////////////////////////

def ProcessTitleAkasTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
        if reset == False:
            UploadTitleObject(request, TitleBasic.objects.filter(tconst=tconst))
    return row_number-1


def UploadTitleAkas(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessTitleAkasTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetTitleAkas(request):
    TitleAka.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_title.akas.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessTitleAkasTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# /////////////////////////////// NAME BASICS ///////////////////////////////////////

def ProcessNameBasicsTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
                if reset == False:
                    UploadNameObject(request, Names.objects.filter(nconst=nconst))
                    UploadNameProfile(request, Names.objects.filter(nconst=nconst))
            else:
                print(f"Record for nconst {nconst} already exists, skipping.")

        except Names.MultipleObjectsReturned:
            print(f"Multiple records found for nconst: {nconst}, skipping.")

        print(f"Processed row number: {row_number-1}")
    return row_number-1


def UploadNameBasics(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessNameBasicsTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetNameBasics(request):
    Names.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_name.basics.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessNameBasicsTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# /////////////////////////////// TITLE CREW ///////////////////////////////////////

def ProcessTitleCrewTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
    return row_number-1


def UploadTitleCrew(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessTitleCrewTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetTitleCrew(request):
    Crew.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_title.crew.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessTitleCrewTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# /////////////////////////////// TITLE EPISODES ///////////////////////////////////////

def ProcessTitleEpisodeTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
    return row_number-1


def UploadTitleEpisode(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessTitleEpisodeTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetTitleEpisode(request):
    Episode.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_title.episode.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessTitleEpisodeTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# /////////////////////////////// TITLE PRINCIPALS ///////////////////////////////////////

def ProcessTitlePrincipalsTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
                if reset == False:
                    UploadTitleObject(request, TitleBasic.objects.filter(tconst=tconst))
                    UploadNameObject(request, Names.objects.filter(nconst=nconst))
                    UploadNameProfile(request, Names.objects.filter(nconst=nconst))
            else:
                print(f"Record for tconst {tconst} already exists, skipping.")

        except Principals.MultipleObjectsReturned:
            print(f"Multiple records found for tconst: {tconst}, skipping.")

        print(f"Processed row number: {row_number-1}")
    return row_number-1


def UploadTitlePrincipals(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessTitlePrincipalsTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetTitlePrincipals(request):
    Principals.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_title.principals.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessTitlePrincipalsTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# /////////////////////////////// TITLE RATINGS ///////////////////////////////////////

def ProcessTitleRatingsTSV(request, file, reset = False):
    reader = csv.reader(file, delimiter='\t')

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
                if reset == False:
                    UploadTitleObject(request, TitleBasic.objects.filter(tconst=tconst))
            else:
                print(f"Record for tconst {tconst} already exists, skipping.")

        except Rating.MultipleObjectsReturned:
            print(f"Multiple records found for tconst: {tconst}, skipping.")

        print(f"Processed row number: {row_number-1}")
    return row_number-1


def UploadTitleRatings(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

        # Check if the authenticated user is a superuser
        if token == superuser_token:
            form = BasicForm(request.POST, request.FILES)
            if form.is_valid():
                file = form.cleaned_data['tsv_file']
                decoded_file = file.read().decode('utf-8').splitlines()
                rows = ProcessTitleRatingsTSV(request, decoded_file)
                return JsonResponse({'status': 'success', 'processed_rows': rows})
            else:
                return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
        else:
            return JsonResponse({"detail": "Permission denied. You don't have administrator privileges."}, status=403)
    else:
        form = BasicForm()
        return render(request, 'upload.html', {'form': form})


def ResetTitleRatings(request):
    Rating.objects.all().delete()
    specific_file_path = os.path.join('..', '..', 'Database', 'Data', 'truncated_title.ratings.tsv')
    with open(specific_file_path, 'r', encoding='utf-8') as file:
        rows = ProcessTitleRatingsTSV(request, file, True)
    return JsonResponse({'status': 'success', 'processed_rows': rows})


# ///////////////////////////////// OTHER VIEWS //////////////////////////////////////////////
def health_check(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

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

def reset_all(request):
    if request.method == 'POST':
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')
        print(superuser_token)
        print(token)
        # Check if the authenticated user is a superuser
        if token == superuser_token:
            try:
                ResetTitleBasics(request)
                ResetTitleAkas(request)
                ResetNameBasics(request)
                ResetTitleCrew(request)
                ResetTitleEpisode(request)
                ResetTitlePrincipals(request)
                ResetTitleRatings(request)
                UploadTitleObject(request, TitleBasic.objects.all(), True)
                UploadNameObject(request, Names.objects.all(), True)
                UploadNameProfile(request, Names.objects.all(), True)
                return JsonResponse({"status": "OK"})
            except DatabaseError as e:
                return JsonResponse({"status": "failed", "reason": str(e)})
        else:
            return JsonResponse({'detail': 'Permission denied. You don\'t have administrator privileges.'}, status=403)
    else:
        return JsonResponse({'detail': 'Permission denied. Only POST requests available.'}, status=404)


class UserInfoAPIView(APIView):
    def get(self, request, username):
        superuser_token = User.objects.filter(is_superuser=True).values_list('auth_token', flat=True).first()
        token = request.META.get('HTTP_AUTHORIZATION')

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


# ///////////////////////////////// OBJECT FUNCTIONS //////////////////////////////////////////////
  
def UploadTitleObject(request, title_ids, reset = False):
    if reset:
        TitleObject.objects.all().delete()
    else:
        for tconst in title_ids:
            try:
                title_object = TitleObject.objects.get(tconst=tconst)
                title_object.delete()
            except TitleObject.DoesNotExist:
                continue
    for tconst in title_ids:
        titleType = tconst.titleType
        originalTitle = tconst.originalTitle
        img_url_asset = tconst.img_url_asset if tconst.img_url_asset is not None else '\\N'
        startYear = tconst.startYear
        endYear = tconst.endYear
        genres = tconst.genres
        
        titleAkas = TitleAka.objects.filter(tconst=tconst)
        titles_list = list(titleAkas.values_list('title', flat=True))
        titles = ', '.join(str(title) if title is not None else '' for title in titles_list)
        regions_list = list(titleAkas.values_list('region', flat=True))
        regions = ', '.join(str(region) if region is not None else '' for region in regions_list)
        
        titlePrincipals=Principals.objects.filter(tconst=tconst)
        nconsts_list = list(titlePrincipals.values_list('nconst', flat=True))
        nconsts = ', '.join(str(n) if n is not None else '' for n in nconsts_list)
        categories_list = list(titlePrincipals.values_list('category', flat=True))
        categories = ', '.join(str(category) if category is not None else '' for category in categories_list)
        
        primaryName_list = []
        for nconst in nconsts_list:
            name=Names.objects.get(nconst=nconst).primaryName
            primaryName_list.append(name)
        primaryName = ', '.join(str(name) if name is not None else '' for name in primaryName_list)
        
        try:
            titleRatings = Rating.objects.get(tconst=tconst)
            averageRating = titleRatings.averageRating
            numVotes = titleRatings.numVotes
        except Rating.DoesNotExist:
            # Handle the case when Rating for the specified tconst does not exist
            averageRating = None
            numVotes = None
        try:
            title_obj, created = TitleObject.objects.get_or_create(
            tconst=tconst,
            defaults={
                'titleType': titleType,
                'originalTitle': originalTitle,
                'img_url_asset': img_url_asset,
                'startYear': startYear,
                'endYear': endYear,
                'genres': genres,
                'titles': titles,
                'regions': regions,
                'nconsts': nconsts,
                'categories': categories,
                'primaryName': primaryName,
                'averageRating': averageRating,
                'numVotes': numVotes,
            }
        )
            if created:
                print(f"Created new record for tconst: {tconst}")
            else:
                print(f"Record for tconst {tconst} already exists, skipping.")

        except TitleBasic.MultipleObjectsReturned:
            print(f"Multiple records found for tconst: {tconst}, skipping.")
            continue


def UploadNameObject(request, name_ids, reset = False):
    if reset:
        NameObject.objects.all().delete()
    else:
        for nconst in name_ids:
            try:
                name_object = NameObject.objects.get(nconst=nconst)
                name_object.delete()
            except NameObject.DoesNotExist:
                continue
    for nconst in name_ids:
        primaryName = nconst.primaryName
        imgUrl = nconst.imgUrl if nconst.imgUrl is not None else '\\N'
        birthYear = nconst.birthYear
        deathYear = nconst.deathYear
        primaryProfession = nconst.primaryProfession
        
        titlePrincipals=Principals.objects.filter(nconst=nconst)
        tconsts_list = list(titlePrincipals.values_list('tconst', flat=True))
        titleID = ', '.join(str(title) if title is not None else '' for title in tconsts_list)
        categories_list = list(titlePrincipals.values_list('category', flat=True))
        category = ', '.join(str(cat) if cat is not None else '' for cat in categories_list)
        
        try:
            name_obj, created = NameObject.objects.get_or_create(
            nconst=nconst,
            defaults={
                'primaryName': primaryName,
                'imgUrl': imgUrl,
                'birthYear': birthYear,
                'deathYear': deathYear,
                'primaryProfession': primaryProfession,
                'titleID': titleID,
                'category': category,
            }
        )

            if created:
                print(f"Created new record for nconst: {nconst}")
            else:
                print(f"Record for tconst {nconst} already exists, skipping.")

        except TitleBasic.MultipleObjectsReturned:
            print(f"Multiple records found for nconst: {nconst}, skipping.")
            continue

        
def UploadNameProfile(request, name_ids, reset = False):
    if reset:
        NameProfile.objects.all().delete()
    else:
        for nconst in name_ids:
            try:
                name_prof = NameProfile.objects.get(ActorNconst=nconst)
                name_prof.delete()
            except NameProfile.DoesNotExist:
                continue
    for ActorNconst in name_ids:
        ActorName = ActorNconst.primaryName
        
        categories_list = []
        tconsts_list = []

        try:
            titlePrincipals = Principals.objects.filter(nconst=ActorNconst)
            tconsts_list = list(titlePrincipals.values_list('tconst', flat=True))

            for tconst in tconsts_list:
                categories = TitleBasic.objects.get(tconst=tconst).genres
                if categories is None:
                    continue

                categories = categories.split(',')

                for category in categories:
                    if category not in categories_list:
                        categories_list.append(category)

            if not categories_list:
                continue

            categories_list.sort()
            AllGenres = ', '.join(category for category in categories_list)

            name_prof, created = NameProfile.objects.get_or_create(
                ActorNconst=ActorNconst,
                defaults={
                    'ActorName': ActorName,
                    'AllGenres': AllGenres,
                }
            )

            if created:
                print(f"Created new record for nconst: {ActorNconst}")
            else:
                print(f"Record for nconst {ActorNconst} already exists, skipping.")

        except (Principals.DoesNotExist, TitleBasic.DoesNotExist) as e:
            # Log the exception and continue with the next iteration
            print(f"Error processing nconst {ActorNconst}: {e}")
            continue

        except IntegrityError as e:
            # Check if the IntegrityError is due to the unique constraint on ActorName
            if 'UNIQUE constraint failed: nameProfile.ActorName' in str(e):
                print(f"NameProfile with nconst {ActorName} already exists, skipping.")
                continue
            else:
                # Log the integrity error and continue with the next iteration
                print(f"IntegrityError for nconst {ActorNconst}, skipping.")
                continue