#!/bin/bash

# Deploy Script for Edu Platform
# Usage: ./deploy.sh

set -e


echo "📦 Starting deployment..."

# 1. Check for build flag
if [ "$1" == "--build" ]; then
    echo "🏗️ Building image locally on VPS (Ignoring Registry)..."
    docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
else
    echo "⬇️ Pulling latest images from Registry..."
    docker compose pull app
    echo "🔄 Updating containers..."
    docker compose up -d
fi

# 3. Clear caches (optional but recommended)
echo "🧹 Clearing application caches..."
docker compose exec -T app php artisan optimize
docker compose exec -T app php artisan view:cache

# 4. Run migrations
echo "🗄️ Running database migrations..."
docker compose exec -T app php artisan migrate --force

echo "✅ Deployment completed successfully!"
