<?php

namespace App\Filament\Resources\Tools;

use App\Filament\Resources\Tools\Pages\CreateTool;
use App\Filament\Resources\Tools\Pages\EditTool;
use App\Filament\Resources\Tools\Pages\ListTools;
use App\Filament\Resources\Tools\Schemas\ToolForm;
use App\Filament\Resources\Tools\Tables\ToolsTable;
use App\Models\Tool;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ToolResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Portfolio';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-wrench';

    protected static ?int $navigationSort = 60;

    protected static ?string $model = Tool::class;

    public static function form(Schema $schema): Schema
    {
        return ToolForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ToolsTable::configure($table);
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
            'index' => ListTools::route('/'),
            'create' => CreateTool::route('/create'),
            'edit' => EditTool::route('/{record}/edit'),
        ];
    }
}
