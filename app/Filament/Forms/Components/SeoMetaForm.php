<?php

namespace App\Filament\Forms\Components;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Get;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Placeholder;
use Illuminate\Support\HtmlString;

class SeoMetaForm
{
    public static function make(string $relationship = 'seoMeta'): Group
    {
        return Group::make()
            ->relationship($relationship)
            ->schema([
                TextInput::make('title')
                    ->label('Meta Title')
                    ->helperText('Override the default page title. Recommended length: 50-60 characters.')
                    ->maxLength(60)
                    ->live(debounce: 500)
                    ->columnSpanFull(),

                Textarea::make('description')
                    ->label('Meta Description')
                    ->helperText('Override the default description. Recommended length: 150-160 characters.')
                    ->maxLength(160)
                    ->rows(3)
                    ->live(debounce: 500)
                    ->columnSpanFull(),

                TextInput::make('keywords')
                    ->label('Keywords')
                    ->helperText('Comma-separated keywords for this page.')
                    ->columnSpanFull(),

                FileUpload::make('og_image')
                    ->label('Social Share Image (OG Image)')
                    ->image()
                    ->directory('seo')
                    ->helperText('Recommended size: 1200x630 pixels. Used when sharing on social media.')
                    ->columnSpanFull(),

                Placeholder::make('seo_preview')
                    ->label('SEO Preview')
                    ->content(function (Get $get) {
                        $title = $get('title') ?: 'Page Title';
                        $desc = $get('description') ?: 'Page description will appear here...';

                        return new HtmlString('
                            <div style="font-family: arial, sans-serif; max-width: 600px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background: #fff;">
                                <div style="color: #1a0dab; font-size: 18px; line-height: 1.2; margin-bottom: 2px; text-decoration: none;">'.e($title).'</div>
                                <div style="color: #006621; font-size: 13px; line-height: 1.2; margin-bottom: 2px;">example.com › resource</div>
                                <div style="color: #545454; font-size: 13px; line-height: 1.4;">'.e($desc).'</div>
                            </div>
                        ');
                    })
                    ->columnSpanFull(),
            ]);
    }
}
