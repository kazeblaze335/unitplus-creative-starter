<<<<<<< HEAD
FROM php:8.3.12-apache
=======
# Use the official PHP Apache image
FROM php:8.2-apache

# 1. Install any needed PHP extensions (common for MVC/MySQL apps)
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

# 2. Define the internal path (matching your docker-compose.yml)
ENV APACHE_DOCUMENT_ROOT /var/www/html/src
>>>>>>> 290dbcb (second commit - docker)

# 3. Update Apache config to point to the /src folder
# This replaces all instances of /var/www/html with /var/www/html/src
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. Enable Apache Rewrite Module (Essential for MVC routing)
RUN a2enmod rewrite

<<<<<<< HEAD
# Point Apache to the specific subfolder
ENV APACHE_DOCUMENT_ROOT /var/www/html/src/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Ensure .htaccess overrides are allowed in the NEW directory
RUN { \
    echo '<Directory /var/www/html/src/public/>'; \
    echo '    Options -Indexes +FollowSymLinks'; \
    echo '    AllowOverride All'; \
    echo '    Require all granted'; \
    echo '</Directory>'; \
} >> /etc/apache2/apache2.conf

=======
# 5. Set the working directory
WORKDIR /var/www/html

# 6. Set permissions so the webserver can read your files
>>>>>>> 290dbcb (second commit - docker)
RUN chown -R www-data:www-data /var/www/html