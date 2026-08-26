<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('category')
                    ->required(),
                TextInput::make('price')
                    ->prefix('$'),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull()
                    ->rows(3),
                TextInput::make('features.icon')
                    ->label('Lucide Icon Name')
                    ->helperText('e.g., Users, Boxes, Package')
                    ->required(),
                TagsInput::make('features.tags')
                    ->label('Tags')
                    ->placeholder('Add a tag'),
                TextInput::make('demo_url')
                    ->label('Demo URL')
                    ->url(),
                TextInput::make('download_url')
                    ->label('Download URL')
                    ->url(),
                Select::make('status')
                    ->options([
                        'published' => 'Published',
                        'draft' => 'Draft',
                    ])
                    ->required()
                    ->default('published'),
                Toggle::make('is_featured')
                    ->label('Featured'),
            ]);
    }
}
