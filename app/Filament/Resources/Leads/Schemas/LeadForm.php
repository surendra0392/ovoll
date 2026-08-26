<?php

namespace App\Filament\Resources\Leads\Schemas;

use App\Models\User;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LeadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Contact Information')
                    ->components([
                        TextInput::make('first_name')
                            ->maxLength(255),
                        TextInput::make('last_name')
                            ->maxLength(255),
                        TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('phone')
                            ->maxLength(255),
                        TextInput::make('country')
                            ->maxLength(255),
                        Select::make('preferred_contact_method')
                            ->options([
                                'email' => 'Email',
                                'phone' => 'Phone',
                            ]),
                        TextInput::make('source')
                            ->maxLength(255),
                        TextInput::make('ip_address')
                            ->maxLength(45),
                    ])
                    ->columns(2),

                Section::make('Business Intelligence')
                    ->components([
                        TextInput::make('company_name')
                            ->maxLength(255),
                        TextInput::make('company_size')
                            ->maxLength(255),
                        TextInput::make('industry')
                            ->maxLength(255),
                        TextInput::make('budget_range')
                            ->maxLength(255),
                        TextInput::make('timeline')
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Section::make('Lead Routing & Pipeline')
                    ->components([
                        Select::make('status')
                            ->options([
                                'new' => 'New Lead',
                                'qualified' => 'Qualified',
                                'proposal' => 'Proposal Sent',
                                'closed_won' => 'Closed (Won)',
                                'closed_lost' => 'Closed (Lost)',
                            ])
                            ->required()
                            ->default('new'),
                        Select::make('assigned_to')
                            ->label('Assigned Strategist')
                            ->options(fn () => User::pluck('name', 'id')->toArray())
                            ->nullable(),
                        Select::make('priority')
                            ->options([
                                'low' => 'Low',
                                'medium' => 'Medium',
                                'high' => 'High',
                            ])
                            ->default('medium'),
                        TextInput::make('score')
                            ->label('Calculated Lead Score (0-100)')
                            ->disabled()
                            ->numeric(),
                    ])
                    ->columns(3),

                Section::make('Discovery Questionnaire & Stacks')
                    ->components([
                        Textarea::make('goals_challenges')
                            ->label('Client Goals & Challenges')
                            ->rows(4),
                        Textarea::make('services')
                            ->helperText('Selected services in JSON format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('services', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            })
                            ->rows(4),
                        Textarea::make('utm_parameters')
                            ->helperText('UTM Parameters in JSON format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('utm_parameters', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            })
                            ->rows(4),
                    ])
                    ->columns(2),

                Section::make('Project Estimator Details')
                    ->components([
                        Textarea::make('estimator_details')
                            ->rows(6)
                            ->helperText('Interactive estimator calculations in JSON format.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('estimator_details', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            }),
                    ]),

                Section::make('Follow-up Notes & Tags')
                    ->components([
                        Textarea::make('notes')
                            ->rows(4),
                        FileUpload::make('attachments')
                            ->label('Uploaded Files')
                            ->multiple()
                            ->directory('leads/attachments')
                            ->downloadable()
                            ->openable(),
                        Textarea::make('tags')
                            ->helperText('JSON list of tags.')
                            ->afterStateHydrated(function ($state, $set) {
                                if (is_array($state)) {
                                    $set('tags', json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                                }
                            })
                            ->dehydrateStateUsing(function ($state) {
                                if (is_string($state)) {
                                    return json_decode($state, true) ?? [];
                                }

                                return $state;
                            })
                            ->rows(4),
                    ])
                    ->columns(2),
            ]);
    }
}
