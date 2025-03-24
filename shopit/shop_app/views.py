import decimal
import re
from urllib import response
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from shop_app.serializers import CartItemSerializer, DetailsProductSerializer, ProductSerializer, UserSerializer
from shop_app.models import Product,Cart,CartItem,Transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

import uuid
from decimal import Decimal
import time
import requests
from django.conf import settings
import razorpay

from shopit.settings import REACT_BASE_URL


# Create your views here.


BASE_URL = REACT_BASE_URL

@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)

    # print(serializer.data) 
    
    return Response(serializer.data)


@api_view(['GET'])
def product_details(request,slug):
    product = Product.objects.get(slug=slug)
    serializer = DetailsProductSerializer(product)
    return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem, Product
from .serializers import CartItemSerializer, CartSerializer, SimpleCartSerializer

@api_view(['POST'])
def add_item(request):
    try:
        cart_code = request.data.get('cart_code')
        product_id = request.data.get('product_id')

        if not cart_code or not product_id:
            return Response({'error': 'cart_code and product_id are required'}, status=400)

        cart, created = Cart.objects.get_or_create(cart_code=cart_code)

        product = Product.objects.filter(id=product_id).first()
        if not product:
            return Response({'error': 'Product not found'}, status=400)

        cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cartitem.quantity = 1
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({'data': serializer.data, 'message': 'Cart item created successfully'}, status=201)
    
    except Exception as e:
        print(f"Error in add_item: {e}")  
        return Response({'error': str(e)}, status=400)



@api_view(['GET'])
def product_in_cart(request):
    try:
        cart_code = request.query_params.get('cart_code')
        product_id = request.query_params.get('product_id')
        
        # Try to get the cart, return False if it doesn't exist
        try:
            cart = Cart.objects.get(cart_code=cart_code)
            product = Product.objects.get(id=product_id)
            product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
        except Cart.DoesNotExist:
            return Response({
                'product_in_cart': False
            })
        except Product.DoesNotExist:
            return Response({
                'product_in_cart': False
            })

        return Response({
            'product_in_cart': product_exists_in_cart
        })
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=400)


@api_view(['GET'])
def get_cart_status(request):
    cart_code = request.query_params.get('cart_code')
    cart = Cart.objects.get(cart_code=cart_code,paid = False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)



@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get('cart_code')

    cart = Cart.objects.filter(cart_code=cart_code, paid=False).first()
    if not cart:
        return Response({"error": "Cart not found"}, status=404)

    serializer = CartSerializer(cart)
    return Response(serializer.data)



@api_view(['PATCH'])
def update_quantity(request):
    try:
        cartitem_id = request.data.get('item_id')
        quantity = request.data.get('quantity')
        quantity = int(quantity)
        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()
        serializer = CartItemSerializer(cartitem)
        return Response({'data': serializer.data, 'message': 'Cart item updated successfully'}, status=200)
    except Exception as e:
        print(f"Error in update_quantity: {e}")
        return Response({'error': str(e)}, status=400)

@api_view(['DELETE'])
def delete_item(request):
    try:
        cartitem_id = request.data.get('item_id')
        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.delete()
        return Response({'message': 'Cart item deleted successfully'}, status=200)  
    except Exception as e:
        print(f"Error in delete_item: {e}")
        return Response({'error': str(e)}, status=400)




@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def getUsername(request):
    username = request.user.username
    return Response({'username': username})




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


class PaymentStatus:
    SUCCESS = "success"
    FAILURE = "failed"
    PENDING = "pending"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_payment(request):
    if not request.user:
        return Response({'error': 'User not authenticated'}, status=401)
        
    try:
        cart_code = request.data.get('cart_code')
        if not cart_code:
            return Response({'error': 'cart_code is required'}, status=400)

        cart = Cart.objects.get(cart_code=cart_code, paid=False)
        cart_items = CartItem.objects.filter(cart=cart)
        
        if not cart_items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        user = request.user
        amount = 0
        for item in cart_items:
            amount += item.product.price * item.quantity

        tax = Decimal(0.15)
        total_amount = amount + (amount * tax)
        
        # Create Razorpay client
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        
        # Create Razorpay order
        razorpay_order = client.order.create({
            "amount": int(total_amount * 100),  # Convert to paise
            "currency": "INR",
            "payment_capture": 1,
            "notes": {
                "cart_code": cart_code,
                "user_id": user.id
            }
        })

        # Create transaction record
        transaction = Transaction.objects.create(
            tx_ref=razorpay_order['id'],
            cart=cart,
            amount=total_amount,
            currency='INR',
            user=user,
            status=PaymentStatus.PENDING
        )

        return Response({
            'order_id': razorpay_order['id'],
            'amount': razorpay_order['amount'],
            'currency': razorpay_order['currency'],
            'key': settings.RAZORPAY_KEY_ID,
            'name': user.username,
            'email': user.email,
            'contact': user.phone if hasattr(user, 'phone') and user.phone else '',
            'callback_url': f"{BASE_URL}/payment-status"
        })

    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found or already paid'}, status=404)
    except Exception as e:
        print(f"Error in initiate_payment: {str(e)}")
        return Response({
            'error': 'Payment initiation failed',
            'details': str(e)
        }, status=400)


# @api_view(['GET'])
# def payment_status(request):
#     payment_id = request.query_params.get('payment_id')
#     payment = Payment.objects.get(payment_id=payment_id)
#     return Response(payment.status)

@api_view(['POST'])
def payment_callback(request):
    try:
        # Get payment details from request data
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        signature = request.data.get('razorpay_signature')

        if not all([payment_id, order_id, signature]):
            return Response({'error': 'Missing required payment parameters'}, status=400)

        # Get the transaction using the order_id
        try:
            transaction = Transaction.objects.get(tx_ref=order_id)
        except Transaction.DoesNotExist:
            return Response({'error': 'Transaction not found'}, status=404)

        # Verify payment signature
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        params_dict = {
            'razorpay_payment_id': payment_id,
            'razorpay_order_id': order_id,
            'razorpay_signature': signature
        }
        
        try:
            client.utility.verify_payment_signature(params_dict)
            # Payment signature is valid
            transaction.status = PaymentStatus.SUCCESS
            transaction.save()

            # Update cart status and user
            cart = transaction.cart
            cart.paid = True
            cart.user = transaction.user  # Set the user from the transaction
            cart.save()

            return Response({
                'status': 'success',
                'message': 'Payment completed successfully',
                'transaction_id': transaction.tx_ref
            })
        except razorpay.errors.SignatureVerificationError:
            # Payment signature is invalid
            transaction.status = PaymentStatus.FAILURE
            transaction.save()
            return Response({
                'status': 'error',
                'message': 'Payment verification failed',
                'transaction_id': transaction.tx_ref
            }, status=400)

    except Exception as e:
        print(f"Error in payment_callback: {str(e)}")
        return Response({
            'error': 'Payment callback processing failed',
            'details': str(e)
        }, status=400)

        
