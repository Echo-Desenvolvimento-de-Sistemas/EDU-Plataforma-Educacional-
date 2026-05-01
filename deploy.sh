#!/bin/bash

# ============================================================
# EDU Platform - Definitive Deployment Script
# ============================================================
# Usage: ./deploy.sh
# Prerequisites:
#   - Docker with Swarm mode active
#   - MariaDB container running (any name)
#   - echonet overlay network created
# ============================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
STACK_NAME="edu_demo"
IMAGE_NAME="edu-plataforma-educacional:latest"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"
ENV_PRODUCTION_FILE=".env.production"
DB_NAME="edu"
DB_USER="root"
DB_PASS="Akio2604*"

log_step() { echo -e "\n${BLUE}[$1/$2]${NC} $3"; }
log_ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
log_warn() { echo -e "  ${YELLOW}⚠${NC} $1"; }
log_err()  { echo -e "  ${RED}✗${NC} $1"; }

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  EDU Platform - Production Deploy${NC}"
echo -e "${GREEN}========================================${NC}"

# ──────────────────────────────────────────────
log_step 1 8 "Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    log_err "Docker is not running"; exit 1
fi
log_ok "Docker is running"

if ! docker info 2>/dev/null | grep -q "Swarm: active"; then
    log_err "Docker Swarm is not initialized"
    echo -e "  Run: ${YELLOW}docker swarm init${NC}"
    exit 1
fi
log_ok "Docker Swarm is active"

# ──────────────────────────────────────────────
log_step 2 8 "Checking echonet network..."
if ! docker network ls --format '{{.Name}}' | grep -q "^echonet$"; then
    echo -e "  Creating echonet overlay network..."
    docker network create --driver overlay --attachable echonet
fi
log_ok "echonet network exists"

# ──────────────────────────────────────────────
log_step 3 8 "Checking MariaDB container..."

# Find the MariaDB container (try multiple common names)
DB_CONTAINER=""
for name in "database_mariadb" "mariadb" "mysql" "db"; do
    FOUND=$(docker ps -q -f name="$name" | head -n 1)
    if [ -n "$FOUND" ]; then
        DB_CONTAINER="$FOUND"
        DB_CONTAINER_NAME=$(docker inspect --format '{{.Name}}' "$FOUND" | sed 's/^\///')
        break
    fi
done

if [ -z "$DB_CONTAINER" ]; then
    log_err "No MariaDB/MySQL container found running."
    echo -e "  Make sure your database container is running."
    exit 1
fi
log_ok "Found database container: $DB_CONTAINER_NAME"

# Create database if it doesn't exist
docker exec "$DB_CONTAINER" mysql -u"$DB_USER" -p"$DB_PASS" -e \
    "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || {
    log_warn "Could not create database (may already exist)"
}
log_ok "Database '$DB_NAME' is ready"

# Ensure MariaDB is on the echonet network with the correct alias
echo "  Ensuring database is accessible on echonet as 'mariadb'..."
docker network disconnect echonet "$DB_CONTAINER_NAME" 2>/dev/null || true
docker network connect --alias mariadb echonet "$DB_CONTAINER_NAME" 2>/dev/null || {
    log_warn "Could not connect database to echonet (may already be connected)"
}
log_ok "Database accessible on echonet as 'mariadb'"

# ──────────────────────────────────────────────
log_step 4 8 "Preparing .env file..."
if [ ! -f "$ENV_FILE" ]; then
    if [ -f "$ENV_PRODUCTION_FILE" ]; then
        cp "$ENV_PRODUCTION_FILE" "$ENV_FILE"
        log_ok "Created .env from .env.production"
    else
        log_err "No .env or .env.production file found!"
        exit 1
    fi
fi

# Generate APP_KEY if not set
if ! grep -q "APP_KEY=base64:" "$ENV_FILE"; then
    APP_KEY=$(openssl rand -base64 32)
    sed -i "s|APP_KEY=.*|APP_KEY=base64:$APP_KEY|g" "$ENV_FILE"
    log_ok "APP_KEY generated"
else
    log_ok "APP_KEY already set"
fi

# ──────────────────────────────────────────────
log_step 5 8 "Building Docker image..."
docker build --no-cache -t "$IMAGE_NAME" .
log_ok "Image built successfully"

# ──────────────────────────────────────────────
log_step 6 8 "Deploying stack..."

# Remove old service to force image update (swarm caches local images)
docker stack rm "$STACK_NAME" 2>/dev/null && {
    log_ok "Removed old stack"
    echo "  Waiting for cleanup..."
    sleep 10
} || true

docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"
log_ok "Stack deployed"

# ──────────────────────────────────────────────
log_step 7 8 "Waiting for service to start..."
echo "  This may take up to 90 seconds (migrations + seeders)..."

ATTEMPTS=0
MAX_ATTEMPTS=30
while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
    ATTEMPTS=$((ATTEMPTS + 1))

    # Check if service has running replicas
    REPLICAS=$(docker stack services "$STACK_NAME" --format '{{.Replicas}}' 2>/dev/null | head -n 1)
    if echo "$REPLICAS" | grep -q "1/1"; then
        log_ok "Service is running ($REPLICAS)"
        break
    fi

    echo "  Attempt $ATTEMPTS/$MAX_ATTEMPTS - Status: $REPLICAS"
    sleep 3
done

# ──────────────────────────────────────────────
log_step 8 8 "Verification..."
echo ""
echo -e "${GREEN}Service Status:${NC}"
docker stack services "$STACK_NAME"
echo ""

# Show the last few log lines from the NEW container only
echo -e "${GREEN}Recent logs (last 20 lines):${NC}"
docker service logs "${STACK_NAME}_app" --tail 20 2>/dev/null || true

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "  🌐 URL:    ${YELLOW}https://edu.echo.dev.br${NC}"
echo -e "  📋 Logs:   ${YELLOW}docker service logs ${STACK_NAME}_app -f${NC}"
echo -e "  📊 Status: ${YELLOW}docker stack services ${STACK_NAME}${NC}"
echo -e "  🔄 Tasks:  ${YELLOW}docker service ps ${STACK_NAME}_app${NC}"
echo ""
