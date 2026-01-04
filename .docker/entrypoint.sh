#!/bin/sh
set -e

# Ensure permissions are correct
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Run optimizations
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (Optional: be careful in production on auto-deploy)
# echo "Running migrations..."
# php artisan migrate --force

# Reset Reverb (if needed)
# php artisan reverb:restart

echo "Starting Supervisord..."
exec "$@"
