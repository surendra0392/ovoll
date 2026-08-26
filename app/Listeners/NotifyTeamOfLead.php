<?php

namespace App\Listeners;

use App\Events\LeadCreated;
use Illuminate\Support\Facades\Log;

class NotifyTeamOfLead
{
    /**
     * Handle the event.
     */
    public function handle(LeadCreated $event): void
    {
        $lead = $event->lead;

        // Log entry representing sales notification (ready to wire up standard SMTP/Resend driver)
        Log::info(sprintf(
            'New lead captured: %s (%s) from %s. Lead Score: %d. Budget: %s.',
            $lead->first_name.' '.$lead->last_name,
            $lead->email,
            $lead->company_name ?? 'N/A',
            $lead->score,
            $lead->budget_range ?? 'N/A'
        ));
    }
}
