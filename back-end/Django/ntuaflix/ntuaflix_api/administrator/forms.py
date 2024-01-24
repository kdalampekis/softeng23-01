from django import forms

class TitleBasicUploadForm(forms.Form):
    tsv_file = forms.FileField(label='Upload TSV file')