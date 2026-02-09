#!/bin/bash

# Deploy Script for Edu Platform
# Usage: ./deploy.sh

set -e


echo "📦 Starting deployment..."

# Usage: ./deploy.sh

set -e

# Load .env variables automatically
if [ -f .env ]; then
  # Use set -a to export all variables defined in .env
  set -a
  source .env
  set +a
fi

echo "📦 Starting deployment (Swarm Mode)..."

# 1. Pull latest image
echo "⬇️ Pulling latest images from Registry..."
docker compose pull app

# 2. Deploy Stack
echo "🔄 Updating Swarm Stack..."
docker stack deploy --with-registry-auth -c docker-compose.yml edu

echo "⏳ Waiting for service to stabilize (10s)..."
sleep 10

# 3. Find running app container for commands
# We take the first one found
CONTAINER_ID=$(docker ps -q -f name=edu_app | head -n 1)

if [ -z "$CONTAINER_ID" ]; then
    echo "⚠️  App container not found. Skipping cache clear and migrations."
    echo "    Check logs with: docker service logs edu_app"
else
    echo "🎯 Found container: $CONTAINER_ID"
    
    # 3. Clear caches
    echo "🧹 Clearing application caches..."
    docker exec $CONTAINER_ID php artisan optimize
    docker exec $CONTAINER_ID php artisan view:cache

    # 4. Run migrations
    echo "🗄️ Running database migrations..."
    docker exec $CONTAINER_ID php artisan migrate --force
fi

echo "✅ Deployment completed successfully!"
