<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('global_settings', function (Blueprint $table) {
            $table->id();
            $table->json('site_info')->nullable();
            $table->json('contact_info')->nullable();
            $table->json('social_links')->nullable();
            $table->json('analytics_ids')->nullable();
            $table->json('meta_defaults')->nullable();
            $table->json('brand_colors')->nullable();
            $table->json('theme_settings')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('global_settings');
    }
};
