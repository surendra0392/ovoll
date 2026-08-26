<?php

namespace App\Filament\Resources\GlobalSettings\Pages;

use App\Filament\Resources\GlobalSettings\GlobalSettingResource;
use App\Models\GlobalSetting;
use Filament\Resources\Pages\ListRecords;

class ListGlobalSettings extends ListRecords
{
    protected static string $resource = GlobalSettingResource::class;

    public function mount(): void
    {
        $setting = GlobalSetting::firstOrCreate(['id' => 1]);
        $this->redirect(GlobalSettingResource::getUrl('edit', ['record' => $setting->id]));
    }
}
