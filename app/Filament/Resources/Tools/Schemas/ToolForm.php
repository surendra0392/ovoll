<?php

namespace App\Filament\Resources\Tools\Schemas;

use App\Models\ToolCategory;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Set;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ToolForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)->schema([
                    Section::make('Tool Details')->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        Textarea::make('description')
                            ->maxLength(65535)
                            ->columnSpanFull(),

                        TextInput::make('component_name')
                            ->required()
                            ->maxLength(255)
                            ->helperText('React component name e.g. ColorPaletteGenerator'),

                        Select::make('tool_category_id')
                            ->label('Category')
                            ->options(fn () => ToolCategory::pluck('name', 'id')->toArray())
                            ->searchable(),
                    ])->columnSpan(2),

                    Section::make('Settings')->schema([
                        Select::make('status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                                'archived' => 'Archived',
                            ])
                            ->default('draft')
                            ->required(),

                        SpatieMediaLibraryFileUpload::make('icon')
                            ->collection('icon')
                            ->image(),

                        Toggle::make('is_featured')
                            ->default(false),

                        Toggle::make('is_new')
                            ->default(false),

                        Toggle::make('is_pro')
                            ->default(false),
                    ])->columnSpan(1),
                ]),

                Section::make('SEO & Configuration')
                    ->collapsed()
                    ->components([
                        KeyValue::make('seo_meta')
                            ->keyLabel('Meta Key')
                            ->valueLabel('Meta Value')
                            ->addActionLabel('Add meta tag'),

                        KeyValue::make('settings')
                            ->keyLabel('Setting')
                            ->valueLabel('Value')
                            ->addActionLabel('Add setting'),
                    ])
                    ->columns(2),
            ]);
    }
}
