#!/bin/sh
set -e

# Ensure permissions are correct
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Run optimizations
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (continue even if they fail to prevent container crash loops)
echo "Running migrations..."
php artisan migrate --force || echo "WARNING: Some migrations failed. Check logs."

# Run seeders (creates admin user and initial data)
echo "Running seeders..."
php artisan db:seed --force

# Link storage directory
php artisan storage:link

# Reset Reverb (if needed)
# php artisan reverb:restart

echo "Starting Supervisord..."
exec "$@"
