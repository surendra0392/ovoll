<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ToolCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'description',
        'color',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function tools(): HasMany
    {
        return $this->hasMany(Tool::class);
    }

    public function publishedTools(): HasMany
    {
        return $this->hasMany(Tool::class)->where('status', 'published');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
