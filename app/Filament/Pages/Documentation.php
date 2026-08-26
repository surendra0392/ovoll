<?php

namespace App\Filament\Pages;

use BackedEnum;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;

class Documentation extends Page
{
    protected static \UnitEnum|string|null $navigationGroup = 'System';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBookOpen;

    protected static ?int $navigationSort = 90;

    protected static ?string $title = 'Documentation';

    protected static ?string $navigationLabel = 'Documentation';

    protected string $view = 'filament.pages.documentation';

    public function getSubheading(): ?string
    {
        return 'Guides for managing content, media, SEO, and settings across the OVOLL platform.';
    }
}
