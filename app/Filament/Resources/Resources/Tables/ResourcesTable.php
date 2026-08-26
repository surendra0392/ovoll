<?php

namespace App\Filament\Resources\Resources\Tables;

use App\Models\Resource;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ResourcesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query) => $query->with(['author', 'category']))
            ->defaultSort('published_at', 'desc')
            ->paginated([10, 25, 50, 100])
            ->columns([
                ImageColumn::make('cover_image')
                    ->label('')
                    ->circular()
                    ->defaultImageUrl(asset('images/logo-icon.png')),

                TextColumn::make('title')
                    ->label('Resource')
                    ->description(fn (Resource $record): string => $record->slug)
                    ->searchable(['title', 'slug', 'excerpt'])
                    ->wrap()
                    ->weight('medium')
                    ->grow(),

                TextColumn::make('type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'guide' => 'primary',
                        'article' => 'info',
                        'checklist' => 'success',
                        'download' => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->sortable(),

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

                TextColumn::make('reading_time')
                    ->label('Read')
                    ->formatStateUsing(fn ($state) => $state ? "{$state} min" : '—')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),

                TextColumn::make('published_at')
                    ->label('Published')
                    ->date('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->options([
                        'article' => 'Article',
                        'guide' => 'Guide',
                        'checklist' => 'Checklist',
                        'download' => 'Download',
                    ]),
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
                SelectFilter::make('resource_category_id')
                    ->relationship('category', 'name')
                    ->label('Category'),
                SelectFilter::make('author')
                    ->relationship('author', 'name'),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
