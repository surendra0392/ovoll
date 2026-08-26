<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Filament\Forms\Components\SeoMetaForm;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Set;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Article')
                    ->tabs([
                        Tabs\Tab::make('Content')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Grid::make(2)->schema([
                                    TextInput::make('title')
                                        ->required()
                                        ->live(onBlur: true)
                                        ->afterStateUpdated(fn (string $operation, $state, Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),
                                    TextInput::make('slug')
                                        ->required()
                                        ->unique(ignoreRecord: true),
                                ]),

                                Textarea::make('excerpt')
                                    ->rows(3)
                                    ->required()
                                    ->columnSpanFull(),

                                SpatieMediaLibraryFileUpload::make('cover_image')
                                    ->collection('cover_image')
                                    ->image()
                                    ->columnSpanFull(),

                                Builder::make('content')
                                    ->label('Editorial Content')
                                    ->columnSpanFull()
                                    ->blocks([
                                        Block::make('text')
                                            ->schema([
                                                RichEditor::make('content')
                                                    ->required(),
                                            ])->icon('heroicon-o-bars-3-bottom-left'),

                                        Block::make('callout')
                                            ->schema([
                                                Select::make('type')
                                                    ->options([
                                                        'info' => 'Information',
                                                        'warning' => 'Warning',
                                                        'success' => 'Success',
                                                        'danger' => 'Danger',
                                                    ])->required()->default('info'),
                                                TextInput::make('title'),
                                                Textarea::make('message')->required(),
                                            ])->icon('heroicon-o-megaphone'),

                                        Block::make('quote')
                                            ->schema([
                                                Textarea::make('quote')->required()->rows(3),
                                                TextInput::make('author'),
                                                TextInput::make('role'),
                                            ])->icon('heroicon-o-chat-bubble-bottom-center-text'),

                                        Block::make('code')
                                            ->schema([
                                                Select::make('language')
                                                    ->options([
                                                        'php' => 'PHP',
                                                        'javascript' => 'JavaScript',
                                                        'typescript' => 'TypeScript',
                                                        'html' => 'HTML',
                                                        'css' => 'CSS',
                                                        'bash' => 'Bash',
                                                        'json' => 'JSON',
                                                    ])->default('javascript'),
                                                Textarea::make('code')->required()->rows(10)->extraAttributes(['style' => 'font-family: monospace;']),
                                            ])->icon('heroicon-o-code-bracket'),

                                        Block::make('gallery')
                                            ->schema([
                                                Select::make('layout')
                                                    ->options([
                                                        'grid' => 'Grid',
                                                        'slider' => 'Slider',
                                                    ])->default('grid'),
                                                SpatieMediaLibraryFileUpload::make('images')
                                                    ->collection('images')
                                                    ->multiple()
                                                    ->image()
                                                    ->required(),
                                            ])->icon('heroicon-o-photo'),

                                        Block::make('comparison_table')
                                            ->schema([
                                                TextInput::make('title'),
                                                Repeater::make('rows')
                                                    ->schema([
                                                        TextInput::make('feature')->required(),
                                                        TextInput::make('value_a')->label('Item A Value'),
                                                        TextInput::make('value_b')->label('Item B Value'),
                                                    ])
                                                    ->columns(3),
                                            ])->icon('heroicon-o-table-cells'),

                                        Block::make('statistics')
                                            ->schema([
                                                Repeater::make('stats')
                                                    ->schema([
                                                        TextInput::make('value')->required(),
                                                        TextInput::make('label')->required(),
                                                        TextInput::make('suffix'),
                                                    ])->columns(3),
                                            ])->icon('heroicon-o-chart-bar'),

                                        Block::make('checklist')
                                            ->schema([
                                                TextInput::make('title'),
                                                Repeater::make('items')
                                                    ->schema([
                                                        TextInput::make('item')->required(),
                                                    ]),
                                            ])->icon('heroicon-o-check-circle'),

                                        Block::make('download')
                                            ->schema([
                                                TextInput::make('title')->required(),
                                                TextInput::make('description'),
                                                SpatieMediaLibraryFileUpload::make('file')->collection('downloads')->required(),
                                            ])->icon('heroicon-o-arrow-down-tray'),

                                        Block::make('video')
                                            ->schema([
                                                TextInput::make('url')->url()->required()->label('YouTube/Vimeo URL'),
                                                TextInput::make('caption'),
                                            ])->icon('heroicon-o-video-camera'),
                                    ]),
                            ]),

                        Tabs\Tab::make('Organization')
                            ->icon('heroicon-o-rectangle-group')
                            ->schema([
                                Grid::make(2)->schema([
                                    Select::make('author_id')
                                        ->relationship('author', 'name')
                                        ->searchable()
                                        ->preload()
                                        ->required(),

                                    Select::make('article_category_id')
                                        ->relationship('category', 'name')
                                        ->searchable()
                                        ->preload(),

                                    Select::make('article_series_id')
                                        ->relationship('series', 'name')
                                        ->searchable()
                                        ->preload(),

                                    Select::make('tags')
                                        ->relationship('tags', 'name')
                                        ->multiple()
                                        ->preload(),

                                    Select::make('relatedArticles')
                                        ->relationship('relatedArticles', 'title')
                                        ->multiple()
                                        ->searchable(),
                                ]),
                            ]),

                        Tabs\Tab::make('Publishing')
                            ->icon('heroicon-o-calendar')
                            ->schema([
                                Grid::make(2)->schema([
                                    Select::make('status')
                                        ->options([
                                            'draft' => 'Draft',
                                            'published' => 'Published',
                                            'archived' => 'Archived',
                                        ])
                                        ->required()
                                        ->default('draft'),

                                    DateTimePicker::make('published_at'),
                                ]),

                                Section::make('Featured & Visibility')->schema([
                                    Toggle::make('is_featured')
                                        ->label('Feature this article'),
                                    Toggle::make('is_pinned')
                                        ->label('Pin to top of lists'),
                                ])->columns(2),

                                Grid::make(2)->schema([
                                    TextInput::make('reading_time')
                                        ->numeric()
                                        ->default(0)
                                        ->disabled()
                                        ->helperText('Auto-calculated based on content.'),

                                    TextInput::make('views_count')
                                        ->numeric()
                                        ->default(0)
                                        ->disabled(),
                                ]),
                            ]),

                        Tabs\Tab::make('SEO')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                Section::make('Search Engine Optimization')->schema([
                                    SeoMetaForm::make(),
                                ]),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
