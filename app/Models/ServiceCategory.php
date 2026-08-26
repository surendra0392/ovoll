<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceCategory extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'name',
        'icon',
        'description',
        'sort_order',
        'is_featured',
        'is_enabled',
        'seo',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort_order' => 'integer',
        'is_featured' => 'boolean',
        'is_enabled' => 'boolean',
        'seo' => 'array',
    ];

    /**
     * Relationship to Services.
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'category_id')->orderBy('sort_order');
    }

    /**
     * Scope active categories.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_enabled', true);
    }
}
