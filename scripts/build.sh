#!/bin/bash

# 1. Clean up or create the dist directory
echo "🚀 Starting Production Build..."
rm -rf dist
mkdir -p dist/public

# 2. Copy static assets that don't need minification
echo "📂 Copying assets and templates..."
cp -r src/public/data dist/public/
cp -r src/public/views dist/public/
cp src/public/index.html dist/public/
cp src/public/.htaccess dist/public/

# 3. Minify CSS
echo "🎨 Minifying CSS..."
docker run --rm -v $(pwd):/app -w /app node:alpine sh -c \
    "npm install -g clean-css-cli && cleancss -o dist/public/css/style.css src/public/css/style.css"

# 4. Minify JS (Maintaining Module Structure)
echo "⚡ Minifying JavaScript Modules..."
docker run --rm -v $(pwd):/app -w /app node:alpine sh -c \
    "npm install -g terser && \
    find src/public/js -name '*.js' -exec sh -c 'mkdir -p dist/public/js/\$(dirname \"\${1#src/public/js/}\") && terser \"\$1\" -o \"dist/public/js/\${1#src/public/js/}\" --compress --mangle' _ {} \;"

echo "✅ Build Complete! Your production-ready files are in the /dist folder."