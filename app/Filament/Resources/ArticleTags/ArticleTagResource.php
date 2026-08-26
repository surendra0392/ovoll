<?php

namespace App\Filament\Resources\ArticleTags;

use App\Filament\Resources\ArticleTags\Pages\CreateArticleTag;
use App\Filament\Resources\ArticleTags\Pages\EditArticleTag;
use App\Filament\Resources\ArticleTags\Pages\ListArticleTags;
use App\Filament\Resources\ArticleTags\Schemas\ArticleTagForm;
use App\Filament\Resources\ArticleTags\Tables\ArticleTagsTable;
use App\Models\ArticleTag;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ArticleTagResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Content';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-hashtag';

    protected static ?int $navigationSort = 50;

    protected static ?string $model = ArticleTag::class;

    public static function form(Schema $schema): Schema
    {
        return ArticleTagForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ArticleTagsTable::configure($table);
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
            'index' => ListArticleTags::route('/'),
            'create' => CreateArticleTag::route('/create'),
            'edit' => EditArticleTag::route('/{record}/edit'),
        ];
    }
}
