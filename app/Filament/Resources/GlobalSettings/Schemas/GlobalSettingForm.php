<?php

namespace App\Filament\Resources\GlobalSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class GlobalSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Tabs::make('Settings')
                    ->persistTabInQueryString()
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('Site Info')
                            ->icon(Heroicon::OutlinedGlobeAlt)
                            ->schema([
                                Section::make('Branding')
                                    ->description('Site identity, logos, and the browser favicon.')
                                    ->icon(Heroicon::OutlinedSparkles)
                                    ->schema([
                                        TextInput::make('site_info.site_name')
                                            ->label('Site Name')
                                            ->placeholder('OVOLL')
                                            ->columnSpanFull(),
                                        Grid::make(3)->schema([
                                            FileUpload::make('site_info.header_logo')
                                                ->label('Header Logo')
                                                ->helperText('SVG or PNG, transparent background.')
                                                ->image()
                                                ->imageEditor()
                                                ->disk('public')
                                                ->directory('logos')
                                                ->visibility('public')
                                                ->columnSpan(1),
                                            FileUpload::make('site_info.footer_logo')
                                                ->label('Footer Logo')
                                                ->helperText('SVG or PNG, transparent background.')
                                                ->image()
                                                ->imageEditor()
                                                ->disk('public')
                                                ->directory('logos')
                                                ->visibility('public')
                                                ->columnSpan(1),
                                            FileUpload::make('site_info.favicon')
                                                ->label('Favicon')
                                                ->helperText('Square icon (32×32 or 512×512). ICO, PNG, or SVG.')
                                                ->image()
                                                ->acceptedFileTypes(['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml'])
                                                ->disk('public')
                                                ->directory('favicons')
                                                ->visibility('public')
                                                ->columnSpan(1),

                                        ]),
                                        Textarea::make('site_info.footer_description')
                                            ->label('Footer Brand Description')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                        Tab::make('Contact Info')
                            ->icon(Heroicon::OutlinedEnvelope)
                            ->schema([
                                Section::make('How people reach you')
                                    ->icon(Heroicon::OutlinedPhone)
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('contact_info.email')
                                                ->label('Email Address')
                                                ->email()
                                                ->prefixIcon(Heroicon::OutlinedEnvelope),
                                            TextInput::make('contact_info.telephone')
                                                ->label('Phone Number')
                                                ->tel()
                                                ->prefixIcon(Heroicon::OutlinedPhone),
                                        ]),
                                        Textarea::make('contact_info.address')
                                            ->label('Physical Address')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                        Tab::make('Social Links')
                            ->icon(Heroicon::OutlinedShare)
                            ->schema([
                                Section::make('Social profiles')
                                    ->icon(Heroicon::OutlinedShare)
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('social_links.twitter')
                                                ->label('Twitter / X URL')
                                                ->url()
                                                ->prefixIcon(Heroicon::OutlinedLink),
                                            TextInput::make('social_links.linkedin')
                                                ->label('LinkedIn URL')
                                                ->url()
                                                ->prefixIcon(Heroicon::OutlinedLink),
                                            TextInput::make('social_links.instagram')
                                                ->label('Instagram URL')
                                                ->url()
                                                ->prefixIcon(Heroicon::OutlinedLink),
                                            TextInput::make('social_links.github')
                                                ->label('GitHub URL')
                                                ->url()
                                                ->prefixIcon(Heroicon::OutlinedLink),
                                        ]),
                                    ]),
                            ]),
                        Tab::make('Legal Pages')
                            ->icon(Heroicon::OutlinedDocumentText)
                            ->schema([
                                Section::make('Privacy Policy')
                                    ->icon(Heroicon::OutlinedShieldCheck)
                                    ->collapsible()
                                    ->schema([
                                        RichEditor::make('site_info.privacy_policy')
                                            ->label('')
                                            ->columnSpanFull(),
                                    ]),
                                Section::make('Terms of Service')
                                    ->icon(Heroicon::OutlinedScale)
                                    ->collapsible()
                                    ->schema([
                                        RichEditor::make('site_info.terms_of_service')
                                            ->label('')
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                        Tab::make('Analytics & SEO')
                            ->icon(Heroicon::OutlinedChartBar)
                            ->schema([
                                Section::make('Analytics')
                                    ->icon(Heroicon::OutlinedChartBar)
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('analytics_ids.ga4')
                                                ->label('Google Analytics 4 ID')
                                                ->placeholder('G-XXXXXXXXXX'),
                                            TextInput::make('analytics_ids.gtm')
                                                ->label('Google Tag Manager ID')
                                                ->placeholder('GTM-XXXXXXX'),
                                        ]),
                                    ]),
                                Section::make('Default SEO Meta')
                                    ->icon(Heroicon::OutlinedMagnifyingGlass)
                                    ->schema([
                                        TextInput::make('meta_defaults.title')
                                            ->label('Default Meta Title')
                                            ->columnSpanFull(),
                                        Textarea::make('meta_defaults.description')
                                            ->label('Default Meta Description')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                    ]),
            ]);
    }
}
