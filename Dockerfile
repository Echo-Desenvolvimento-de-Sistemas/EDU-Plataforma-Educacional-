# Multi-stage build for Laravel application with Nginx and PHP-FPM
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Set Node memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source files
COPY . .

# Build frontend assets
RUN npm run build


# ============================================
# Production PHP Image
# ============================================
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    mysql-client \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    icu-dev \
    libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    soap \
    opcache

# Install Redis extension
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY --chown=www-data:www-data . .

# Copy built frontend assets from frontend-builder
COPY --from=frontend-builder --chown=www-data:www-data /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copy configuration files
COPY .docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY .docker/supervisord.conf /etc/supervisord.conf
COPY .docker/entrypoint.sh /usr/local/bin/entrypoint.sh

# Configure PHP for production
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && echo "opcache.enable=1" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.memory_consumption=256" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.interned_strings_buffer=16" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.max_accelerated_files=10000" >> "$PHP_INI_DIR/conf.d/opcache.ini" \
    && echo "opcache.validate_timestamps=0" >> "$PHP_INI_DIR/conf.d/opcache.ini"

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod +x /usr/local/bin/entrypoint.sh

# Create log directories with correct ownership
RUN mkdir -p /var/log/supervisor /var/log/nginx /var/log/php-fpm \
    && chown -R nobody:nobody /var/log/supervisor \
    && chown -R nginx:nginx /var/log/nginx

# Expose port
EXPOSE 80

# Health check - uses Laravel's built-in /up route
# start-period=120s gives time for migrations + seeders to complete
HEALTHCHECK --interval=30s --timeout=5s --start-period=120s --retries=5 \
    CMD curl -f http://localhost/up || exit 1

# Set entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
