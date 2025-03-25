import os
from django.core.files import File
from django.utils.text import slugify
from shop_app.models import Product

# Define the media path where images are stored
media_path = r"C:\Users\manve\Downloads\img"

# Product details (name, price, category, description)
products = [
    ("Air Conditioner", 45000, "Electronics", "Efficient and powerful air conditioner with fast cooling technology."),
    ("Bread", 40, "Groceries", "Freshly baked bread, perfect for sandwiches and toast."),
    ("Butter", 55, "Groceries", "Creamy and smooth butter, ideal for cooking and baking."),
    ("Cap", 150, "Clothings", "Stylish and comfortable cap suitable for all seasons."),
    ("Designer Item", 1200, "Clothings", "Exclusive designer item to enhance your fashion statement."),
    ("Eggs", 80, "Groceries", "Farm-fresh eggs rich in protein and nutrition."),
    ("Headphone", 2500, "Electronics", "Noise-canceling headphones with superior sound quality."),
    ("Jacket", 2000, "Clothings", "Warm and stylish jacket perfect for winter."),
    ("Jeans", 1500, "Clothings", "Classic denim jeans with a comfortable fit."),
    ("Keyboard", 1200, "Electronics", "Mechanical keyboard with RGB lighting."),
    ("Laptop", 50000, "Electronics", "High-performance laptop for work and entertainment."),
    ("Milk", 50, "Groceries", "Pure and fresh milk, full of nutrients."),
    ("Mouse", 800, "Electronics", "Wireless mouse with ergonomic design."),
    ("Oven", 10000, "Electronics", "Convection oven with multiple cooking modes."),
    ("Refrigerator", 35000, "Electronics", "Double-door refrigerator with energy-saving features."),
    ("Rice Bag", 2000, "Groceries", "Premium quality rice with rich taste."),
    ("Shoes", 3000, "Clothings", "Durable and stylish shoes for all occasions."),
    ("Smartphone", 25000, "Electronics", "Latest smartphone with high-resolution camera."),
    ("Television", 40000, "Electronics", "4K Smart TV with immersive display."),
    ("T-shirt", 600, "Clothings", "Comfortable cotton T-shirt available in various colors."),
    ("Washing Machine", 32000, "Electronics", "Fully automatic washing machine with smart features."),
]

# Insert products into the database
for name, price, category, description in products:
    image_path = os.path.join(media_path, f"{name.lower().replace(' ', '_')}.jpg")

    product = Product(
        name=name,
        price=price,
        category=category,
        description=description,
        slug=slugify(name)
    )

    # Attach image if available
    if os.path.exists(image_path):
        with open(image_path, "rb") as img_file:
            product.image.save(f"{name.lower().replace(' ', '_')}.jpg", File(img_file), save=False)

    product.save()

print("Products added successfully!")
