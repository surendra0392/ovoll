<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'company_name',
        'company_size',
        'industry',
        'services',
        'budget_range',
        'timeline',
        'goals_challenges',
        'score',
        'status',
        'assigned_to',
        'tags',
        'notes',
        'estimator_details',
        'attachments',
        'country',
        'preferred_contact_method',
        'source',
        'utm_parameters',
        'ip_address',
        'priority',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'services' => 'array',
        'tags' => 'array',
        'estimator_details' => 'array',
        'attachments' => 'array',
        'score' => 'integer',
        'assigned_to' => 'integer',
        'utm_parameters' => 'array',
    ];

    /**
     * Boot model events to auto-calculate lead score.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::saving(function (Lead $lead) {
            $lead->score = $lead->calculateLeadScore();
        });
    }

    /**
     * Calculate lead score based on metrics.
     */
    public function calculateLeadScore(): int
    {
        $score = 0;

        // 1. Budget scoring (Max: 40 points)
        $budget = strtolower($this->budget_range ?? '');
        if (str_contains($budget, 'under')) {
            $score += 5;
        } elseif (str_contains($budget, '50k') || str_contains($budget, 'enterprise') || str_contains($budget, '50,000')) {
            $score += 40;
        } elseif (str_contains($budget, '25k') || str_contains($budget, '25,000')) {
            $score += 30;
        } elseif (str_contains($budget, '10k') || str_contains($budget, '10,000')) {
            $score += 20;
        } elseif (! empty($budget)) {
            $score += 5;
        }

        // 2. Timeline scoring (Max: 30 points)
        $timeline = strtolower($this->timeline ?? '');
        if (str_contains($timeline, 'immediate') || str_contains($timeline, '1 month')) {
            $score += 30;
        } elseif (str_contains($timeline, 'short') || str_contains($timeline, '3 months')) {
            $score += 20;
        } elseif (! empty($timeline)) {
            $score += 10;
        }

        // 3. Company Size scoring (Max: 20 points)
        $size = strtolower($this->company_size ?? '');
        if (str_contains($size, '1-10')) {
            $score += 5;
        } elseif (str_contains($size, '100') || str_contains($size, 'enterprise') || str_contains($size, 'large')) {
            $score += 20;
        } elseif (str_contains($size, '10') || str_contains($size, 'medium')) {
            $score += 15;
        } elseif (! empty($size)) {
            $score += 5;
        }

        // 4. Goals & challenges detail scoring (Max: 10 points)
        if (! empty($this->goals_challenges) && strlen($this->goals_challenges) > 20) {
            $score += 10;
        }

        return $score;
    }

    /**
     * Relationship to Assignee.
     */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Scope qualified leads.
     */
    public function scopeQualified(Builder $query): Builder
    {
        return $query->where('score', '>=', 50);
    }
}
