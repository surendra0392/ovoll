<?php

namespace App\Filament\Resources\Services\Tables;

use App\Models\Service;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ServicesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query) => $query->with(['category']))
            ->paginated([10, 25, 50, 100])
            ->columns([
                TextColumn::make('name')
                    ->label('Service')
                    ->description(fn (Service $record): string => $record->slug)
                    ->searchable(['name', 'slug', 'short_description'])
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

                TextColumn::make('technologies_count')
                    ->label('Tech')
                    ->state(fn (Service $record): int => count($record->technologies ?? []))
                    ->badge()
                    ->color('gray')
                    ->alignCenter(),

                TextColumn::make('faqs_count')
                    ->label('FAQs')
                    ->state(fn (Service $record): int => count($record->faqs ?? []))
                    ->badge()
                    ->color('gray')
                    ->alignCenter(),

                ToggleColumn::make('is_featured')
                    ->label('Featured')
                    ->alignCenter(),

                ToggleColumn::make('is_enabled')
                    ->label('Active')
                    ->alignCenter(),

                TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable()
                    ->alignCenter(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                SelectFilter::make('category')
                    ->relationship('category', 'name'),

                Filter::make('is_featured')
                    ->label('Featured Only')
                    ->query(fn (Builder $query) => $query->where('is_featured', true)),

                Filter::make('is_enabled')
                    ->label('Active Only')
                    ->query(fn (Builder $query) => $query->where('is_enabled', true)),
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
