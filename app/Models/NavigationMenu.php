<?php

namespace App\Models;

use App\Support\SiteData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavigationMenu extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::saved(fn () => SiteData::flush());
        static::deleted(fn () => SiteData::flush());
    }

    protected $fillable = [
        'name',
        'handle',
        'items',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'items' => 'json',
            'is_active' => 'boolean',
        ];
    }
}
