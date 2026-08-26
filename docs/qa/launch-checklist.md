# Launch Readiness Checklist

## Security & Environment
- [ ] `.env` production variables populated (DB, Redis, Sentry, SMTP).
- [ ] `APP_DEBUG=false` and `APP_ENV=production`.
- [ ] CSP and Security Headers active.
- [ ] Roles Seeded (`Administrator`, `Editor`, etc).

## Performance & Optimization
- [ ] `php artisan optimize`
- [ ] `php artisan config:cache`
- [ ] `php artisan route:cache`
- [ ] `php artisan view:cache`
- [ ] `npm run build` completed successfully.

## QA & Content
- [ ] Placeholder text replaced.
- [ ] Filament CMS tested.
- [ ] Final Walkthrough approved.
