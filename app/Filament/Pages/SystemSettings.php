<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\Artisan;

class SystemSettings extends Page
{
    protected static \UnitEnum|string|null $navigationGroup = 'System';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedCog;

    protected string $view = 'filament.pages.system-settings';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('clearCache')
                ->label('Clear Cache')
                ->color('danger')
                ->requiresConfirmation()
                ->action(function () {
                    Artisan::call('cache:clear');

                    Notification::make()
                        ->title('System cache cleared successfully')
                        ->success()
                        ->send();
                }),
        ];
    }
}
