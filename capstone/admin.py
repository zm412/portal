from django.contrib import admin
from .models import Item, Category, Shared_item, Comment

# Register your models here.
admin.site.register(Item)
admin.site.register(Category)
admin.site.register(Shared_item)
admin.site.register(Comment)
