#!/bin/sh

echo "========================================"
echo "EDU Platform - Container Startup"
echo "========================================"

# Ensure permissions are correct
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

# Run optimizations
echo "[1/5] Caching configuration..."
php artisan optimize:clear 2>/dev/null || true
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Try database connection (non-blocking - will NOT prevent startup)
echo "[2/5] Checking database connection..."
DB_READY=false
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
  if php artisan tinker --execute="try { DB::connection()->getPdo(); echo 'OK'; } catch(\Exception \$e) { echo 'FAIL'; exit(1); }" 2>/dev/null | grep -q "OK"; then
    DB_READY=true
    echo "  Database connected!"
    break
  fi
  echo "  Attempt $i/15 - Database not ready, retrying in 2s..."
  sleep 2
done

if [ "$DB_READY" = true ]; then
  # Run migrations
  echo "[3/5] Running migrations..."
  php artisan migrate --force || echo "  WARNING: Migration had issues, continuing..."

  # Run seeders
  echo "[4/5] Running seeders..."
  php artisan db:seed --class=DemoDataSeeder --force 2>&1 || echo "  WARNING: Seeder had issues (data may already exist), continuing..."
else
  echo "  WARNING: Database not available after 15 attempts."
  echo "  App will start without migrations. Run manually when DB is ready:"
  echo "    docker exec \$(docker ps -q -f name=edu_demo_app) php artisan migrate --force"
fi

# Link storage directory
echo "[5/5] Linking storage..."
php artisan storage:link 2>/dev/null || true

echo ""
echo "Starting Supervisord..."
echo "========================================"
exec "$@"
