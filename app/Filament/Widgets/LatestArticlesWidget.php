<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class LatestArticlesWidget extends TableWidget
{
    protected static ?int $sort = 5;

    protected static ?string $heading = 'Recent Articles & Insights';

    protected int|string|array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => Article::query()->with(['author', 'category'])->latest('published_at')->limit(6))
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('')
                    ->circular()
                    ->defaultImageUrl(asset('images/logo-icon.png')),

                TextColumn::make('title')
                    ->label('Article')
                    ->description(fn (Article $record): string => $record->category?->name ?? 'Insight')
                    ->limit(32)
                    ->weight('medium')
                    ->grow(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('published_at')
                    ->label('Date')
                    ->date('M j')
                    ->alignEnd()
                    ->sortable(),
            ])
            ->paginated(false);
    }
}
