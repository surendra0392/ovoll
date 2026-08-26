<?php

namespace App\Filament\Resources\Pages\Schemas;

use App\Models\Page;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->schema(function (?Page $record) {
                        if (! $record) {
                            return [
                                Grid::make(2)->schema([
                                    TextInput::make('name')
                                        ->label('Page Name')
                                        ->required()
                                        ->live(onBlur: true)
                                        ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                                    TextInput::make('slug')
                                        ->label('URL Slug')
                                        ->required()
                                        ->unique(Page::class, 'slug'),
                                ]),
                                self::getGenericTabs(),
                            ];
                        }

                        $isCorePage = in_array($record->slug, ['home', 'about']);

                        $fields = [
                            Grid::make(2)->schema([
                                TextInput::make('name')
                                    ->label('Page Name')
                                    ->required(),
                                TextInput::make('slug')
                                    ->label('URL Slug')
                                    ->disabled($isCorePage)
                                    ->required(),
                            ]),
                        ];

                        if ($record->slug === 'home') {
                            $fields[] = self::getHomeTabs();
                        } elseif ($record->slug === 'about') {
                            $fields[] = self::getAboutTabs();
                        } else {
                            $fields[] = self::getGenericTabs();
                        }

                        return $fields;
                    })
                    ->columnSpanFull(),
            ]);
    }

    private static function getHomeTabs()
    {
        return Tabs::make('Home Content')
            ->tabs([
                Tabs\Tab::make('Hero')
                    ->schema([
                        Repeater::make('content.hero.rotatingHeadlines')
                            ->label('Rotating Headlines')
                            ->simple(TextInput::make('headline')->required()),
                    ]),
                Tabs\Tab::make('Growth Pillars')
                    ->schema([
                        Repeater::make('content.growthPillars')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('desc')->required(),
                            ])
                            ->columns(2),
                    ]),
                Tabs\Tab::make('Solution Cards')
                    ->schema([
                        Repeater::make('content.solutionCards')
                            ->schema([
                                TextInput::make('title')->required(),
                                TextInput::make('icon')->required(),
                                Textarea::make('desc')->required()->columnSpanFull(),
                            ])
                            ->columns(2),
                    ]),
                Tabs\Tab::make('Marquee Items')
                    ->schema([
                        Repeater::make('content.marqueeItems')
                            ->simple(TextInput::make('item')->required()),
                    ]),
                Tabs\Tab::make('Services')
                    ->schema([
                        Repeater::make('content.services')
                            ->schema([
                                TextInput::make('num')->required(),
                                TextInput::make('icon')->required(),
                                TextInput::make('title')->required(),
                                Textarea::make('desc')->required()->columnSpanFull(),
                            ])
                            ->columns(3),
                    ]),
                Tabs\Tab::make('Pillars')
                    ->schema([
                        Repeater::make('content.pillars')
                            ->schema([
                                TextInput::make('num')->required(),
                                TextInput::make('icon')->required(),
                                TextInput::make('title')->required(),
                                Textarea::make('desc')->required()->columnSpanFull(),
                            ])
                            ->columns(3),
                    ]),
                Tabs\Tab::make('Tech Stack')
                    ->schema([
                        Repeater::make('content.techStack')
                            ->schema([
                                TextInput::make('name')->required(),
                                TextInput::make('slug')->required(),
                                TextInput::make('desc')->required(),
                            ])
                            ->columns(3),
                    ]),
            ]);
    }

    private static function getAboutTabs()
    {
        return Tabs::make('About Content')
            ->tabs([
                Tabs\Tab::make('Hero')
                    ->schema([
                        TextInput::make('content.hero.title')->required(),
                        Textarea::make('content.hero.subtitle')->required(),
                    ]),
                Tabs\Tab::make('Capabilities')
                    ->schema([
                        Repeater::make('content.capabilities')
                            ->schema([
                                TextInput::make('title')->required(),
                                TextInput::make('icon')->required(),
                                Textarea::make('description')->required()->columnSpanFull(),
                            ])
                            ->columns(2),
                    ]),
                Tabs\Tab::make('Process')
                    ->schema([
                        Repeater::make('content.processSteps')
                            ->schema([
                                TextInput::make('step')->required(),
                                TextInput::make('title')->required(),
                                Textarea::make('description')->required()->columnSpanFull(),
                            ])
                            ->columns(2),
                    ]),
                Tabs\Tab::make('Client Gains')
                    ->schema([
                        Repeater::make('content.clientGains')
                            ->schema([
                                TextInput::make('title')->required(),
                            ]),
                    ]),
            ]);
    }

    private static function getGenericTabs()
    {
        return Tabs::make('Page Content')
            ->tabs([
                Tabs\Tab::make('Hero')
                    ->schema([
                        TextInput::make('content.hero.badge')->label('Badge / Eyebrow'),
                        TextInput::make('content.hero.titleLead')->label('Title (lead)'),
                        TextInput::make('content.hero.titleHighlight')->label('Title (highlighted)'),
                        Textarea::make('content.hero.subtitle')->label('Subtitle'),
                    ]),
                Tabs\Tab::make('Content')
                    ->schema([
                        Repeater::make('content.sections')
                            ->schema([
                                TextInput::make('heading')->required(),
                                RichEditor::make('body')->required(),
                            ]),
                    ]),
            ]);
    }
}
