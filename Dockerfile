# Stage 1: Build Frontend Assets
FROM php:8.2-alpine as frontend

WORKDIR /app

# Install Node.js, NPM, and Core PHP Extensions required for composer/artisan
RUN apk add --no-cache nodejs npm \
    && docker-php-ext-install bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 1. Install Backend Dependencies (for artisan wayfinder)
COPY composer.json composer.lock ./
# Install deps ignoring platform reqs if needed, though 8.2 should match
RUN composer install --no-dev --no-scripts --prefer-dist --ignore-platform-reqs

# 2. Install Frontend Dependencies
COPY package*.json ./
RUN npm ci

# 3. Build Assets
COPY . .
RUN npm run build

# Stage 2: Production Environment
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    git \
    zip \
    unzip \
    libpng-dev \
    libzip-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    icu-dev \
    oniguruma-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd \
    pdo_mysql \
    bcmath \
    mbstring \
    exif \
    pcntl \
    intl \
    opcache \
    zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy backend dependencies definition
COPY composer.json composer.lock ./

# Install backend dependencies (optimized)
RUN composer install --no-dev --optimize-autoloader --no-scripts --prefer-dist

# Copy application files
COPY . .

# Copy built frontend assets from Stage 1
COPY --from=frontend /app/public/build public/build

# Setup Nginx and Supervisor
COPY .docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY .docker/entrypoint.sh /usr/local/bin/entrypoint.sh

# Permissions
RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

ENTRYPOINT ["entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
