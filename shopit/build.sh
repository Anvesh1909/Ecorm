#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Navigating to Django project directory..."
cd shopit

echo "Making migrations for core app..."
python manage.py makemigrations core

echo "Making migrations for shop_app..."
python manage.py makemigrations shop_app

echo "Running migrations..."
python manage.py migrate core
python manage.py migrate shop_app
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Build completed!" 