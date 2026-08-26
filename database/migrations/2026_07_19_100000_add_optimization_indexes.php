<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add missing database indexes for common query patterns.
     *
     * Reasons for chosen index structure:
     *
     * - Composite (status, published_at) is the most common article/resource query:
     *   "show me published items ordered by date" — covers both WHERE and ORDER BY.
     *
     * - Composite (is_enabled, sort_order) covers CMS section queries:
     *   "show enabled items in order" — one index instead of two.
     *
     * - Composite (type, status) covers resource type filters.
     *
     * - Standalone boolean indexes (is_featured, is_new, is_pro, is_pinned)
     *   are intentionally NOT added — MySQL ignores single-column indexes
     *   with only 2 distinct values (0% selectivity).
     *
     * - Email on leads has high selectivity (unique per row) — useful for
     *   deduplication lookups and Filament search.
     */
    public function up(): void
    {
        // Services — filtered by status/enabled, ordered by position
        Schema::table('services', function (Blueprint $table) {
            $table->index('status');
            $table->index(['is_enabled', 'sort_order']);
        });

        Schema::table('service_categories', function (Blueprint $table) {
            $table->index(['is_enabled', 'sort_order']);
        });

        // Knowledge Hub resources — filtered by type/status, ordered by date
        Schema::table('resources', function (Blueprint $table) {
            $table->index(['type', 'status']);
            $table->index(['status', 'published_at']);
        });

        Schema::table('resource_categories', function (Blueprint $table) {
            $table->index(['is_enabled', 'sort_order']);
        });

        // Articles / Insights — filtered by status, ordered by publish date
        Schema::table('articles', function (Blueprint $table) {
            $table->index(['status', 'published_at']);
        });

        // Lead management — deduplication, pipeline filtering, sorting
        Schema::table('leads', function (Blueprint $table) {
            $table->index('email');
            $table->index(['status', 'created_at']);
            $table->index(['assigned_to', 'status']);
            $table->index('priority');
        });

        // Sectioned CMS content — filtered by type, ordered by position
        Schema::table('homepage_sections', function (Blueprint $table) {
            $table->index('type');
            $table->index(['is_enabled', 'sort_order']);
            $table->index('scheduled_at');
        });

        Schema::table('about_sections', function (Blueprint $table) {
            $table->index('type');
            $table->index(['is_enabled', 'sort_order']);
        });

        // Tool catalog — filtered by status, combined with featured flag
        Schema::table('tools', function (Blueprint $table) {
            $table->index('status');
            $table->index(['status', 'is_featured']);
        });

        Schema::table('tool_categories', function (Blueprint $table) {
            $table->index(['is_active', 'sort_order']);
        });
    }

    /**
     * Reverse the migration — remove all added indexes.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['is_enabled', 'sort_order']);
        });

        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropIndex(['is_enabled', 'sort_order']);
        });

        Schema::table('resources', function (Blueprint $table) {
            $table->dropIndex(['type', 'status']);
            $table->dropIndex(['status', 'published_at']);
        });

        Schema::table('resource_categories', function (Blueprint $table) {
            $table->dropIndex(['is_enabled', 'sort_order']);
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropIndex(['status', 'published_at']);
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->dropIndex(['email']);
            $table->dropIndex(['status', 'created_at']);
            $table->dropIndex(['assigned_to', 'status']);
            $table->dropIndex(['priority']);
        });

        Schema::table('homepage_sections', function (Blueprint $table) {
            $table->dropIndex(['type']);
            $table->dropIndex(['is_enabled', 'sort_order']);
            $table->dropIndex(['scheduled_at']);
        });

        Schema::table('about_sections', function (Blueprint $table) {
            $table->dropIndex(['type']);
            $table->dropIndex(['is_enabled', 'sort_order']);
        });

        Schema::table('tools', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['status', 'is_featured']);
        });

        Schema::table('tool_categories', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'sort_order']);
        });
    }
};
