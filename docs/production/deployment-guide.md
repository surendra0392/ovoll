# Deployment Guide

This guide details the deployment process and server requirements for the OVOLL application.

## Server Requirements

To run OVOLL in production, your server must meet the following requirements:

*   **PHP:** 8.4 or higher
*   **Database:** MySQL (or compatible)
*   **Cache/Queue:** Redis
*   **Web Server:** Nginx or Apache
*   **Node.js & NPM:** Required for building frontend assets.

## Deployment Process

The deployment process is automated using the `deploy.sh` script located in the root of the project.

### 1. The `deploy.sh` Script

This script performs the following operations in order:

1.  **Maintenance Mode:** Runs `php artisan down` to gracefully stop accepting new requests during deployment.
2.  **Pull Code:** Runs `git pull` to fetch the latest code from the repository.
3.  **Install PHP Dependencies:** Runs `composer install --no-dev --optimize-autoloader` for production-ready packages.
4.  **Install Node Dependencies:** Runs `npm ci` to ensure exactly the dependencies in `package-lock.json` are installed.
5.  **Build Assets:** Runs `npm run build` to compile the Vite frontend assets.
6.  **Clear Caches:** Runs `php artisan optimize:clear` to flush old caches.
7.  **Application Optimization:** Runs `php artisan deploy:optimize` which executes three critical caches in one command:
    *   `php artisan config:cache` — merges all config files into a single cached file, eliminating config file reads on every request.
    *   `php artisan route:cache` — serializes all route registrations for near-instant route matching.
    *   `php artisan event:cache` — caches the event-to-listener mapping so events don't need to scan directories.
8.  **Cache Views:** Runs `php artisan view:cache` to compile all Blade templates.
9.  **Database Migrations:** Runs `php artisan migrate --force` to apply database changes.
10. **Restart Queues:** Runs `php artisan queue:restart` to ensure queue workers pick up the new code.
11. **Live:** Runs `php artisan up` to exit maintenance mode.

### 2. Manual Deployment Steps (If needed)

To deploy manually, you can execute the `deploy.sh` script:

```bash
cd /path/to/project
chmod +x deploy.sh
./deploy.sh
```

## Sentry Integration Basics

OVOLL uses Sentry for error tracking and performance monitoring.

1.  **Installation:** Sentry is installed via the `sentry/sentry-laravel` package.
2.  **Configuration:** The configuration is managed in `.env`.
3.  **Required Variables:**
    *   `SENTRY_LARAVEL_DSN`: Your Sentry project DSN.
    *   `SENTRY_TRACES_SAMPLE_RATE`: (Optional) E.g., `1.0` for performance tracing.
4.  **Usage:** Sentry will automatically capture unhandled exceptions. You can also manually capture errors using the `Sentry` facade.

## Scheduler Configuration

The Laravel scheduler is configured in `routes/console.php`. It handles automated tasks:

*   `backup:clean`: Runs daily to clean old backups.
*   `backup:run`: Runs daily to create new database/file backups.
*   `model:prune`: Runs daily to prune stale database records based on Prunable traits.

**Cron Configuration:**
Ensure the following Cron entry is added to your server to trigger the scheduler every minute:
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
