from django.shortcuts import render
from django.http import JsonResponse
import csv
from .forms import *
from .models import *
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import transaction, DatabaseError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import permission_required


def UploadTitleBasics(request):
    if request.method == 'POST':
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

                print(f"Processed row number: {row_number}")
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


def UploadTitleAkas(request):
    if request.method == 'POST':
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

                # Use try-except to handle the case when the record already exists
                try:
                    title_aka, created = TitleAka.objects.get_or_create(
                    tconst=tconst,
                    ordering=ordering,
                    defaults={
                        'title': title,
                        'region': region,
                        'language': language,
                        'types': types,
                        'attributes': attributes,
                        'isOriginalTitle': isOriginalTitle,
                    }
                )
                    if created:
                        print(f"Created new record for tconst: {tconst}")
                    else:
                        print(f"Record for tconst {tconst} and ordering {ordering} already exists, skipping.")

                except Exception as e:
                    print(f"Error creating record for tconst: {tconst} and ordering {ordering}, {e}")

                print(f"Processed row number: {row_number}")
                                    
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


def UploadNameBasics(request):
    if request.method == 'POST':
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
                
                Names.objects.get_or_create(
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
                print(f"Processed row number: {row_number}")
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


def UploadTitleCrew(request):
    if request.method == 'POST':
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
                
                Crew.objects.get_or_create(
                    tconst=tconst,
                    defaults={
                        'directors': directors,
                        'writers': writers,
                    }
                )
                print(f"Processed row number: {row_number}")
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


def UploadTitleEpisode(request):
    if request.method == 'POST':
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
                
                Episode.objects.get_or_create(
                    tconst=tconst,
                    defaults={
                        'parentTconst': parentTconst,
                        'seasonNumber': seasonNumber,
                        'episodeNumber': episodeNumber,
                    }
                )
                print(f"Processed row number: {row_number}")
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


def UploadTitlePrincipals(request):
    if request.method == 'POST':
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

                # Use try-except to handle the case when the record already exists
                try:
                    principal, created = Principals.objects.get_or_create(
                        tconst=tconst,
                        ordering=ordering,
                        defaults={
                            'nconst': nconst,
                            'category': category,
                            'job': job,
                            'characters': characters,
                            'img_url_asset': img_url_asset,
                        }
                    )

                    if created:
                        print(f"Created new record for tconst: {tconst} and ordering: {ordering}")
                    else:
                        print(f"Record for tconst: {tconst} and ordering: {ordering} already exists, skipping.")

                except Exception as e:
                    print(f"Error creating record for tconst: {tconst} and ordering: {ordering}, {e}")

                print(f"Processed row number: {row_number}")
                
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


def UploadTitleRatings(request):
    if request.method == 'POST':
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
                
                Rating.objects.get_or_create(
                    tconst=tconst,
                    defaults={
                        'averageRating': averageRating,
                        'numVotes': numVotes,
                    }
                )
                print(f"Processed row number: {row_number}")
            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = BasicForm()
    return render(request, 'upload.html', {'form': form})


# /////////////////////////////////////////////////////////////////////////////////////////////


def health_check(request):
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


# /////////////////////////////////////////////////////////////////////////////////////////////


@csrf_exempt
@login_required
@permission_required(IsAuthenticated)  # Replace 'your_app_name' with the actual app name.
def add_user(request, username, password):
    if request.method == 'POST':
        # Handle POST request to activate the user
        try:
            # Retrieve the user by username
            user = User.objects.get(username=username)

            # Check if the authenticated user is a superuser or has the required permissions.
            # You can customize this condition based on your specific permission requirements.
            if request.user.is_superuser:
                # Set is_active to True
                user.is_active = True
                user.set_password(password)
                user.save()

                return JsonResponse({"detail": "User activated successfully."}, status=200)
            else:
                return JsonResponse({"detail": "Permission denied."}, status=403)

        except User.DoesNotExist:
            return JsonResponse({"detail": "User not found."}, status=404)
    else:
        return JsonResponse({"detail": "Only POST requests are allowed."}, status=405)


# # @csrf_exempt
# # @require_http_methods(["POST"])
# def reset_all(request):
#     try:
#         with transaction.atomic():
#             # List all models that you want to reset
#             TitleAka.objects.all().delete()
#             Principals.objects.all().delete()
#             Workas.objects.all().delete()
#             Names.objects.all().delete()
#             Episode.objects.all().delete()
#             Rating.objects.all().delete()
#             Crew.objects.all().delete()
#             TitleBasic.objects.all().delete()
#              # Add similar lines for all other models you have

#         return JsonResponse({"status": "OK BASIC SQL TABLES "})
#     except DatabaseError as e:
#         return JsonResponse({"status": "failed", "reason": str(e)})