<?php

namespace App\Filament\Resources\Resources\Schemas;

use Filament\Forms\Components\Builder;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Set;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ResourceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    Section::make('General Information')->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Select::make('type')
                            ->options([
                                'article' => 'Article',
                                'guide' => 'Guide',
                                'checklist' => 'Checklist',
                                'download' => 'Download',
                            ])
                            ->default('article')
                            ->required(),

                        Textarea::make('excerpt')
                            ->maxLength(65535)
                            ->columnSpanFull(),
                    ])->columnSpan(2),

                    Section::make('Meta & Media')->schema([
                        Select::make('status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                                'archived' => 'Archived',
                            ])
                            ->default('draft')
                            ->required(),

                        DateTimePicker::make('published_at')
                            ->label('Publish Date'),

                        Select::make('author_id')
                            ->relationship('author', 'name')
                            ->searchable()
                            ->preload(),

                        Select::make('resource_category_id')
                            ->relationship('category', 'name')
                            ->label('Category')
                            ->searchable()
                            ->preload(),

                        Select::make('tags')
                            ->relationship('tags', 'name')
                            ->multiple()
                            ->preload(),

                        FileUpload::make('cover_image')
                            ->image()
                            ->directory('resources/covers')
                            ->imageEditor(),

                        FileUpload::make('download_file')
                            ->directory('resources/downloads')
                            ->visible(fn (callable $get) => $get('type') === 'download' || $get('type') === 'checklist'),
                    ])->columnSpan(1),

                    Section::make('Content')->schema([
                        Builder::make('content')
                            ->blocks([
                                Builder\Block::make('text')
                                    ->schema([
                                        RichEditor::make('content')
                                            ->required(),
                                    ]),
                                Builder\Block::make('image')
                                    ->schema([
                                        FileUpload::make('url')
                                            ->label('Image')
                                            ->image()
                                            ->required(),
                                        TextInput::make('alt')
                                            ->label('Alt Text'),
                                        TextInput::make('caption')
                                            ->label('Caption'),
                                    ]),
                                Builder\Block::make('code')
                                    ->schema([
                                        Select::make('language')
                                            ->options([
                                                'php' => 'PHP',
                                                'javascript' => 'JavaScript',
                                                'typescript' => 'TypeScript',
                                                'html' => 'HTML',
                                                'css' => 'CSS',
                                                'bash' => 'Bash',
                                            ])
                                            ->default('php'),
                                        Textarea::make('code')
                                            ->required()
                                            ->rows(10)
                                            ->styles([
                                                'font-family' => 'monospace',
                                            ]),
                                    ]),
                                Builder\Block::make('quote')
                                    ->schema([
                                        Textarea::make('text')
                                            ->required(),
                                        TextInput::make('author'),
                                    ]),
                            ])
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                    Section::make('SEO & Advanced Settings')->schema([
                        KeyValue::make('seo')
                            ->label('SEO Meta')
                            ->keyLabel('Tag Name (e.g. meta_description)')
                            ->valueLabel('Value'),

                        KeyValue::make('settings')
                            ->label('Advanced Settings')
                            ->keyLabel('Setting')
                            ->valueLabel('Value'),
                    ])->columnSpanFull()->collapsed(),
                ]),
            ]);
    }
}
