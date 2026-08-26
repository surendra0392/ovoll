<?php

namespace App\Filament\Resources\NavigationMenus\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class NavigationMenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Menu Details')
                    ->description('General configuration and location handle for this navigation menu.')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('name')
                                ->label('Menu Name')
                                ->placeholder('e.g. Header Navigation')
                                ->required()
                                ->maxLength(255)
                                ->columnSpan(1),
                            TextInput::make('handle')
                                ->label('Location Handle')
                                ->placeholder('e.g. header, footer_company, footer_services')
                                ->helperText('Used by the frontend to load this menu (e.g. header, footer_company, footer_services, footer_legal).')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->maxLength(255)
                                ->columnSpan(1),
                            Toggle::make('is_active')
                                ->label('Active')
                                ->helperText('Enable or disable this menu on the frontend.')
                                ->required()
                                ->default(true)
                                ->inline(false)
                                ->columnSpan(1),
                        ]),
                    ])
                    ->columnSpanFull(),

                Section::make('Navigation Items')
                    ->description('Add and reorder menu items, internal links, or external URLs.')
                    ->schema([
                        Repeater::make('items')
                            ->label('Menu Links')
                            ->schema([
                                TextInput::make('label')
                                    ->label('Link Label')
                                    ->placeholder('e.g. Services, About Us')
                                    ->required()
                                    ->columnSpan(2),
                                TextInput::make('url')
                                    ->label('URL / Path')
                                    ->placeholder('e.g. /services, /contact, or https://...')
                                    ->helperText('Accepts internal paths (/services) or full URLs (https://...)')
                                    ->required()
                                    ->columnSpan(2),
                                Select::make('target')
                                    ->label('Open In')
                                    ->options([
                                        '_self' => 'Same Window (_self)',
                                        '_blank' => 'New Tab (_blank)',
                                    ])
                                    ->default('_self')
                                    ->required()
                                    ->columnSpan(1),
                                TextInput::make('icon')
                                    ->label('Icon / Badge')
                                    ->placeholder('e.g. sparkles, new')
                                    ->columnSpan(1),
                            ])
                            ->columns(6)
                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                            ->collapsible()
                            ->collapsed(false)
                            ->cloneable()
                            ->reorderableWithButtons()
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
