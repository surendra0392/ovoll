<?php

namespace App\Filament\Resources\ServiceCategories\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ServiceCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Information')
                    ->components([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->disabled(fn ($record) => $record !== null),
                        TextInput::make('icon')
                            ->helperText('Heroicon name, e.g. heroicon-o-code-bracket')
                            ->maxLength(255),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_featured')
                            ->default(false),
                        Toggle::make('is_enabled')
                            ->default(true),
                    ])
                    ->columns(2),

                Section::make('Description')
                    ->components([
                        Textarea::make('description')
                            ->rows(5),
                    ]),

                Section::make('SEO Data')
                    ->components([
                        Textarea::make('seo')
                            ->rows(6)
                            ->helperText('Meta title, description, and keywords in JSON format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('seo', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                    ]),
            ]);
    }
}
