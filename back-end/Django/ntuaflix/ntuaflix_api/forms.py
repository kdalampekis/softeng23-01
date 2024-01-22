# forms.py
from django import forms

class TitleSearchForm(forms.Form):
    title = forms.CharField(label='Search for a title')
