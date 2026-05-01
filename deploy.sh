#!/bin/bash

# ============================================================
# EDU Platform - Production Deploy Script
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

STACK_NAME="edu_demo"
IMAGE_NAME="edu-plataforma-educacional:latest"
COMPOSE_FILE="docker-compose.yml"
DB_NAME="edu"
DB_USER="root"
DB_PASS="Akio2604*"

log_step() { echo -e "\n${BLUE}[$1/$2]${NC} $3"; }
log_ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
log_warn() { echo -e "  ${YELLOW}⚠${NC} $1"; }
log_err()  { echo -e "  ${RED}✗${NC} $1"; }

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  EDU Platform - Production Deploy v2.0${NC}"
echo -e "${GREEN}============================================${NC}"

# ──── Step 1: Docker checks ────
log_step 1 8 "Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    log_err "Docker is not running"; exit 1
fi
log_ok "Docker is running"

if ! docker info 2>/dev/null | grep -q "Swarm: active"; then
    log_err "Docker Swarm not initialized. Run: docker swarm init"
    exit 1
fi
log_ok "Docker Swarm is active"

# ──── Step 2: Network ────
log_step 2 8 "Ensuring echonet network..."
if ! docker network ls --format '{{.Name}}' | grep -q "^echonet$"; then
    docker network create --driver overlay --attachable echonet
    log_ok "Created echonet network (attachable)"
else
    # Ensure existing network is attachable by recreating if needed
    ATTACHABLE=$(docker network inspect echonet --format '{{.Attachable}}' 2>/dev/null || echo "false")
    if [ "$ATTACHABLE" != "true" ]; then
        log_warn "echonet exists but is NOT attachable. Standalone containers can't connect."
        log_warn "If MariaDB is a standalone container, you may need to recreate the network."
    fi
    log_ok "echonet network exists"
fi

# ──── Step 3: Database container ────
log_step 3 8 "Finding MariaDB container..."
DB_CONTAINER=""
DB_CONTAINER_NAME=""
for pattern in "mariadb" "database" "mysql" "db"; do
    FOUND=$(docker ps --format '{{.ID}} {{.Names}}' | grep -i "$pattern" | head -n 1)
    if [ -n "$FOUND" ]; then
        DB_CONTAINER=$(echo "$FOUND" | awk '{print $1}')
        DB_CONTAINER_NAME=$(echo "$FOUND" | awk '{print $2}')
        break
    fi
done

if [ -z "$DB_CONTAINER" ]; then
    log_err "No MariaDB/MySQL container found!"
    echo -e "  ${YELLOW}The app will start but won't connect to DB until one is available.${NC}"
else
    log_ok "Found: $DB_CONTAINER_NAME ($DB_CONTAINER)"

    # Create database
    docker exec "$DB_CONTAINER" mysql -u"$DB_USER" -p"$DB_PASS" \
        -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null && \
        log_ok "Database '$DB_NAME' ready" || \
        log_warn "Could not create database (may already exist)"

    # Connect to echonet with alias 'mariadb'
    echo "  Connecting DB to echonet with alias 'mariadb'..."
    docker network disconnect echonet "$DB_CONTAINER_NAME" 2>/dev/null || true
    docker network connect --alias mariadb echonet "$DB_CONTAINER_NAME" 2>/dev/null && \
        log_ok "DB connected to echonet as 'mariadb'" || \
        log_warn "Could not connect DB to echonet (network may not be attachable)"

    # Verify connectivity
    echo "  Verifying DNS resolution..."
    docker run --rm --network echonet alpine sh -c "nslookup mariadb 2>/dev/null && echo 'DNS_OK' || echo 'DNS_FAIL'" 2>/dev/null | grep -q "DNS_OK" && \
        log_ok "DNS resolution for 'mariadb' works!" || \
        log_warn "DNS resolution failed - DB might not be reachable as 'mariadb'"
fi

# ──── Step 4: Environment file ────
log_step 4 8 "Preparing .env..."
if [ ! -f ".env" ]; then
    if [ -f ".env.production" ]; then
        cp .env.production .env
        log_ok "Created .env from .env.production"
    else
        log_err "No .env or .env.production found!"
        exit 1
    fi
fi

if ! grep -q "APP_KEY=base64:" .env; then
    APP_KEY=$(openssl rand -base64 32)
    sed -i "s|APP_KEY=.*|APP_KEY=base64:$APP_KEY|g" .env
    log_ok "APP_KEY generated"
else
    log_ok "APP_KEY already set"
fi

# ──── Step 5: Build ────
log_step 5 8 "Building Docker image (this takes ~4 min)..."
docker build --no-cache -t "$IMAGE_NAME" .
log_ok "Image built"

# ──── Step 6: Clean deploy ────
log_step 6 8 "Deploying (clean restart)..."
docker stack rm "$STACK_NAME" 2>/dev/null && {
    log_ok "Removed old stack"
    echo "  Waiting for cleanup..."
    sleep 15
} || log_ok "No previous stack to remove"

docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"
log_ok "Stack deployed"

# ──── Step 7: Wait for service ────
log_step 7 8 "Waiting for service..."
echo "  Container will start in ~30-60 seconds..."
for i in $(seq 1 20); do
    REPLICAS=$(docker stack services "$STACK_NAME" --format '{{.Name}} {{.Replicas}}' 2>/dev/null | grep app | awk '{print $2}')
    if [ "$REPLICAS" = "1/1" ]; then
        log_ok "Service is running!"
        break
    fi
    echo "  [$i/20] Status: $REPLICAS"
    sleep 5
done

# ──── Step 8: Final status ────
log_step 8 8 "Final status..."
echo ""
docker stack services "$STACK_NAME"
echo ""
echo -e "${GREEN}Recent container logs:${NC}"
docker service logs "${STACK_NAME}_app" --tail 30 --no-task-ids 2>/dev/null || true

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Deploy Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "  🌐  ${YELLOW}https://edu.echo.dev.br${NC}"
echo -e "  📋  docker service logs ${STACK_NAME}_app -f"
echo -e "  📊  docker stack services ${STACK_NAME}"
echo ""
