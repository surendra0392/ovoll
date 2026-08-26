<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArticleCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'cover_image',
        'seo',
    ];

    protected $casts = [
        'seo' => 'array',
    ];

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
