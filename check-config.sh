#!/bin/bash

echo "🔍 Checking Penryn Engine Container Health..."

# 1. Check if the container is actually running
if [ ! "$(docker ps -q -f name=penryn_engine_web)" ]; then
    echo "❌ Error: Container 'penryn_engine_web' is not running."
    exit 1
fi

echo "✅ Container is running."

# 2. Check for index.php existence
echo "-----------------------------------"
docker exec penryn_engine_web ls -la /var/www/html/index.php
if [ $? -eq 0 ]; then
    echo "✅ index.php found."
else
    echo "❌ index.php MISSING in /var/www/html/"
fi

# 3. Check if mod_rewrite is actually loaded
echo "-----------------------------------"
if docker exec penryn_engine_web apache2ctl -M | grep -q 'rewrite_module'; then
    echo "✅ Apache mod_rewrite is LOADED."
else
    echo "❌ mod_rewrite is NOT LOADED. Check your Dockerfile."
fi

# 4. Test the .htaccess permission
echo "-----------------------------------"
docker exec penryn_engine_web cat /var/www/html/.htaccess > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ .htaccess is readable by Apache."
else
    echo "❌ .htaccess is NOT READABLE (Check permissions)."
fi

echo "-----------------------------------"
echo "Health Check Complete."