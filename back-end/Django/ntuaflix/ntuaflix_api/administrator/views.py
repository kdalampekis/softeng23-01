from django.shortcuts import render
from django.http import JsonResponse
import csv
from .forms import TitleBasicUploadForm

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
