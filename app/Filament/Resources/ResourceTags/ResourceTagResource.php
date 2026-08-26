<?php

namespace App\Filament\Resources\ResourceTags;

use App\Filament\Resources\ResourceTags\Pages\CreateResourceTag;
use App\Filament\Resources\ResourceTags\Pages\EditResourceTag;
use App\Filament\Resources\ResourceTags\Pages\ListResourceTags;
use App\Filament\Resources\ResourceTags\Schemas\ResourceTagForm;
use App\Filament\Resources\ResourceTags\Tables\ResourceTagsTable;
use App\Models\ResourceTag;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ResourceTagResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Portfolio';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-hashtag';

    protected static ?int $navigationSort = 50;

    protected static ?string $model = ResourceTag::class;

    public static function form(Schema $schema): Schema
    {
        return ResourceTagForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ResourceTagsTable::configure($table);
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
            'index' => ListResourceTags::route('/'),
            'create' => CreateResourceTag::route('/create'),
            'edit' => EditResourceTag::route('/{record}/edit'),
        ];
    }
}
