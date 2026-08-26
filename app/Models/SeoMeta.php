<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $fillable = [
        'title',
        'description',
        'keywords',
        'og_image',
    ];

    public function seo_metaable()
    {
        return $this->morphTo();
    }
}
