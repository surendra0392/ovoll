<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Tool extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'tool_category_id',
        'name',
        'slug',
        'description',
        'icon',
        'component_name',
        'status',
        'is_featured',
        'is_new',
        'is_pro',
        'usage_count',
        'favorites_count',
        'seo_meta',
        'settings',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_new' => 'boolean',
        'is_pro' => 'boolean',
        'usage_count' => 'integer',
        'favorites_count' => 'integer',
        'seo_meta' => 'array',
        'settings' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ToolCategory::class, 'tool_category_id');
    }

    public function usages(): HasMany
    {
        return $this->hasMany(ToolUsage::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function recordUsage(?string $sessionId = null, ?array $metadata = null): void
    {
        $this->usages()->create([
            'session_id' => $sessionId,
            'metadata' => $metadata,
        ]);

        $this->increment('usage_count');
    }
}
