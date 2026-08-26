<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Sentry DSN
    |--------------------------------------------------------------------------
    |
    | The Sentry DSN (Data Source Name) identifies your project. Set this in
    | your .env file as SENTRY_LARAVEL_DSN.
    |
    */

    'dsn' => env('SENTRY_LARAVEL_DSN'),

    /*
    |--------------------------------------------------------------------------
    | Performance Tracing
    |--------------------------------------------------------------------------
    |
    | The `traces_sample_rate` determines the percentage of requests that will
    | have performance tracing data sent to Sentry. Set to 1.0 (100%) for
    | production to capture all transactions. Use a lower rate for high-traffic
    | apps (e.g., 0.25 for 25%).
    |
    | `profiles_sample_rate` determines the percentage of traced requests that
    | will include profiling data (CPU profiling).
    |
    */

    'traces_sample_rate' => (float) env('SENTRY_TRACES_SAMPLE_RATE', 1.0),

    'profiles_sample_rate' => (float) env('SENTRY_PROFILES_SAMPLE_RATE', 0.25),

    /*
    |--------------------------------------------------------------------------
    | Send Default PII
    |--------------------------------------------------------------------------
    |
    | When true, Sentry will send personally identifiable information (user IP,
    | user agent, etc.) with events. Keep false unless you need user-level
    | error attribution.
    |
    */

    'send_default_pii' => env('SENTRY_SEND_DEFAULT_PII', false),

    /*
    |--------------------------------------------------------------------------
    | Release
    |--------------------------------------------------------------------------
    |
    | The release version identifier. Defaults to the app version from config.
    | You can override with SENTRY_RELEASE in .env or set via CI/CD.
    |
    */

    'release' => env('SENTRY_RELEASE', env('APP_VERSION', '1.0.0')),

    /*
    |--------------------------------------------------------------------------
    | Environment
    |--------------------------------------------------------------------------
    |
    | The environment name sent with events. Defaults to APP_ENV.
    |
    */

    'environment' => env('SENTRY_ENVIRONMENT', env('APP_ENV', 'production')),

    /*
    |--------------------------------------------------------------------------
    | Breadcrumbs
    |--------------------------------------------------------------------------
    |
    | By default, Sentry automatically captures breadcrumbs for SQL queries,
    | HTTP requests, and cache operations. You can disable these below.
    |
    */

    'breadcrumbs' => [
        'sql_queries' => true,
        'sql_bindings' => true,
        'queue_info' => true,
        'command_info' => true,
        'http_client_requests' => true,
        'cache' => true,
        'logs' => true,
    ],

];
