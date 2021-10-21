from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from django.shortcuts import render
from django.db.models import Q
from django.urls import reverse
from django.http import JsonResponse
from django import forms
from django.utils import timezone
from datetime import timedelta, datetime
from django.views.decorators.http import require_http_methods
import json

from .models import User, Item, Category, Shared_item, Comment

def get_categories():
    category_list = Category.objects.filter(type_content=None)
    list = [( 'null', 'null' )]
    for a in category_list:
        list.append((a.name, a.name))
    return tuple(list)


class Choose_category(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['type_content']


class Category_form(forms.ModelForm):
    type_content = forms.MultipleChoiceField(required=False,
                                             widget=forms.SelectMultiple,
                                             choices=get_categories()
                                            )
    class Meta:
        model = Category

        fields = ['name', 'valid_extensions']

class Add_item(forms.ModelForm):
    class Meta:
        model = Item
        exclude = ['type_content']
        fields = ['title', 'description', 'file_item']

def index(request):
    if request.user.is_authenticated:
        return render(request, "capstone/index.html")
    else:


        return render(request, "capstone/login.html")


def site_info(request):
    return render(request, "capstone/file_portal_info.html")

def get_all_categories(request):
    return JsonResponse({'status': 'Ok', 'message': "OUIOU", 'categories': [type_cat.serialize() for type_cat in Category.objects.all()]})

def update_category(request):
    message = ''
    if request.method == "POST" and request.user.is_superuser and request.body:
        data = json.loads(request.body)
        try:
            category = Category.objects.get(id=data['id'])
            category.valid_extensions = data['ext']
            category.save()
            message = 'category changed'
        except Category.DoesNotExist:
            message = 'there is no category with such id'
    else:
        message = 'something went wrong!'
    return JsonResponse({ 'message': message })


def del_category(request):
    message = ''
    if request.method == "POST" and request.user.is_superuser and request.body:
        data = json.loads(request.body)
        try:
            category = Category.objects.get(id=data['id'])
            category.delete()
            message = 'category deleted'
        except Category.DoesNotExist:
            message = 'there is no category with such id'
    else:
        message = 'something went wrong!'
    return JsonResponse({ 'message': message })

def add_category(request):
    query = get_categories()
    cat = Category.objects.all()
    message = ''
    error = True

    if request.method == "POST" and request.user.is_superuser:
        form = Category_form(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            name = data['name']
            type_c = data['type_content'][0]
            instance_type = ''
            valid_ext = data['valid_extensions']

            if type_c == 'null':
                instance_type = None
            else:
                instance_type = Category.objects.get(name = type_c)

            try:
                Category.objects.get(name=name, type_content=instance_type)
                message = 'This category already exists'
            except Category.DoesNotExist:
                category = form.save()
                category.type_content = instance_type
                category.save()
                message = 'New category successfully saved'
                error = False
        else:
            message = 'Data is not valid'
    elif request.method != 'POST' or request.user.is_superuser is not True:
        return HttpResponseNotFound('<h1>Page not found</h1>')

    return JsonResponse({
        'message': message,
        'error': error,
        'categories': [type_cat.serialize() for type_cat in Category.objects.all()]
    })


def put_in(request):
    message = ''
    if request.method == "POST":

        file_instance = request.FILES['file_item']
        if(file_instance.size <= 10485760):
            type_c = request.POST['type_content']
            new_item = Item(user=request.user, type_content=type_c, file_size=file_instance.size)
            new_item.save()
            add_form = Add_item(request.POST, request.FILES, instance=new_item)

            if add_form.is_valid():
                item = add_form.save()

                category_item = request.POST.getlist('category')
                type_category_instance = Category.objects.get(name=type_c)

                for c in category_item:
                    categoryC = Category.objects.get(name=c, type_content=type_category_instance.id)
                    categoryC.item_category.add(item)

                item.save()
                message =  'File was uploaded'
            else:
                message =  'Data is not valid'
        else:
            message =  'Data is not valid'

    return JsonResponse({'message': message})


def get_all_approved_items(request):

    if request.method == 'POST':
        data = json.loads(request.body)
        start = data['start']
        end = data['end']
        filterArr = data['filterArr']
        isFilter = len(filterArr) > 0

        all_approved_items = Shared_item.objects.filter(approved=True)

        if(isFilter):
            res = []
            for cat in filterArr:
                cat = Category.objects.get(name=cat)
                res.append(cat)
            obj = Shared_item.objects.filter(item__category__in=res).distinct()
            all_approved_items = obj

        posts = all_approved_items.order_by("-shared_at").all()[start: end]
        return JsonResponse({
            'item': [approved_item.item.serialize() for approved_item in posts],
            'quantity': all_approved_items.count()
        })
    else:
        return JsonResponse({
            'item': [],
            'quantity': 0
        })

def save_on_my_list(request):
    message = ''
    if request.method == "POST":
        data = json.loads(request.body)
        item = Item.objects.get(id=data['id'])
        if item.user.id != request.user.id:
            try:
                item.owners_list.get(id=request.user.id)
                item.owners_list.remove(request.user)
                message = 'Item is removed from my list'
            except User.DoesNotExist:
                item.owners_list.add(request.user)
                message = 'Item is added on my list'
        else:
                message = 'This item is not gonna be  added on list'

        print(message, 'mess')
        return JsonResponse({'message': message})


def add_like(request, item_id):
    item = Shared_item.objects.get(item__id=item_id)
    message = ''

    try:
        item.likes_list_users.get(id=request.user.id)
        item.likes_list_users.remove(request.user.id)
        message = 'like is removed'
    except User.DoesNotExist:
        item.likes_list_users.add(request.user.id)
        message = 'Like is added'

    print(message, 'mess')
    return JsonResponse({'message': message})

def add_comment(request, item_id):
    message = ''
    if request.method == "POST":
        item = Item.objects.get(id=item_id)
        comment = item.comm_item.create( user = request.user, comment = request.POST['comment'])
        comments = item.comm_item.order_by('-created_at').all()
    return JsonResponse({
            'message': message,
            'comments': [comment.serialize() for comment in comments]
                         })


def delete_comment(request):
    if request.method == "POST" and request.body:
        data = json.loads(request.body)
        comment = Comment.objects.get(id=data['id'])
        comment.delete()
        return JsonResponse({
            'message': 'comment were deleted',
                })




def get_items_list(request):

    items = Item.objects.filter(Q(user=request.user) | Q(owners_list__id=request.user.id))
    sumF = 0
    items_personal = Item.objects.filter(user=request.user)
    data = {'item': [item.serialize() for item in items],
            'sum_size': sum( [int(item.file_size) for item in items_personal] )
            }
    return JsonResponse(data)


def delete_item(request):
    message = ''
    if request.method == "POST" and request.body:
        data = json.loads(request.body)
        item = Item.objects.get(id=data['id'])
        if item:
            item.delete()
            message = 'item deleted'
        else:
            message = 'there is no item with such id'
    else:
        message = 'something went wrong!'
    print(message, 'messDelete')
    return JsonResponse({ 'message': message })

def get_admin_check(request):
    check_items = Shared_item.objects.filter(solved=False)
    return JsonResponse({
        'check_items': [check_item.item.serialize() for check_item in check_items]
    })


def delete_shared_item(request):
    message = ''
    if request.method == "POST" and request.body:
        data = json.loads(request.body)
        shared_item = Shared_item.objects.get(item__id=data['id'])
        if shared_item:
            shared_item.delete()
            message = 'item deleted'
        else:
            message = 'there is no item with such id'
    else:
        message = 'something went wrong!'

    return JsonResponse({ 'message': message })


def share_item(request):
    message = ''
    if request.method == "POST" and request.body:
        data = json.loads(request.body)
        item = Item.objects.get(id=data['id'])
        try:
            shared_item = Shared_item.objects.get(item=item)
            message = 'this item is already in common line'
        except Shared_item.DoesNotExist:
            message = 'item sent to admin for approving'
            shared_item = Shared_item(item=item)
            shared_item.save()
    else:
        message = 'something went wrong!'
    return JsonResponse({ 'message': message })

def approve_share(request):
    message = ''
    if request.method == "POST" and request.body:
        data = json.loads(request.body)
        shared_item = Shared_item.objects.get(item__id=data['id'])
        approve_doc = ''
        if request.user.is_superuser:
            if data['res'] == 'positive':
                approve_doc = True
                message = 'item approved'

            elif data['res'] == 'negative':
                approve_doc = False
                shared_item.approved = False
                message = 'request for sharing denied'
            else:
                message = 'there is no such res'

            try:
                Shared_item.objects.filter(item__id=data['id']).update(solved_at=timezone.now(), solved_by=request.user, solved=True, approved=approve_doc)

            except Shared_item.DoesNotExist:
                message = 'there is no item with such id'
        else:
            'You dont have permission for this operation'
    else:
        message = 'something went wrong!'

    print(message, 'approveSharedFile')
    return JsonResponse({ 'message': message })



def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "capstone/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "capstone/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "capstone/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "capstone/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "capstone/register.html")
