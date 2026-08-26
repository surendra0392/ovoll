<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsletterSubscriber extends Model
{
    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'status',
        'preferences',
        'token',
        'verified_at',
    ];

    protected $casts = [
        'preferences' => 'array',
        'verified_at' => 'datetime',
    ];
}
