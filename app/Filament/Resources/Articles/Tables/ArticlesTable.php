<?php

namespace App\Filament\Resources\Articles\Tables;

use App\Models\Article;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ArticlesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query) => $query->with(['author', 'category', 'series']))
            ->defaultSort('published_at', 'desc')
            ->paginated([10, 25, 50, 100])
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('')
                    ->circular()
                    ->defaultImageUrl(asset('images/logo-icon.png')),

                TextColumn::make('title')
                    ->label('Article')
                    ->description(fn (Article $record): string => $record->slug)
                    ->searchable(['title', 'slug', 'excerpt'])
                    ->wrap()
                    ->weight('medium')
                    ->grow(),

                TextColumn::make('category.name')
                    ->label('Category')
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->sortable()
                    ->placeholder('Uncategorized'),

                TextColumn::make('author.name')
                    ->label('Author')
                    ->icon('heroicon-m-user')
                    ->searchable()
                    ->sortable()
                    ->placeholder('No author'),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'warning',
                        'archived' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->sortable(),

                ToggleColumn::make('is_featured')
                    ->label('Featured')
                    ->alignCenter(),

                ToggleColumn::make('is_pinned')
                    ->label('Pinned')
                    ->alignCenter(),

                TextColumn::make('reading_time')
                    ->label('Read')
                    ->formatStateUsing(fn ($state) => "{$state} min")
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),

                TextColumn::make('views_count')
                    ->label('Views')
                    ->numeric()
                    ->badge()
                    ->color('gray')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('published_at')
                    ->label('Published')
                    ->date('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),

                SelectFilter::make('category')
                    ->relationship('category', 'name'),

                SelectFilter::make('author')
                    ->relationship('author', 'name'),

                Filter::make('is_featured')
                    ->label('Featured Only')
                    ->query(fn (Builder $query) => $query->where('is_featured', true)),

                Filter::make('is_pinned')
                    ->label('Pinned Only')
                    ->query(fn (Builder $query) => $query->where('is_pinned', true)),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
