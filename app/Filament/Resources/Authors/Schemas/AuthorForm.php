<?php

namespace App\Filament\Resources\Authors\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Set;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    Section::make('Basic Information')->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Textarea::make('bio')
                            ->maxLength(65535)
                            ->columnSpanFull(),
                    ])->columnSpan(2),

                    Section::make('Media & Links')->schema([
                        SpatieMediaLibraryFileUpload::make('avatar')
                            ->collection('avatar')
                            ->image()
                            ->imageEditor(),

                        KeyValue::make('social_links')
                            ->keyLabel('Platform (e.g. Twitter)')
                            ->valueLabel('URL')
                            ->addActionLabel('Add link'),
                    ])->columnSpan(1),
                ]),
            ]);
    }
}
