#!/bin/bash

# Deploy Script for Edu Platform
# Usage: ./deploy.sh

echo "📦 Starting deployment..."

# 1. Pull the latest image
echo "⬇️ Pulling latest images..."
docker compose pull app

# 2. Restart containers
echo "🔄 Updating containers..."
docker compose up -d

# 3. Clear caches (optional but recommended)
echo "🧹 Clearing application caches..."
docker compose exec -T app php artisan optimize
docker compose exec -T app php artisan view:cache

# 4. Run migrations
echo "🗄️ Running database migrations..."
docker compose exec -T app php artisan migrate --force

echo "✅ Deployment completed successfully!"
