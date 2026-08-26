<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ToolUsage extends Model
{
    protected $fillable = [
        'tool_id',
        'session_id',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }
}
