from django import forms

class TitleBasicUploadForm(forms.Form):
    tsv_file = forms.FileField(label='Upload TSV file')

class UploadTitleAkasForm(forms.Form):
    tsv_file = forms.FileField(label='Upload TSV file')

class UploadNamesForm(forms.Form):
    tsv_file = forms.FileField(label='Upload TSV file')

