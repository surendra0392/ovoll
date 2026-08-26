<?php

namespace App\Models;

use App\Support\SiteData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GlobalSetting extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::saved(fn () => SiteData::flush());
        static::deleted(fn () => SiteData::flush());
    }

    protected $fillable = [
        'site_info',
        'contact_info',
        'social_links',
        'analytics_ids',
        'meta_defaults',
        'brand_colors',
        'theme_settings',
    ];

    protected function casts(): array
    {
        return [
            'site_info' => 'json',
            'contact_info' => 'json',
            'social_links' => 'json',
            'analytics_ids' => 'json',
            'meta_defaults' => 'json',
            'brand_colors' => 'json',
            'theme_settings' => 'json',
        ];
    }
}
