<?php

namespace App\Filament\Resources\ArticleSeries;

use App\Filament\Resources\ArticleSeries\Pages\CreateArticleSeries;
use App\Filament\Resources\ArticleSeries\Pages\EditArticleSeries;
use App\Filament\Resources\ArticleSeries\Pages\ListArticleSeries;
use App\Filament\Resources\ArticleSeries\Schemas\ArticleSeriesForm;
use App\Filament\Resources\ArticleSeries\Tables\ArticleSeriesTable;
use App\Models\ArticleSeries;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ArticleSeriesResource extends Resource
{
    protected static \UnitEnum|string|null $navigationGroup = 'Content';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-queue-list';

    protected static ?int $navigationSort = 40;

    protected static ?string $model = ArticleSeries::class;

    public static function form(Schema $schema): Schema
    {
        return ArticleSeriesForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ArticleSeriesTable::configure($table);
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
            'index' => ListArticleSeries::route('/'),
            'create' => CreateArticleSeries::route('/create'),
            'edit' => EditArticleSeries::route('/{record}/edit'),
        ];
    }
}
