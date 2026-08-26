#!/bin/bash
set -e

echo "Deploying application..."

# Enter maintenance mode
php artisan down || true

# Pull latest code
git pull

# Install dependencies
composer install --no-dev --optimize-autoloader
npm ci

# Build frontend assets
npm run build

# Clear and rebuild caches
php artisan optimize:clear
php artisan deploy:optimize
php artisan view:cache

# Run database migrations
php artisan migrate --force

# Restart queues
php artisan queue:restart

# Exit maintenance mode
php artisan up

echo "Deployment finished!"
