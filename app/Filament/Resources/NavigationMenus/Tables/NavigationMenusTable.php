<?php

namespace App\Filament\Resources\NavigationMenus\Tables;

use App\Models\NavigationMenu;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class NavigationMenusTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Menu Name')
                    ->searchable()
                    ->sortable()
                    ->weight('medium'),
                TextColumn::make('handle')
                    ->label('Location Handle')
                    ->searchable()
                    ->badge()
                    ->color('gray')
                    ->sortable(),
                TextColumn::make('items_count')
                    ->label('Links')
                    ->state(fn (NavigationMenu $record): int => count($record->items ?? []))
                    ->badge()
                    ->color('info')
                    ->alignCenter(),
                ToggleColumn::make('is_active')
                    ->label('Active')
                    ->alignCenter(),
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
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
