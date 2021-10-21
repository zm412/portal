from django.contrib.auth.models import AbstractUser
from django.db import models
from django import forms
from django.db.models.signals import post_save, pre_save
from django.core.validators import RegexValidator
import base64

validate_alphanumeric = RegexValidator(r'^[a-zA-Z0-9]+$', 'Only alphanumeric characters are allowed.')


class User(AbstractUser):
    pass
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'is_superuser': self.is_superuser,
        }

class ContentManager(models.Manager):
    def create_book(self, title):
        book = self.create(title=title)
        # do something with the book
        return book


class Category(models.Model):

    name = models.CharField(max_length=100, blank=True, null=True )
    type_content = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='children')
    valid_extensions = models.CharField(max_length=250, blank=True, null=True )

    def __str__(self):
        return f'{self.name} of type_content: {self.type_content}'

    def serialize(self):
        type_content = ''
        if(self.type_content == None):
            type_content = 'null'
        else:
            type_content =  self.type_content.name

        return {
            'id': self.id,
            'type_content': type_content,
            'name': self.name,
            'valid_extensions': self.valid_extensions,
        }

def user_directory_path(instance, filename):
      # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return '{0}/{1}/{2}'.format(instance.user.id, instance.type_content, filename)


class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='item_author')
    owners_list = models.ManyToManyField(User, related_name='owners')
    title = models.CharField(max_length=64)
    type_content = models.CharField(max_length=64)
    description = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    category = models.ManyToManyField(Category, related_name='item_category')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    file_item = models.FileField(upload_to=user_directory_path)
    file_size = models.PositiveIntegerField(default=False)

    def get_type_content(self):
        type_content = list(self.category.all())

        return type_content[0]


    def __str__(self):
        return f'id: {self.user.id} ,title: {self.title}, type_content: {self.type_content}'

    def get_owners_list(self):
        querySet = self.owners_list.all()
        return [{'name': owner.username, "id": owner.id } for owner in querySet]


    def getCategoriesList(self):
        querySet = self.category.all()
        return [{'name': category.name, "id": category.id } for category in querySet]

    def getInfoShared(self):
        try:
            item_shared_info = Shared_item.objects.get(item=self)
            return item_shared_info.serialize()
        except Shared_item.DoesNotExist:
            return False

    def getCommentInfo(self):
        try:
            item_comments = Comment.objects.filter(item_for_comm=self)
            return [item_comment.serialize() for item_comment in item_comments]
        except Comment.DoesNotExist:
            return False



    def serialize(self):

        return {
            'id': self.id,
            'user_id': self.user.id,
            'user_username': self.user.username,
            'title': self.title,
            'description': self.description,
            'uploaded_at': self.uploaded_at,
            'file_item': str( self.file_item ),
            'category_type': self.type_content,
            'category_list': self.getCategoriesList(),
            'shared_info': self.getInfoShared(),
            'comment_info': self.getCommentInfo(),
            'file_size': self.file_size,
            'owners_list': self.get_owners_list()
        }


class Shared_item(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE, related_name="item_share")
    shared = models.BooleanField(default=False)
    shared_at = models.DateTimeField(auto_now_add=True)
    solved = models.BooleanField(default=False)
    solved_at = models.DateTimeField(blank=True, null=True,)
    solved_by = models.ForeignKey(User, on_delete = models.DO_NOTHING, blank=True, null=True,)
    approved = models.BooleanField(blank=True, null=True)
    likes_list_users = models.ManyToManyField(User, blank=True, null=True, related_name="likers_list")

    def __str__(self):
        return f"{self.item}"

    def getLikersList(self):
        querySet = self.likes_list_users.all()
        return [{'name': liker.username, "id": liker.id } for liker in querySet]


    def serialize(self):
        return {
            'id': self.id,
            'title': self.item.title,
            'description': self.item.description,
            'uploaded_at': self.item.uploaded_at,
            'file_item': str( self.item.file_item ),
            'category_type': self.item.type_content,
            'shared_at': self.shared_at,
            'approved': self.approved,
            'solved_at': self.solved_at,
            'solved': self.solved,
            'likers': self.getLikersList()

        }


class Comment(models.Model):
    item_for_comm = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="comm_item")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="commenter")
    created_at = models.DateTimeField(auto_now_add=True)
    comment = models.CharField(max_length=2000)

    def serialize(self):
        return{
            'id': self.id,
            'item_id': self.item_for_comm.id,
            'user_id': self.user.id,
            'username': self.user.username,
            'created_at': self.created_at,
            'comment': self.comment
        }

    def __str__(self):
        return f"user: {self.user}, comment: {self.comment}"






