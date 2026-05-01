#!/bin/sh
set -e

echo "========================================"
echo "EDU Platform - Container Startup"
echo "========================================"

# Ensure permissions are correct
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Run optimizations
echo "[1/6] Caching configuration..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Wait for database using mysqladmin (reliable, no PHP dependency)
echo "[2/6] Waiting for database connection..."
MAX_RETRIES=30
RETRY_COUNT=0
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "ERROR: Could not connect to database after $MAX_RETRIES attempts."
    echo "DB_HOST=$DB_HOST DB_PORT=$DB_PORT DB_USERNAME=$DB_USERNAME"
    echo "Starting supervisord WITHOUT migrations (app may have limited functionality)..."
    exec "$@"
  fi
  echo "  Database not ready (attempt $RETRY_COUNT/$MAX_RETRIES) - retrying in 3s..."
  sleep 3
done
echo "  Database connected!"

# Run migrations
echo "[3/6] Running migrations..."
php artisan migrate --force

# Run seeders (wrapped in try-catch style)
echo "[4/6] Running seeders..."
php artisan db:seed --class=DemoDataSeeder --force || {
  echo "  WARNING: Seeder had errors (possibly data already exists). Continuing..."
}

# Link storage directory
echo "[5/6] Linking storage..."
php artisan storage:link 2>/dev/null || true

echo "[6/6] Starting Supervisord..."
echo "========================================"
exec "$@"
