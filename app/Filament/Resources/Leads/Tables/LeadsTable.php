<?php

namespace App\Filament\Resources\Leads\Tables;

use App\Filament\Exports\LeadExporter;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ExportAction;
use Filament\Actions\ExportBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LeadsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn (Builder $query) => $query->with(['assignee']))
            ->paginated([10, 25, 50, 100])
            ->columns([
                TextColumn::make('name')
                    ->label('Contact Name')
                    ->state(fn ($record) => trim(($record->first_name ?? '').' '.($record->last_name ?? '')))
                    ->searchable(['first_name', 'last_name']),
                TextColumn::make('email')
                    ->searchable(),
                TextColumn::make('company_name')
                    ->label('Company')
                    ->searchable(),
                TextColumn::make('score')
                    ->label('Score')
                    ->sortable()
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state >= 70 => 'success',
                        $state >= 40 => 'warning',
                        default => 'danger',
                    })
                    ->alignCenter(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'gray',
                        'qualified' => 'info',
                        'proposal' => 'warning',
                        'closed_won' => 'success',
                        'closed_lost' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),
                TextColumn::make('priority')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'high' => 'danger',
                        'medium' => 'warning',
                        'low' => 'success',
                        default => 'gray',
                    })
                    ->sortable(),
                TextColumn::make('country')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('source')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('assignee.name')
                    ->label('Assigned To')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('M d, Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'new' => 'New Lead',
                        'qualified' => 'Qualified',
                        'proposal' => 'Proposal Sent',
                        'closed_won' => 'Closed (Won)',
                        'closed_lost' => 'Closed (Lost)',
                    ]),
                SelectFilter::make('priority')
                    ->options([
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->headerActions([
                ExportAction::make()
                    ->exporter(LeadExporter::class),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ExportBulkAction::make()
                        ->exporter(LeadExporter::class),
                ]),
            ]);
    }
}
