<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

#[Signature('deploy:optimize')]
#[Description('Cache config, routes, and events for production deployment.')]
class DeployOptimize extends Command
{
    /**
     * Execute the console command.
     *
     * This command bundles the essential Laravel cache operations needed
     * before a production deployment. Running these caches significantly
     * improves response times by eliminating the need to parse and
     * compile config files, route registrations, and event listeners
     * on every request.
     */
    public function handle(): void
    {
        $this->components->task('Caching configuration', function (): bool {
            return Artisan::call('config:cache') === 0;
        });

        $this->components->task('Caching routes', function (): bool {
            return Artisan::call('route:cache') === 0;
        });

        $this->components->task('Caching events', function (): bool {
            return Artisan::call('event:cache') === 0;
        });

        $this->components->success('Application has been optimized for production.');
    }
}
