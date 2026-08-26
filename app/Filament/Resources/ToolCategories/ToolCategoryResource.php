<?php

namespace App\Filament\Resources\ToolCategories;

use App\Filament\Resources\ToolCategories\Pages\CreateToolCategory;
use App\Filament\Resources\ToolCategories\Pages\EditToolCategory;
use App\Filament\Resources\ToolCategories\Pages\ListToolCategories;
use App\Filament\Resources\ToolCategories\Schemas\ToolCategoryForm;
use App\Filament\Resources\ToolCategories\Tables\ToolCategoriesTable;
use App\Models\ToolCategory;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ToolCategoryResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Portfolio';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-square-3-stack-3d';

    protected static ?int $navigationSort = 70;

    protected static ?string $model = ToolCategory::class;

    public static function form(Schema $schema): Schema
    {
        return ToolCategoryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ToolCategoriesTable::configure($table);
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
            'index' => ListToolCategories::route('/'),
            'create' => CreateToolCategory::route('/create'),
            'edit' => EditToolCategory::route('/{record}/edit'),
        ];
    }
}
