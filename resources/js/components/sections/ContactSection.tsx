import { useState } from 'react';
import { Text, Input, Textarea, Button, Checkbox, FormField } from '@/components/ui';
import { cn } from '@/utils';
import type { SectionData } from './types';

interface ContactSectionProps {
    section: SectionData;
}

export function ContactSection({ section }: ContactSectionProps) {
    const { variant, title, subtitle } = section;

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        budget: [] as string[],
    });

    const handleBudgetChange = (budgetOption: string) => {
        setFormState((prev) => {
            const hasOption = prev.budget.includes(budgetOption);

            return {
                ...prev,
                budget: hasOption
                    ? prev.budget.filter((o) => o !== budgetOption)
                    : [...prev.budget, budgetOption],
            };
        });
    };

    const isSplit = variant === 'split' || variant === 'project_brief';
    const isBrief = variant === 'project_brief';

    return (
        <div className="mx-auto w-full max-w-6xl space-y-16 px-6">
            <div
                className={cn(
                    'grid grid-cols-1 items-start gap-16',
                    isSplit ? 'lg:grid-cols-2' : 'mx-auto max-w-2xl',
                )}
            >
                {/* Intro Column */}
                <div className="space-y-6">
                    <Text
                        variant="caption"
                        className="font-mono tracking-widest text-white/40 uppercase"
                    >
                        Contact Us
                    </Text>
                    {title && (
                        <Text
                            variant="h2"
                            className="text-4xl font-bold tracking-tight md:text-5xl"
                        >
                            {title}
                        </Text>
                    )}
                    {subtitle && (
                        <Text variant="body" className="text-base text-white/60 md:text-lg">
                            {subtitle}
                        </Text>
                    )}
                </div>

                {/* Form Column */}
                <form className="w-full space-y-6 rounded-2xl border border-white/5 bg-white/[0.01] p-8">
                    <FormField label="Full Name" required>
                        <Input
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Alex Vance"
                        />
                    </FormField>

                    <FormField label="Email Address" required>
                        <Input
                            id="contact-section-email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="alex@company.com"
                        />
                    </FormField>

                    {/* Project Brief Options */}
                    {isBrief && (
                        <div className="space-y-4 pt-2">
                            <Text variant="body" className="text-sm font-semibold text-white/70">
                                Estimated Project Budget
                            </Text>
                            <div className="grid grid-cols-2 gap-4">
                                <Checkbox
                                    label="<₹20L"
                                    checked={formState.budget.includes('<₹20L')}
                                    onCheckedChange={() => handleBudgetChange('<₹20L')}
                                />
                                <Checkbox
                                    label="₹20L - ₹40L"
                                    checked={formState.budget.includes('₹20L - ₹40L')}
                                    onCheckedChange={() => handleBudgetChange('₹20L - ₹40L')}
                                />
                                <Checkbox
                                    label="₹40L - ₹80L"
                                    checked={formState.budget.includes('₹40L - ₹80L')}
                                    onCheckedChange={() => handleBudgetChange('₹40L - ₹80L')}
                                />
                                <Checkbox
                                    label="₹80L+"
                                    checked={formState.budget.includes('₹80L+')}
                                    onCheckedChange={() => handleBudgetChange('₹80L+')}
                                />
                            </div>
                        </div>
                    )}

                    <FormField label="Message" required>
                        <Textarea
                            value={formState.message}
                            onChange={(e) =>
                                setFormState({ ...formState, message: e.target.value })
                            }
                            placeholder="Describe your goals, requirements, and timeline..."
                            rows={5}
                        />
                    </FormField>

                    <Button
                        type="submit"
                        className="text-surface-raised w-full rounded-xl bg-white py-3 font-semibold transition-colors hover:bg-white/90"
                    >
                        Submit Inquiry
                    </Button>
                </form>
            </div>
        </div>
    );
}
