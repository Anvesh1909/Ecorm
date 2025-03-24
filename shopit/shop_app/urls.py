from multiprocessing.spawn import import_main_path
from os import name
from django.urls import path



from . import views

urlpatterns = [
    path('products',views.products,name='products'),
    path("product_detail/<slug:slug>",views.product_details,name="product_detail"),
    path("add_item/", views.add_item, name='add_item'),
    path('product_in_cart',views.product_in_cart,name='product_in_cart'),
    path('get_cart_status',views.get_cart_status,name='get_cart_status'),
    path('get_cart',views.get_cart,name='get_cart'),
    path('update_quantity',views.update_quantity,name='update_quantity'),
    path('delete_item',views.delete_item,name='delete_item'),
    path('get_username',views.getUsername,name='get_username'),
    path('get_user_info',views.get_user_info,name='get_user_info'),
    path('initiate-payment/', views.initiate_payment, name='initiate-payment'),
    path('payment-callback/', views.payment_callback, name='payment-callback'),
]


