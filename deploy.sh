#!/bin/bash

# EDU Platform Deployment Script
# This script deploys the EDU application to Docker Swarm

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
STACK_NAME="edu"
IMAGE_NAME="ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"
ENV_PRODUCTION_FILE=".env.production"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}EDU Platform Deployment${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Check if Docker Swarm is initialized
if ! docker info | grep -q "Swarm: active"; then
    echo -e "${RED}Error: Docker Swarm is not initialized${NC}"
    echo -e "${YELLOW}Run: docker swarm init${NC}"
    exit 1
fi

# Check if echonet network exists
if ! docker network ls | grep -q "echonet"; then
    echo -e "${RED}Error: echonet network does not exist${NC}"
    echo -e "${YELLOW}Run: docker network create --driver overlay echonet${NC}"
    exit 1
fi

# Login to GitHub Container Registry
echo -e "${YELLOW}Logging in to GitHub Container Registry...${NC}"
echo -e "${YELLOW}You may need to provide your GitHub Personal Access Token${NC}"
docker login ghcr.io

# Pull the latest image
echo -e "${YELLOW}Pulling latest image...${NC}"
docker pull $IMAGE_NAME

# Create .env file if it doesn't exist
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}Creating .env file from .env.production...${NC}"
    cp $ENV_PRODUCTION_FILE $ENV_FILE
fi

# Generate APP_KEY if not set
if ! grep -q "APP_KEY=base64:" $ENV_FILE; then
    echo -e "${YELLOW}Generating APP_KEY...${NC}"
    # Generate a random base64 key
    APP_KEY=$(openssl rand -base64 32)
    sed -i "s|APP_KEY=|APP_KEY=base64:$APP_KEY|g" $ENV_FILE
    echo -e "${GREEN}APP_KEY generated${NC}"
fi

# Create database if it doesn't exist
echo -e "${YELLOW}Checking database...${NC}"
docker exec $(docker ps -q -f name=database_mariadb) mysql -uroot -pAkio2604* -e "CREATE DATABASE IF NOT EXISTS edu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" || true

# Deploy the stack
echo -e "${YELLOW}Deploying stack...${NC}"
docker stack deploy -c $COMPOSE_FILE --with-registry-auth $STACK_NAME

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 10

# Check service status
echo -e "${GREEN}Service Status:${NC}"
docker stack services $STACK_NAME

# Show recent logs
echo -e "${GREEN}Recent logs:${NC}"
docker service logs ${STACK_NAME}_app --tail 50

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}Access your application at: https://app.colegiorosadesharom.com.br${NC}"
echo -e "${YELLOW}To view logs: docker service logs ${STACK_NAME}_app -f${NC}"
echo -e "${YELLOW}To check status: docker stack services ${STACK_NAME}${NC}"
