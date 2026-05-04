#!/bin/bash

# ============================================================
#   EDU Platform - FINAL PRODUCTION DEPLOY (Traefik Version)
# ============================================================

echo "Starting deployment for edu.echo.dev.br..."

# 1. Update code
git fetch origin demo
git reset --hard origin/demo

# 2. Prepare Environment
if [ ! -f .env ]; then
    echo "Creating .env from .env.production..."
    cp .env.production .env
fi

# Garantir que o DB_HOST use o nome do serviço no Swarm
sed -i 's/DB_HOST=.*/DB_HOST=database_mariadb/' .env
sed -i 's/REDIS_HOST=.*/REDIS_HOST=edu_demo_redis/' .env

# 3. Build Image
echo "Building Docker image..."
docker build -t edu-plataforma-educacional:latest .

# 4. Deploy Stack
echo "Deploying to Docker Swarm..."
docker stack deploy -c docker-compose.yml edu_demo

# 5. Post-Deploy Tasks
echo "Waiting for container to stabilize (45s)..."
sleep 45

APP_CONTAINER=$(docker ps -q -f name=edu_demo_app)

if [ -n "$APP_CONTAINER" ]; then
    echo "Running migrations..."
    docker exec $APP_CONTAINER php artisan migrate --force
    
    # Check if APP_KEY is empty and generate if needed
    if docker exec $APP_CONTAINER php artisan key:generate --show | grep -q "base64"; then
        echo "Ensuring APP_KEY is set..."
        docker exec $APP_CONTAINER php artisan key:generate --force
    fi

    echo "Caching configuration..."
    docker exec $APP_CONTAINER php artisan config:cache
    docker exec $APP_CONTAINER php artisan view:cache
    echo "Deployment successful!"
else
    echo "ERROR: Container edu_demo_app not found. Check 'docker service ps edu_demo_app'"
fi

echo "============================================================"
echo "  URL: https://edu.echo.dev.br"
echo "============================================================"
