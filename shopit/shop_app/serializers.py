from rest_framework import serializers
from .models import Cart, CartItem, Product
from django.contrib.auth import get_user_model


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class DetailsProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products"]

    def get_similar_products(self, product):
        similar = Product.objects.filter(category=product.category).exclude(id=product.id)
        return ProductSerializer(similar, many=True).data


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'quantity', 'product', 'total']

    def get_total(self, cart_item):
        return cart_item.product.price * cart_item.quantity


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'items', 'sum_total', 'num_of_items', 'created_at', 'modified_at']

    def get_sum_total(self, cart):
        items = cart.items.all()
        total = sum([item.product.price * item.quantity for item in items])
        return total
    
    def get_num_of_items(self, cart):
        items = cart.items.all()
        total = sum([item.quantity for item in items])
        return total


class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'num_of_items']

    def get_num_of_items(self, cart):
        return sum(item.quantity for item in cart.items.all())


class NewCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'order_id','order_date']

    
    def get_order_id(self, cart_item):
        order_id = cart_item.cart.cart_code
        return order_id

    def get_order_date(self, cart_item):
        order_date = cart_item.cart.modified_at
        return order_date

class UserSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'address', 'city', 'date_joined', 'items']

    def get_items(self, user):
        paid_carts = Cart.objects.filter(user=user, paid=True)  # Ensure carts belong to the user
        cartitems = CartItem.objects.filter(cart__in=paid_carts).order_by('-cart__modified_at')[:10]
        serializer = NewCartItemSerializer(cartitems, many=True)
        return serializer.data

  


