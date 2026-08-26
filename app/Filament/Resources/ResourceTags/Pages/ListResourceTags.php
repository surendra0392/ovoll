<?php

namespace App\Filament\Resources\ResourceTags\Pages;

use App\Filament\Resources\ResourceTags\ResourceTagResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListResourceTags extends ListRecords
{
    protected static string $resource = ResourceTagResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
