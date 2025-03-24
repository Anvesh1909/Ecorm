import os
import django
from django.core.files import File

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shopit.settings')
django.setup()

from shop_app.models import Product

# Define the media path where images are stored
media_path = r"C:\Users\manve\Downloads\img"

# Product details (name, price in INR, category)
products = [
    ("Air Conditioner", 45000, "Electronics"),
    ("Bread", 40, "Groceries"),
    ("Butter", 55, "Groceries"),
    ("Cap", 150, "Clothings"),
    ("Designer Item", 1200, "Clothings"),
    ("Eggs", 80, "Groceries"),
    ("Headphone", 2500, "Electronics"),
    ("Jacket", 2000, "Clothings"),
    ("Jeans", 1500, "Clothings"),
    ("Keyboard", 1200, "Electronics"),
    ("Laptop", 50000, "Electronics"),
    ("Milk", 50, "Groceries"),
    ("Mouse", 800, "Electronics"),
    ("Oven", 10000, "Electronics"),
    ("Refrigerator", 35000, "Electronics"),
    ("Rice Bag", 2000, "Groceries"),
    ("Shoes", 3000, "Clothings"),
    ("Smartphone", 25000, "Electronics"),
    ("Television", 40000, "Electronics"),
    ("T-shirt", 600, "Clothings"),
    ("Washing Machine", 32000, "Electronics"),
]

# Loop through products and create entries
for name, price, category in products:
    image_name = name.lower().replace(" ", "_") + (".jpg" if name != "Designer Item" else ".png")
    image_path = os.path.join(media_path, image_name)

    if os.path.exists(image_path):
        with open(image_path, "rb") as img_file:
            product = Product(
                name=name,
                price=price,
                category=category,
            )
            product.image.save(image_name, File(img_file))
            product.save()
            print(f"Added: {name} ✅")
    else:
        print(f"Image missing for: {name} ❌")

print("All products added successfully!") 