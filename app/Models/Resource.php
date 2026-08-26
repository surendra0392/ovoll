<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Resource extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'type',
        'excerpt',
        'content',
        'author_id',
        'resource_category_id',
        'cover_image',
        'download_file',
        'reading_time',
        'downloads_count',
        'views_count',
        'status',
        'published_at',
        'seo',
        'settings',
    ];

    protected $casts = [
        'content' => 'array',
        'seo' => 'array',
        'settings' => 'array',
        'published_at' => 'datetime',
        'reading_time' => 'integer',
        'downloads_count' => 'integer',
        'views_count' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saving(function (Resource $resource) {
            // Auto-calculate reading time if it's an article or guide
            if (in_array($resource->type, ['article', 'guide']) && $resource->content) {
                // Approximate word count from JSON content strings
                $contentStr = is_array($resource->content) ? json_encode($resource->content) : $resource->content;
                // Strip JSON artifacts roughly to get words
                $cleanStr = strip_tags(str_replace(['"', '{', '}', '[', ']', ':', ',', '\\n'], ' ', $contentStr));
                $wordCount = str_word_count($cleanStr);
                // Average reading speed 200 wpm
                $resource->reading_time = max(1, ceil($wordCount / 200));
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ResourceCategory::class, 'resource_category_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(ResourceTag::class, 'resource_resource_tag');
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

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}
