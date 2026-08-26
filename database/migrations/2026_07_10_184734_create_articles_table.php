<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->json('content')->nullable();
            $table->string('cover_image')->nullable();

            $table->foreignId('author_id')->constrained()->cascadeOnDelete();
            $table->foreignId('article_category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('article_series_id')->nullable()->constrained()->nullOnDelete();

            $table->string('status')->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_pinned')->default(false);
            $table->integer('reading_time')->default(0);
            $table->integer('views_count')->default(0);

            $table->json('seo')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
        });

        // Pivot table for tags
        Schema::create('article_article_tag', function (Blueprint $table) {
            $table->foreignId('article_id')->constrained()->cascadeOnDelete();
            $table->foreignId('article_tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['article_id', 'article_tag_id']);
        });

        // Pivot table for related articles (self-referencing)
        Schema::create('article_related', function (Blueprint $table) {
            $table->foreignId('article_id')->constrained('articles')->cascadeOnDelete();
            $table->foreignId('related_article_id')->constrained('articles')->cascadeOnDelete();
            $table->primary(['article_id', 'related_article_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_related');
        Schema::dropIfExists('article_article_tag');
        Schema::dropIfExists('articles');
    }
};
