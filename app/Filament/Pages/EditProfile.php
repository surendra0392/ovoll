<?php

namespace App\Filament\Pages;

use Filament\Auth\Pages\EditProfile as BaseEditProfile;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

/**
 * Full-width profile page laid out as proper "aside" sections instead of the
 * default centered card. Keeps all base behaviour (validation, hashing,
 * rate limiting, email-change verification) by reusing the parent's field
 * component builders — only the layout is customised.
 */
class EditProfile extends BaseEditProfile
{
    public function getMaxContentWidth(): ?string
    {
        return '4xl';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Profile Information')
                    ->description('Update your account name and email address.')
                    ->icon(Heroicon::OutlinedUserCircle)
                    ->aside()
                    ->schema([
                        $this->getNameFormComponent(),
                        $this->getEmailFormComponent(),
                    ]),

                Section::make('Update Password')
                    ->description('Set a new password. Leave the fields blank to keep your current one.')
                    ->icon(Heroicon::OutlinedLockClosed)
                    ->aside()
                    ->schema([
                        $this->getPasswordFormComponent(),
                        $this->getPasswordConfirmationFormComponent(),
                        $this->getCurrentPasswordFormComponent(),
                    ]),
            ]);
    }
}
