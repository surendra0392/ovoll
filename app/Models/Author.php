<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Author extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'bio',
        'role',
        'expertise',
        'avatar',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
        'expertise' => 'array',
    ];

    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
