# Use the official PHP 8.2 Apache image as the foundation
FROM php:8.2-apache

# 1. Enable Apache Modules
# rewrite: Essential for Barba.js to handle clean URLs (e.g., /about)
# headers: Allows us to set custom CORS and Cache-Control headers
RUN a2enmod rewrite headers

# 2. Set the working directory inside the container
WORKDIR /var/www/html

# 3. Copy the source code to the container
# This copies everything from your local src/public folder to Apache's root
COPY src/public/ /var/www/html/

# 4. Set Permissions
# Ensures the webserver can read the files, specifically for JS modules and JSON data
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# 5. Configure Apache for Single Page Application (SPA)
# This overrides the default configuration to allow .htaccess files to work
RUN echo '<Directory "/var/www/html">' > /etc/apache2/conf-available/penryn-engine.conf \
    && echo '    Options Indexes FollowSymLinks' >> /etc/apache2/conf-available/penryn-engine.conf \
    && echo '    AllowOverride All' >> /etc/apache2/conf-available/penryn-engine.conf \
    && echo '    Require all granted' >> /etc/apache2/conf-available/penryn-engine.conf \
    && echo '    # Ensure .json and .js files are served with correct MIME types' >> /etc/apache2/conf-available/penryn-engine.conf \
    && echo '    AddType application/javascript .js' >> /etc/apache2/conf-available/penryn-engine.conf \
    && echo '    AddType application/json .json' >> /etc/apache2/conf-available/penryn-engine.conf \
    && echo '</Directory>' >> /etc/apache2/conf-available/penryn-engine.conf \
    && a2enconf penryn-engine

# 6. Expose Port 80
EXPOSE 80

# 7. Start Apache in the foreground
CMD ["apache2-foreground"]