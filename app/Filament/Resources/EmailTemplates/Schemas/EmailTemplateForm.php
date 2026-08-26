<?php

namespace App\Filament\Resources\EmailTemplates\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EmailTemplateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Template Settings')
                    ->description('Define the identifier and subject for this email template.')
                    ->components([
                        TextInput::make('identifier')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        TextInput::make('subject')
                            ->required()
                            ->maxLength(255),
                        Toggle::make('is_active')
                            ->default(true)
                            ->required(),
                    ])
                    ->columns(2),
                Section::make('Email Content')
                    ->description('Design the body of your email using the rich text editor.')
                    ->components([
                        RichEditor::make('body')
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
