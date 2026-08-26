<?php

namespace App\Mail;

use App\Models\EmailTemplate;
use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TeamNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $lead;

    public $templateIdentifier;

    /**
     * Create a new message instance.
     */
    public function __construct(Lead $lead, string $templateIdentifier = 'team_notification')
    {
        $this->lead = $lead;
        $this->templateIdentifier = $templateIdentifier;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $template = EmailTemplate::where('identifier', $this->templateIdentifier)->where('is_active', true)->first();

        $subject = $template ? $this->parseVariables($template->subject) : 'New Lead Received';

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $template = EmailTemplate::where('identifier', $this->templateIdentifier)->where('is_active', true)->first();

        $body = $template ? $this->parseVariables($template->body) : 'A new lead has been submitted.';

        return new Content(
            htmlString: $body,
        );
    }

    protected function parseVariables(string $content): string
    {
        $replacements = [
            '{first_name}' => $this->lead->first_name ?? '',
            '{last_name}' => $this->lead->last_name ?? '',
            '{email}' => $this->lead->email ?? '',
            '{company_name}' => $this->lead->company_name ?? '',
            '{phone}' => $this->lead->phone ?? '',
            '{priority}' => ucfirst($this->lead->priority ?? 'medium'),
            '{score}' => (string) ($this->lead->score ?? 0),
        ];

        return str_replace(array_keys($replacements), array_values($replacements), $content);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
