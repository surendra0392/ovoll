<?php

namespace App\Filament\Resources\NavigationMenus;

use App\Filament\Resources\NavigationMenus\Pages\CreateNavigationMenu;
use App\Filament\Resources\NavigationMenus\Pages\EditNavigationMenu;
use App\Filament\Resources\NavigationMenus\Pages\ListNavigationMenus;
use App\Filament\Resources\NavigationMenus\Schemas\NavigationMenuForm;
use App\Filament\Resources\NavigationMenus\Tables\NavigationMenusTable;
use App\Models\NavigationMenu;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class NavigationMenuResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Website';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bars-3';

    protected static ?int $navigationSort = 20;

    protected static ?string $model = NavigationMenu::class;

    public static function form(Schema $schema): Schema
    {
        return NavigationMenuForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NavigationMenusTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListNavigationMenus::route('/'),
            'create' => CreateNavigationMenu::route('/create'),
            'edit' => EditNavigationMenu::route('/{record}/edit'),
        ];
    }
}
