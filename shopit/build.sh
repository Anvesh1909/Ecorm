#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Navigating to Django project directory..."
cd shopit

python manage.py makemigrations
python manage.py makemigrations core
python manage.py makemigrations shopit
python manage.py makemigrations shop_app
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Build completed!" 