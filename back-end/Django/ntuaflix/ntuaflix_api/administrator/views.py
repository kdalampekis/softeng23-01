from django.shortcuts import render
from django.http import JsonResponse
import csv
from .forms import *

from django.http import JsonResponse
from django.db import DatabaseError, connections
from django.core.exceptions import ValidationError

from .models import *

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db import transaction, DatabaseError


def UploadTitleBasics(request):
    if request.method == 'POST':
        form = TitleBasicUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['tsv_file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            next(reader, None)  # Skip the header row

            for row in reader:
                tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres, img_url_asset = row
                if not TitleBasic.objects.filter(tconst=tconst).exists():
                    isAdult = int(isAdult) if isAdult != '\\N' else None
                    startYear = int(startYear) if startYear != '\\N' else None
                    endYear = int(endYear) if endYear != '\\N' else None
                    runtimeMinutes = int(runtimeMinutes) if runtimeMinutes != '\\N' else None

                    # Create and save TitleBasics instance
                    TitleBasic.objects.create(
                        tconst=tconst,
                        titleType=titleType,
                        primaryTitle=primaryTitle,
                        originalTitle=originalTitle,
                        isAdult=isAdult,
                        startYear=startYear,
                        endYear=endYear,
                        runtimeMinutes=runtimeMinutes,
                        genres=genres,
                        img_url_asset=img_url_asset,
                    )

            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = TitleBasicUploadForm()

    return render(request, 'administrator/upload_titlebasics.html', {'form': form})


def UploadTitleAkas(request):
    if request.method == 'POST':
        form = UploadTitleAkasForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['tsv_file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            next(reader, None)  # Skip the header row

            for row in reader:
                tconst, ordering, title, region, language, types, attributes, isOriginalTitle = row
                if not TitleAka.objects.filter(tconst=tconst).exists():
                # Create and save TitleAka instance
                    TitleAka.objects.create(
                        tconst=tconst,
                        ordering=int(ordering),
                        title=title,
                        region=region if region != '\\N' else None,
                        language=language if language != '\\N' else None,
                        types=types if types != '\\N' else None,
                        attributes=attributes if attributes != '\\N' else None,
                        isOriginalTitle=int(isOriginalTitle)
                    )

            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = UploadTitleAkasForm()

    return render(request, 'administrator/upload_titleaka.html', {'form': form})


def UploadNames(request):
    if request.method == 'POST':
        form = UploadNamesForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['tsv_file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            next(reader, None)  # Skip the header row

            for row in reader:
                nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, imgUrl = row
                
                if not Names.objects.filter(nconst=nconst).exists():
                # Create and save Names instance
                    Names.objects.update_or_create(
                    nconst=nconst,
                    defaults={
                        'primaryName': primaryName if primaryName != '\\N' else None,
                        'birthYear': int(birthYear) if birthYear != '\\N' else None,
                        'deathYear': int(deathYear) if deathYear != '\\N' else None,
                        'primaryProfession': primaryProfession if primaryProfession != '\\N' else None,
                        'knownForTitles': knownForTitles if knownForTitles != '\\N' else None,
                        'imgUrl': imgUrl if imgUrl != '\\N' else None,
                        }
                    )

            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = UploadNamesForm()

    return render(request, 'administrator/upload_names.html', {'form': form})


def UploadPrincipals(request):
    if request.method == 'POST':
        form = UploadPrincipalsForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['tsv_file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            next(reader, None)  # Skip the header row

            for row_number, row in enumerate(reader, start=1):  # Start numbering from 1
                tconst, ordering, nconst, category, job, characters, img_url_asset = row
                if not Principals.objects.filter(tconst=tconst, ordering=int(ordering)).exists(): 
                    Principals.objects.update_or_create(
                        tconst =tconst,
                        ordering = int(ordering),
                        nconst = nconst,
                        defaults={                        
                            'category': category if category != '\\N' else None,
                            'job': job if job != '\\N' else None,
                            'characters': characters if characters != '\\N' else None,
                            'img_url_asset': img_url_asset if img_url_asset != '\\N' else None,
                        }
                    )
                print(f"Processed row number: {row_number}")

            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = UploadPrincipalsForm()

    return render(request, 'administrator/upload_principals.html', {'form': form})


def UploadRating(request):
    if request.method == 'POST':
        form = UploadRatingForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['tsv_file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            next(reader, None)  # Skip the header row

            for row_number, row in enumerate(reader, start=1):  # Start numbering from 1
                tconst, averageRating, numVotes = row
                
                # Convert fields as necessary and handle potential null values
                Rating.objects.update_or_create(
                    tconst=tconst,
                    defaults={
                        'averageRating': float(averageRating) if averageRating != '\\N' else None,
                        'numVotes': int(numVotes) if numVotes != '\\N' else None,
                    }
                )
                print(f"Processed row number: {row_number}")

            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = UploadRatingForm()

    return render(request, 'administrator/upload_rating.html', {'form': form})


def UploadCrew(request):
    if request.method == 'POST':
        form = UploadCrewForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['tsv_file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            next(reader, None)  # Skip the header row

            for row_number, row in enumerate(reader, start=1):  # Start numbering from 1
                tconst, directors, writers = row

                Crew.objects.update_or_create(
                    tconst=tconst,
                    defaults={
                        'directors': directors if directors != '\\N' else None,
                        'writers': writers if writers != '\\N' else None,
                    }
                )
                print(f"Processed row number: {row_number}")

            return JsonResponse({'status': 'success', 'processed_rows': row_number})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = UploadCrewForm()

    return render(request, 'administrator/upload_crew.html', {'form': form})




# //////////////////////////////////////////////////////////////////////////////////////////////

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


