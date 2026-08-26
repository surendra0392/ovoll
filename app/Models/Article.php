<?php

namespace App\Models;

use App\Traits\HasSeoMeta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Article extends Model implements HasMedia
{
    use HasSeoMeta, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image',
        'author_id',
        'article_category_id',
        'article_series_id',
        'status',
        'published_at',
        'is_featured',
        'is_pinned',
        'reading_time',
        'views_count',
        'seo',
        'settings',
    ];

    protected $casts = [
        'content' => 'array',
        'seo' => 'array',
        'settings' => 'array',
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'is_pinned' => 'boolean',
        'reading_time' => 'integer',
        'views_count' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saving(function (Article $article) {
            if ($article->content) {
                // Calculate reading time for block content
                $contentStr = is_array($article->content) ? json_encode($article->content) : $article->content;
                $cleanStr = strip_tags(str_replace(['"', '{', '}', '[', ']', ':', ',', '\\n'], ' ', $contentStr));
                $wordCount = str_word_count($cleanStr);
                $article->reading_time = max(1, ceil($wordCount / 200));
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ArticleCategory::class, 'article_category_id');
    }

    public function series(): BelongsTo
    {
        return $this->belongsTo(ArticleSeries::class, 'article_series_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(ArticleTag::class, 'article_article_tag');
    }

    public function relatedArticles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_related', 'article_id', 'related_article_id');
    }

    public function scopePublished(Builder $query): Builder
    {
        $now = now();

        return $query->where('status', 'published')
            ->where(function (Builder $q) use ($now) {
                $q->whereNull('published_at')
                    ->orWhere('published_at', '<=', $now);
            });
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->withResponsiveImages();

        $this->addMediaConversion('avif')
            ->format('avif')
            ->withResponsiveImages();
    }
}
