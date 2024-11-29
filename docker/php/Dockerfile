FROM php:8.3-fpm

# Install required PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip libsqlite3-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg

RUN docker-php-ext-install gd pdo pdo_mysql

COPY --chown=www-data:www-data lara-api /var/www/html/

# Expose PHP-FPM port
EXPOSE 9000
CMD ["php-fpm"]
