import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useAnnouncer } from '@/hooks/useAnnouncer';
import type { SiteSettings } from '@/types/cms';

interface FormProps {
    settings?: { discovery_questions?: SiteSettings['discovery_questions'] };
}
interface ContactFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    industry: string;
    services: string[];
    budget_range: string;
    timeline: string;
    goals_challenges: string;
    preferred_contact_method: string;
    _hp_trap: string;
    _hp_time: string;
}

// The wizard renders exactly four option steps (Purpose / Goals / Schedule /
// Capital) from `questions[0..3]`, so a CMS config that ships fewer than four
// questions is padded with these defaults — the form never assumes a count.
const DEFAULT_QUESTIONS: NonNullable<SiteSettings['discovery_questions']> = [
    {
        id: 'project_type',
        step: 1,
        question: 'What are you building?',
        options: [
            'Brand',
            'Website',
            'SaaS',
            'Mobile App',
            'Internal Tool',
            'AI Solution',
            'Automation',
            'Other',
        ],
    },
    {
        id: 'business_goals',
        step: 2,
        question: 'What are your primary business goals?',
        options: [
            'Generate leads',
            'Increase sales',
            'Improve branding',
            'Modernize systems',
            'Automate workflows',
            'Launch a new product',
        ],
    },
    {
        id: 'timeline',
        step: 3,
        question: 'What is your target timeline?',
        options: ['Immediately', '1 Month', '2–3 Months', 'Flexible'],
    },
    {
        id: 'budget',
        step: 4,
        question: 'What is your estimated budget range?',
        options: [
            '₹10,00,000 - ₹25,00,000',
            '₹25,00,000 - ₹50,00,000',
            '₹50,00,000 - ₹1,00,00,000',
            '₹1,00,00,000+',
            'Flexible',
        ],
    },
];

export default function SmartContactForm({ settings }: FormProps) {
    const STORAGE_KEY = 'ovoll_contact_wizard_draft_v2';
    const [step, setStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const announce = useAnnouncer();

    // Restore any saved draft synchronously so the form renders correct from the first paint.
    // Lazy initializer keeps localStorage reads out of the render path and SSR-safe.
    const [initialData] = useState((): ContactFormData => {
        const defaults: ContactFormData = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            company_name: '',
            industry: '',
            services: [],
            budget_range: '',
            timeline: '',
            goals_challenges: '',
            preferred_contact_method: '',
            _hp_trap: '',
            _hp_time: '',
        };

        if (typeof window === 'undefined') {
            return defaults;
        }

        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            const parsed = savedData ? (JSON.parse(savedData) as Partial<ContactFormData>) : null;

            return parsed ? { ...defaults, ...parsed } : defaults;
        } catch (e) {
            console.error('Failed to parse wizard draft', e);

            return defaults;
        }
    });

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm(initialData);

    // Stamp the render time once mounted (client-only) for the honeypot timing check.
    useEffect(() => {
        setData('_hp_time', Date.now().toString());
    }, [setData]);

    // Save draft when data changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    // Pull questions and choices dynamically from the loaded database settings,
    // padded with defaults so the four option steps always have options to
    // render — CMS configs with fewer (or empty) questions can't crash the wizard.
    const questions = [
        ...(settings?.discovery_questions ?? []).filter((q) => q.options.length > 0),
        ...DEFAULT_QUESTIONS,
    ].slice(0, 4);

    const handleServiceToggle = (serviceLabel: string) => {
        const updated = data.services.includes(serviceLabel)
            ? data.services.filter((s) => s !== serviceLabel)
            : [...data.services, serviceLabel];
        setData('services', updated);
    };

    const handleNext = () => {
        clearErrors();

        // Validation check for coordinates on step 5
        if (step === 5) {
            if (!data.first_name || !data.email) {
                announce('Please fill in required fields: first name and email', 'assertive');

                return;
            }
        }

        const stepNames = ['Purpose', 'Goals', 'Schedule', 'Capital', 'Details', 'Coordinates'];
        const target = step + 1; // 0-indexed target step
        announce(`Step ${target + 1}: ${stepNames[target] ?? 'Complete'}`, 'polite');
        setStep(target);
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePrev = () => {
        const stepNames = ['Purpose', 'Goals', 'Schedule', 'Capital', 'Details', 'Coordinates'];
        const target = step - 1; // 0-indexed target step
        announce(`Step ${target + 1}: ${stepNames[target] ?? 'Start'}`, 'polite');
        setStep(target);
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                localStorage.removeItem(STORAGE_KEY);
            },
        });
    };

    return (
        <section
            id="contact-form"
            ref={containerRef}
            className="relative z-10 border-t border-white/5 py-16"
        >
            <div className="mx-auto max-w-4xl">
                {/* Visual Step Progress Bar */}
                <div className="relative mb-12 h-[3px] w-full overflow-hidden rounded-none bg-white/5 select-none">
                    <div
                        className="h-full bg-gradient-to-r from-[#2EC4A5] to-[#00D1FF] transition-all duration-300 ease-[var(--ease-out)]"
                        style={{ width: `${((step + 1) / 6) * 100}%` }}
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-none border border-white/5 bg-[#0E1624]/20 p-8 md:p-12"
                >
                    <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 bg-[radial-gradient(circle,_rgba(46,196,165,0.03)_0%,_transparent_75%)] blur-[40px]" />

                    {/* Honeypot Fields */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                        <label htmlFor="_hp_trap">Do not fill this out</label>
                        <input
                            type="text"
                            id="_hp_trap"
                            value={data._hp_trap}
                            onChange={(e) => setData('_hp_trap', e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                        <input type="hidden" name="_hp_time" value={data._hp_time} />
                    </div>

                    <AnimatePresence mode="wait">
                        {/* Step 1: What are you building */}
                        {step === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 select-none">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        Step 01 / Purpose
                                    </span>
                                    <h3 className="typo-heading-m tracking-tight text-white uppercase">
                                        What are you building?
                                    </h3>
                                    <p className="text-xs leading-relaxed font-light text-white/40">
                                        Select all project parameters that align with your digital
                                        requirements.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {questions[0]!.options.map((item: string) => {
                                        const isSelected = data.services.includes(item);

                                        return (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() => handleServiceToggle(item)}
                                                className={`flex items-center justify-between rounded-none border p-4 text-left transition-all duration-200 focus:outline-none ${
                                                    isSelected
                                                        ? 'border-[#2EC4A5] bg-[#0E1624] font-bold text-white shadow-[0_0_12px_rgba(46,196,165,0.15)]'
                                                        : 'bg-surface-raised/60 border-white/5 text-white/50 hover:border-white/20'
                                                }`}
                                            >
                                                <span className="font-mono text-[9px] tracking-wide uppercase">
                                                    {item}
                                                </span>
                                                {isSelected && (
                                                    <Check className="h-3 w-3 text-[#2EC4A5]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Business Goals */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 select-none">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        Step 02 / Goals
                                    </span>
                                    <h3 className="typo-heading-m tracking-tight text-white uppercase">
                                        Select your business objectives
                                    </h3>
                                    <p className="text-xs leading-relaxed font-light text-white/40">
                                        What primary value drivers should this digital product
                                        establish?
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {questions[1]!.options.map((item: string) => {
                                        // Reuse industry field temporarily or save in dynamic parameters
                                        const isSelected = data.industry === item;

                                        return (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() => setData('industry', item)}
                                                className={`flex items-center justify-between rounded-none border p-4 text-left transition-all duration-200 focus:outline-none ${
                                                    isSelected
                                                        ? 'border-[#2EC4A5] bg-[#0E1624] font-bold text-white shadow-[0_0_12px_rgba(46,196,165,0.15)]'
                                                        : 'bg-surface-raised/60 border-white/5 text-white/50 hover:border-white/20'
                                                }`}
                                            >
                                                <span className="font-mono text-[9px] tracking-wide uppercase">
                                                    {item}
                                                </span>
                                                {isSelected && (
                                                    <Check className="h-3 w-3 text-[#2EC4A5]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Timeline */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 select-none">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        Step 03 / Schedule
                                    </span>
                                    <h3 className="typo-heading-m tracking-tight text-white uppercase">
                                        Target Timeline
                                    </h3>
                                    <p className="text-xs leading-relaxed font-light text-white/40">
                                        When do you envision launching or initiating this
                                        architecture?
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {questions[2]!.options.map((time: string) => {
                                        const isSelected = data.timeline === time;

                                        return (
                                            <button
                                                type="button"
                                                key={time}
                                                onClick={() => setData('timeline', time)}
                                                className={`flex items-center justify-between rounded-none border p-4 text-left transition-all duration-200 focus:outline-none ${
                                                    isSelected
                                                        ? 'border-[#2EC4A5] bg-[#0E1624] font-bold text-white shadow-[0_0_12px_rgba(46,196,165,0.15)]'
                                                        : 'bg-surface-raised/60 border-white/5 text-white/50 hover:border-white/20'
                                                }`}
                                            >
                                                <span className="font-mono text-[9px] tracking-wide uppercase">
                                                    {time}
                                                </span>
                                                {isSelected && (
                                                    <Check className="h-3 w-3 text-[#2EC4A5]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Budget Range */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 select-none">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        Step 04 / Capital
                                    </span>
                                    <h3 className="typo-heading-m tracking-tight text-white uppercase">
                                        Budget Allocation
                                    </h3>
                                    <p className="text-xs leading-relaxed font-light text-white/40">
                                        We provide project ranges to map resource scopes correctly.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {questions[3]!.options.map((range: string) => {
                                        const isSelected = data.budget_range === range;

                                        return (
                                            <button
                                                type="button"
                                                key={range}
                                                onClick={() => setData('budget_range', range)}
                                                className={`flex items-center justify-between rounded-none border p-4 text-left transition-all duration-200 focus:outline-none ${
                                                    isSelected
                                                        ? 'border-[#2EC4A5] bg-[#0E1624] font-bold text-white shadow-[0_0_12px_rgba(46,196,165,0.15)]'
                                                        : 'bg-surface-raised/60 border-white/5 text-white/50 hover:border-white/20'
                                                }`}
                                            >
                                                <span className="font-mono text-[9px] tracking-wide uppercase">
                                                    {range}
                                                </span>
                                                {isSelected && (
                                                    <Check className="h-3 w-3 text-[#2EC4A5]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Project Details */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full space-y-6"
                            >
                                <div className="space-y-2 select-none">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        Step 05 / Details
                                    </span>
                                    <h3 className="typo-heading-m tracking-tight text-white uppercase">
                                        Describe the challenge
                                    </h3>
                                    <p className="text-xs leading-relaxed font-light text-white/40">
                                        Detail the primary objectives, constraints, or custom
                                        layouts requirements.
                                    </p>
                                </div>

                                <Textarea
                                    value={data.goals_challenges}
                                    onChange={(e) => setData('goals_challenges', e.target.value)}
                                    placeholder="Explain your goals in your own words..."
                                    rows={5}
                                    className="bg-surface-raised/60 w-full rounded-none border border-white/10 p-4 font-mono text-xs text-white transition-colors focus:border-[#2EC4A5] focus:outline-none"
                                />
                            </motion.div>
                        )}

                        {/* Step 6: Contact coordinates & Preferred Contact method */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 select-none">
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#2EC4A5] uppercase">
                                        Step 06 / Coordinates
                                    </span>
                                    <h3 className="typo-heading-m tracking-tight text-white uppercase">
                                        Your Coordinates
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <Input
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            placeholder="First Name *"
                                            required
                                            className="bg-surface-raised/60 rounded-none border border-white/10 font-mono text-xs text-white"
                                        />
                                        {errors.first_name && (
                                            <p className="font-mono text-[9px] text-red-500">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>
                                    <Input
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        placeholder="Last Name"
                                        className="bg-surface-raised/60 rounded-none border border-white/10 font-mono text-xs text-white"
                                    />
                                    <Input
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="Company Name"
                                        className="bg-surface-raised/60 rounded-none border border-white/10 font-mono text-xs text-white"
                                    />
                                    <Input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="Phone Number (Optional)"
                                        className="bg-surface-raised/60 rounded-none border border-white/10 font-mono text-xs text-white"
                                    />
                                    <div className="space-y-1 md:col-span-2">
                                        <Input
                                            id="contact-email"
                                            name="email"
                                            autoComplete="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Email Address *"
                                            required
                                            className="bg-surface-raised/60 rounded-none border border-white/10 font-mono text-xs text-white"
                                        />
                                        {errors.email && (
                                            <p className="font-mono text-[9px] text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Preferred contact method selector */}
                                    <div className="mt-2 space-y-2 md:col-span-2">
                                        <span className="block font-mono text-[9px] text-white/40 uppercase">
                                            Preferred Communication Mode
                                        </span>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Email', 'Phone', 'Video Call'].map((method) => {
                                                const isSelected =
                                                    data.preferred_contact_method === method;

                                                return (
                                                    <button
                                                        type="button"
                                                        key={method}
                                                        onClick={() =>
                                                            setData(
                                                                'preferred_contact_method',
                                                                method,
                                                            )
                                                        }
                                                        className={`rounded-none border p-3 text-center font-mono text-[9px] tracking-wider uppercase transition-all duration-200 focus:outline-none ${
                                                            isSelected
                                                                ? 'border-[#2EC4A5] bg-[#0E1624] text-white'
                                                                : 'bg-surface-raised/60 border-white/5 text-white/40 hover:border-white/10'
                                                        }`}
                                                    >
                                                        {method}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Step Navigation Controls */}
                    <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 select-none">
                        {step > 0 ? (
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="font-mono text-[9px] tracking-wider text-white/40 uppercase transition-colors hover:text-[#2EC4A5] focus:outline-none"
                            >
                                [ Back ]
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 5 ? (
                            <Button
                                type="button"
                                variant="gradient"
                                size="sm"
                                onClick={handleNext}
                                className="rounded-none font-mono text-[9px] tracking-widest uppercase"
                            >
                                Next Step
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="gradient"
                                size="sm"
                                disabled={processing}
                                className="rounded-none font-mono text-[9px] tracking-widest uppercase"
                            >
                                Initiate Partnership
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}
