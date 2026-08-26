<?php

namespace App\Filament\Resources\ResourceCategories;

use App\Filament\Resources\ResourceCategories\Pages\CreateResourceCategory;
use App\Filament\Resources\ResourceCategories\Pages\EditResourceCategory;
use App\Filament\Resources\ResourceCategories\Pages\ListResourceCategories;
use App\Filament\Resources\ResourceCategories\Schemas\ResourceCategoryForm;
use App\Filament\Resources\ResourceCategories\Tables\ResourceCategoriesTable;
use App\Models\ResourceCategory;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ResourceCategoryResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Portfolio';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-folder-open';

    protected static ?int $navigationSort = 40;

    protected static ?string $model = ResourceCategory::class;

    public static function form(Schema $schema): Schema
    {
        return ResourceCategoryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ResourceCategoriesTable::configure($table);
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
            'index' => ListResourceCategories::route('/'),
            'create' => CreateResourceCategory::route('/create'),
            'edit' => EditResourceCategory::route('/{record}/edit'),
        ];
    }
}
