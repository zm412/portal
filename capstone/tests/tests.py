
from django.test import TestCase, Client
from datetime import timedelta, datetime
from django.urls import reverse
from capstone.models import  User, Category, Item, Shared_item, Comment
from django.core.files.uploadedfile import SimpleUploadedFile
import json

# Create your tests here.

def get_categories():
    category_list = Category.objects.filter(type_content=None)
    list = [( 'null', 'null' )]
    for a in category_list:
        list.append((a.name, a.name))
    return tuple(list)



class CategoryViewTestCase(TestCase):


    def setUp(self):
        self.user1 = User.objects.create(username='TestUser1', password='123taz@111', email='test@mail.ru')
        self.user2 = User.objects.create(username='TestUser2', password='223taz@222', email='test2@mail.ru')
        self.my_admin = User.objects.create_superuser('myuser', 'myemail@test.com', '123taz@333')
        self.client = Client()
        self.main_category = Category.objects.create(type_content=None, valid_extensions='.yok, .lmn', name='video')

    def test_create_category_superuser_success(self):
        req = self.client.force_login(self.my_admin, backend=None)
        obj4 = {
            "name": 'music',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }

        response1 = self.client.post('/add_category/', obj4)

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'New category successfully saved')

    def test_create_category_superuser_fail(self):
        req = self.client.force_login(self.my_admin, backend=None)
        obj1 = {
            "name": '',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }
        response1 = self.client.post('/add_category/', obj1)

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'Data is not valid')

    def test_create_category_not_post(self):
        req = self.client.force_login(self.my_admin, backend=None)

        obj1 = {
            "name": 'notPostCreateCat',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }
        response1 = self.client.get('/add_category/', obj1)
        self.assertEqual(response1.status_code, 404)

    def test_create_category_not_superuser_fail(self):
        req = self.client.force_login(self.user1, backend=None)
        obj1 = {
            "name": 'notSuperCreateCat',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }
        response1 = self.client.post('/add_category/', obj1)
        self.assertEqual(response1.status_code, 404)

    def test_create_category_dublicat(self):
        req = self.client.force_login(self.my_admin, backend=None)
        obj1 = {
            "name": 'dublicate',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }

        response1 = self.client.post('/add_category/', obj1)
        response2 = self.client.post('/add_category/', obj1)

        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.json()['message'], 'This category already exists')

    def test_get_all_categories(self):
        req = self.client.force_login(self.my_admin, backend=None)
        response1 = self.client.post('/all_categories/')

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['status'], 'Ok')

    def test_update_category_by_admin(self):
        req = self.client.force_login(self.my_admin, backend=None)

        obj = {
            "name": 'book',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }

        response = self.client.post('/add_category/', obj)

        obj1 = {
            "id": Category.objects.get(name='book').id,
            "ext": '.op, .rst'
        }

        response1 = self.client.post('/update_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(Category.objects.get(name='book').valid_extensions, '.op, .rst')

    def test_update_category_by_admin_get(self):
        req = self.client.force_login(self.my_admin, backend=None)

        obj = {
            "name": 'book',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }

        response = self.client.post('/add_category/', obj)

        obj1 = {
            "id": Category.objects.get(name='book').id,
            "ext": '.op, .rst'
        }

        response1 = self.client.get('/update_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'something went wrong!')


    def test_update_category_by_user(self):
        req = self.client.force_login(self.my_admin, backend=None)
        obj = {
            "name": 'book',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }
        response = self.client.post('/add_category/', obj)


        req = self.client.force_login(self.user1, backend=None)
        obj1 = {
            "id": Category.objects.get(name='book').id,
            "ext": '.op, .rst'
        }

        response1 = self.client.post('/update_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'something went wrong!')


    def test_update_category_with_wrong_data(self):
        req = self.client.force_login(self.my_admin, backend=None)

        obj1 = {
            "id": 99,
            "ext": '.op, .rst'
        }

        response1 = self.client.post('/update_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'there is no category with such id')


    def test_delete_category_by_admin_success(self):
        req = self.client.force_login(self.my_admin, backend=None)

        obj = {
            "name": 'book',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }

        response = self.client.post('/add_category/', obj)

        obj1 = {
            "id": Category.objects.get(name='book').id,
        }

        response1 = self.client.post('/delete_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'category deleted')


    def test_delete_category_by_admin_with_wrong_id(self):
        req = self.client.force_login(self.my_admin, backend=None)
        obj1 = { "id": 99 }

        response1 = self.client.post('/delete_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'],  'there is no category with such id')


    def test_delete_category_by_user(self):
        req = self.client.force_login(self.my_admin, backend=None)
        obj = {
            "name": 'book',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }
        response = self.client.post('/add_category/', obj)


        req = self.client.force_login(self.user1, backend=None)
        obj1 = { "id": Category.objects.get(name='book').id }

        response1 = self.client.post('/delete_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'something went wrong!')


    def test_delete_category_by_admin_get(self):
        req = self.client.force_login(self.my_admin, backend=None)

        obj = {
            "name": 'book',
            "valid_extensions": '.yok, .lmn',
            "type_content": 'null'
        }

        response = self.client.post('/add_category/', obj)

        obj1 = { "id": Category.objects.get(name='book').id }

        response1 = self.client.get('/delete_category/', obj1, "application/json")

        self.assertEqual(response1.status_code, 200)
        self.assertEqual(response1.json()['message'], 'something went wrong!')


