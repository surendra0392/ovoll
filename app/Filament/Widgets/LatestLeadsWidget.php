<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class LatestLeadsWidget extends TableWidget
{
    protected static ?int $sort = 4;

    protected int|string|array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected static ?string $heading = 'Recent Leads & Inquiries';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Lead::query()
                    ->with('assignee')
                    ->latest()
                    ->limit(10)
            )
            ->columns([
                TextColumn::make('name')
                    ->label('Contact')
                    ->state(fn (Lead $record) => trim(($record->first_name ?? '').' '.($record->last_name ?? '')))
                    ->description(fn (Lead $record): ?string => $record->company_name)
                    ->searchable(['first_name', 'last_name', 'company_name'])
                    ->weight('medium'),

                TextColumn::make('score')
                    ->label('Score')
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state >= 70 => 'success',
                        $state >= 40 => 'warning',
                        default => 'danger',
                    })
                    ->alignCenter(),

                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'gray',
                        'qualified' => 'info',
                        'proposal' => 'warning',
                        'closed_won' => 'success',
                        'closed_lost' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label('Time')
                    ->since()
                    ->alignEnd()
                    ->sortable(),
            ])
            ->paginated(false);
    }
}
