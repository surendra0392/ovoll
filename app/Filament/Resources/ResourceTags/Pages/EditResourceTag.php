<?php

namespace App\Filament\Resources\ResourceTags\Pages;

use App\Filament\Resources\ResourceTags\ResourceTagResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditResourceTag extends EditRecord
{
    protected static string $resource = ResourceTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
