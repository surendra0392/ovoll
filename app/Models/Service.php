<?php

namespace App\Models;

use App\Traits\HasSeoMeta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Service extends Model implements HasMedia
{
    use HasSeoMeta, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'category_id',
        'slug',
        'name',
        'description',
        'is_featured',
        'is_enabled',
        'sort_order',
        'overview_content',
        'problem_solution',
        'deliverables',
        'process_timeline',
        'technologies',
        'pricing_comparison',
        'faqs',
        'seo',
        'status',
        'settings',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'category_id' => 'integer',
        'is_featured' => 'boolean',
        'is_enabled' => 'boolean',
        'sort_order' => 'integer',
        'overview_content' => 'array',
        'problem_solution' => 'array',
        'deliverables' => 'array',
        'process_timeline' => 'array',
        'technologies' => 'array',
        'pricing_comparison' => 'array',
        'faqs' => 'array',
        'seo' => 'array',
        'settings' => 'array',
    ];

    /**
     * Relationship to Category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }

    /**
     * Scope active services.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_enabled', true);
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
