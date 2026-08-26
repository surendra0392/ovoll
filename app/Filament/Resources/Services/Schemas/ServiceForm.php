<?php

namespace App\Filament\Resources\Services\Schemas;

use App\Filament\Forms\Components\SeoMetaForm;
use App\Models\ServiceCategory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ServiceForm
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
                        Select::make('category_id')
                            ->label('Category')
                            ->options(fn () => ServiceCategory::pluck('name', 'id')->toArray())
                            ->required(),
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_featured')
                            ->default(false),
                        Toggle::make('is_enabled')
                            ->default(true),
                        SpatieMediaLibraryFileUpload::make('cover_image')
                            ->collection('cover_image')
                            ->image()
                            ->columnSpanFull(),
                        Select::make('status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                                'archived' => 'Archived',
                            ])
                            ->required()
                            ->default('draft'),
                    ])
                    ->columns(2),

                Section::make('Service Brief & Intro')
                    ->components([
                        Textarea::make('description')
                            ->rows(4)
                            ->required(),
                    ]),

                Section::make('Problem & Solution')
                    ->components([
                        Textarea::make('problem_solution')
                            ->rows(6)
                            ->helperText('Define the user friction and OVOLL resolution in JSON format (e.g. {"problem": "...", "solution": "..."}).')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('problem_solution', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                    ]),

                Section::make('Deliverables & Process Workflow')
                    ->components([
                        Textarea::make('deliverables')
                            ->rows(6)
                            ->helperText('List of deliverables in JSON array format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('deliverables', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                        Textarea::make('process_timeline')
                            ->rows(6)
                            ->helperText('Workflow timeline phases in JSON array format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('process_timeline', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                    ])
                    ->columns(2),

                Section::make('Technologies & Pricing Structure')
                    ->components([
                        Textarea::make('technologies')
                            ->rows(6)
                            ->helperText('Technology matrix stacks in JSON array format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('technologies', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                        Textarea::make('pricing_comparison')
                            ->rows(6)
                            ->helperText('Pricing tier listings in JSON array format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('pricing_comparison', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                    ])
                    ->columns(2),

                Section::make('FAQs & Settings')
                    ->components([
                        Textarea::make('faqs')
                            ->rows(6)
                            ->helperText('Faq question/answer list in JSON array format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('faqs', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                        Textarea::make('settings')
                            ->rows(6)
                            ->helperText('Layout configurations, e.g. {"hero_variant": "split"}')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('settings', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                    ])
                    ->columns(2),

                Section::make('SEO Data')
                    ->components([
                        SeoMetaForm::make(),
                    ]),
            ]);
    }
}
