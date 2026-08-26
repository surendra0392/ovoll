<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArticleSeries extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'cover_image',
    ];

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
