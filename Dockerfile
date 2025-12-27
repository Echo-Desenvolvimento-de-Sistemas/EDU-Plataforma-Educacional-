# Stage 1: Build Frontend Assets
FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Image
FROM serversideup/php:8.2-fpm-nginx

WORKDIR /var/www/html

# Copy backend files
COPY . .

# Copy built frontend assets from Stage 1
COPY --from=frontend /app/public /var/www/html/public

# Switch to root to install dependencies and fix permissions
USER root

# Install Composer dependencies (Production)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Fix permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Switch back to www-data
USER www-data