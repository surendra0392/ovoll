<?php

namespace App\Filament\Resources\ArticleTags\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ArticleTagForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
            ]);
    }
}
