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
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('type')->default('article'); // article, guide, checklist, download
            $table->text('excerpt')->nullable();
            $table->json('content')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('authors')->nullOnDelete();
            $table->foreignId('resource_category_id')->nullable()->constrained('resource_categories')->nullOnDelete();
            $table->string('cover_image')->nullable();
            $table->string('download_file')->nullable();
            $table->integer('reading_time')->default(0);
            $table->integer('downloads_count')->default(0);
            $table->integer('views_count')->default(0);
            $table->string('status')->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->json('seo')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
