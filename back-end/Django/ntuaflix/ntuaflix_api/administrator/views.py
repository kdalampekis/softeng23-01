from django.shortcuts import render
from django.http import JsonResponse
import csv
from .forms import TitleBasicUploadForm

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
            # Process the uploaded file
            file = form.cleaned_data['tsv_file']

            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.reader(decoded_file, delimiter='\t')

            # Process the data from the reader object
            data_to_process = []
            for row in reader:
                tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres, img_url_asset = row
                
                # Append relevant data to the list
                data_to_process.append({
                    'tconst': tconst,
                    'titleType': titleType,
                    'primaryTitle': primaryTitle,
                    'originalTitle': originalTitle,
                    'isAdult': isAdult,
                    'startYear': startYear,
                    'endYear': endYear,
                    'runtimeMinutes': runtimeMinutes,
                    'genres': genres,
                    'img_url_asset': img_url_asset,
                })

            # Perform necessary actions with the data (e.g., save to the database)

            # Return a JSON response with a success message
            return JsonResponse({'status': 'success', 'data': data_to_process})
        else:
            return JsonResponse({'status': 'error', 'message': 'Form is not valid'}, status=400)
    else:
        form = TitleBasicUploadForm()

    return render(request, 'administrator/upload_titlebasics.html', {'form': form})












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


# @csrf_exempt
# @require_http_methods(["POST"])
def reset_all(request):
    try:
        with transaction.atomic():
            # List all models that you want to reset
            TitleAka.objects.all().delete()
            Principals.objects.all().delete()
            Workas.objects.all().delete()
            Names.objects.all().delete()
            Episode.objects.all().delete()
            Rating.objects.all().delete()
            Crew.objects.all().delete()
            TitleBasic.objects.all().delete()
             # Add similar lines for all other models you have

        return JsonResponse({"status": "OK"})
    except DatabaseError as e:
        return JsonResponse({"status": "failed", "reason": str(e)})


















































