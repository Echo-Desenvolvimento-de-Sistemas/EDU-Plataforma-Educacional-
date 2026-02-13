#!/bin/bash

# Script para buildar a imagem Docker localmente no VPS
# Uso: ./build-local.sh

set -e

echo "========================================"
echo "Building Docker Image Locally on VPS"
echo "========================================"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}Error: Dockerfile not found. Run this script from the project root.${NC}"
    exit 1
fi

# Nome da imagem
IMAGE_NAME="ghcr.io/echo-desenvolvimento-de-sistemas/edu-plataforma-educacional:latest"

echo "Building image: $IMAGE_NAME"
echo ""

# Build da imagem
docker build -t "$IMAGE_NAME" . || {
    echo -e "${RED}Build failed!${NC}"
    exit 1
}

echo ""
echo -e "${GREEN}✓ Build completed successfully!${NC}"
echo ""

# Perguntar se deseja fazer push
read -p "Do you want to push the image to GHCR? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Pushing image to GHCR..."
    docker push "$IMAGE_NAME" || {
        echo -e "${RED}Push failed!${NC}"
        exit 1
    }
    echo -e "${GREEN}✓ Image pushed successfully!${NC}"
    echo ""
    echo "You can now run ./deploy.sh to deploy the new image"
else
    echo "Skipping push. Image is available locally."
    echo "To deploy locally built image, modify deploy.sh to skip the pull step."
fi

echo ""
echo "========================================"
echo "Done!"
echo "========================================"
