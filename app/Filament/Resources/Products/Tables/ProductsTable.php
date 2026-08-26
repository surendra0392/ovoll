<?php

namespace App\Filament\Resources\Products\Tables;

use App\Models\Product;
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

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->paginated([10, 25, 50, 100])
            ->columns([
                ImageColumn::make('thumbnail')
                    ->label('')
                    ->circular()
                    ->defaultImageUrl(asset('images/logo-icon.png')),

                TextColumn::make('name')
                    ->label('Product')
                    ->description(fn (Product $record): string => $record->slug)
                    ->searchable(['name', 'slug', 'description'])
                    ->wrap()
                    ->weight('medium')
                    ->grow(),

                TextColumn::make('category')
                    ->label('Category')
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('price')
                    ->label('Price')
                    ->badge()
                    ->color('success')
                    ->formatStateUsing(fn ($state): string => is_numeric($state) ? '$'.number_format((float) $state, 2) : (string) $state)
                    ->searchable()
                    ->sortable(),

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

                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
                SelectFilter::make('category')
                    ->options([
                        'ui-kit' => 'UI Kit',
                        'template' => 'Template',
                        'boilerplate' => 'Boilerplate',
                        'design-system' => 'Design System',
                    ]),
                Filter::make('is_featured')
                    ->label('Featured Only')
                    ->query(fn (Builder $query) => $query->where('is_featured', true)),
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
