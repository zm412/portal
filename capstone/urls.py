
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("home", views.index, name="index"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("site_info", views.site_info, name="site_info"),

    path("get_all_approved_items/", views.get_all_approved_items, name="get_all_approved_items"),

    path("all_categories/", views.get_all_categories, name="get_all_categories"),
    path("add_category/", views.add_category, name="add_category"),
    path("delete_category/", views.del_category, name="del_category"),
    path("update_category/", views.update_category, name="update_category"),

    path("put_in/", views.put_in, name="put_in"),
    path("add_like/<int:item_id>", views.add_like, name="add_like"),
    path("add_comment/<int:item_id>", views.add_comment, name="add_comment"),
    path("delete_comment/", views.delete_comment, name="delete_comment"),
    path("save_on_my_list/", views.save_on_my_list, name="save_on_my_list"),
    path("delete_item/", views.delete_item, name="delete_item"),
    path("delete_shared_item/", views.delete_shared_item, name="delete_shared_item"),
    path("approve_share/", views.approve_share, name="approve_share"),
    path("share_item/", views.share_item, name="share_item"),
    path("get_items_list/", views.get_items_list, name="get_items_list"),
    path("get_admin_check/", views.get_admin_check, name="get_admin_check"),
]
