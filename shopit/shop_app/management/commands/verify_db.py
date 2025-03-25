from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Verify database setup and tables'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Get list of all tables
            cursor.execute("""
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
                AND name NOT LIKE 'django_%';
            """)
            tables = cursor.fetchall()
            
            self.stdout.write("Found tables:")
            for table in tables:
                self.stdout.write(f"- {table[0]}")
            
            # Verify specific tables
            required_tables = ['shop_app_product', 'shop_app_cart', 'shop_app_cartitem']
            for table in required_tables:
                cursor.execute(f"""
                    SELECT name FROM sqlite_master 
                    WHERE type='table' AND name='{table}';
                """)
                if cursor.fetchone():
                    self.stdout.write(self.style.SUCCESS(f"✓ Table {table} exists"))
                else:
                    self.stdout.write(self.style.ERROR(f"✗ Table {table} is missing!")) 