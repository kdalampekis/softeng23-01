from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(TitleObject)
admin.site.register(NameObject)
admin.site.register(TitleAka)

admin.site.register(TitleBasic)
admin.site.register(Name)
admin.site.register(Crew)

admin.site.register(Episode)
admin.site.register(Principal)
admin.site.register(Rating)
