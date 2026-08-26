<?php

namespace App\Filament\Resources\GlobalSettings;

use App\Filament\Resources\GlobalSettings\Pages\CreateGlobalSetting;
use App\Filament\Resources\GlobalSettings\Pages\EditGlobalSetting;
use App\Filament\Resources\GlobalSettings\Pages\ListGlobalSettings;
use App\Filament\Resources\GlobalSettings\Schemas\GlobalSettingForm;
use App\Filament\Resources\GlobalSettings\Tables\GlobalSettingsTable;
use App\Models\GlobalSetting;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class GlobalSettingResource extends Resource
{
    protected static ?string $navigationLabel = 'Settings';

    protected static ?string $modelLabel = 'Setting';

    protected static ?string $pluralModelLabel = 'Settings';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cog-8-tooth';

    protected static ?int $navigationSort = 100;

    protected static ?string $model = GlobalSetting::class;

    public static function getNavigationUrl(): string
    {
        $setting = GlobalSetting::firstOrCreate(['id' => 1]);

        return static::getUrl('edit', ['record' => $setting->id]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return GlobalSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return GlobalSettingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListGlobalSettings::route('/'),
            'create' => CreateGlobalSetting::route('/create'),
            'edit' => EditGlobalSetting::route('/{record}/edit'),
        ];
    }
}
