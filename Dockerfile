FROM serversideup/php:8.2-fpm-nginx

WORKDIR /var/www/html

# 1. Copia os arquivos
COPY . .

# 2. Instala dependências (COM A CORREÇÃO --no-scripts)
# Isso impede que o Laravel tente conectar no banco durante a construção
USER root
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 3. Ajusta permissões
RUN chown -R webuser:webgroup /var/www/html \
    && chmod -R 755 /var/www/html/storage

USER webuser