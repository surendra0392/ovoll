import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { announce } from '@/components/a11y/Announcer';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { PageBreadcrumbs } from '@/components/navigation/PageBreadcrumbs';
import { SeoHead } from '@/components/seo/SeoHead';
import { Text, Glass } from '@/components/ui';

import { cn } from '@/utils';
import { EventTracker } from '@/utils/EventTracker';

// Define ROI Calculators
interface RoiState {
    traffic: number;
    convRate: number;
    avgValue: number;
}

// Define Estimator checklist items
interface EstimatorItem {
    id: string;
    label: string;
    baseCost: number;
    minDays: number;
}

interface EstimatorDetails {
    selected_items: string[];
    estimated_investment: string;
    estimated_duration: string;
    roi_metrics: {
        monthly_uplift: string;
        annual_uplift: string;
    };
}

interface WizardForm {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    company_size: string;
    industry: string;
    services: string[];
    budget_range: string;
    timeline: string;
    goals_challenges: string;
    estimator_details: EstimatorDetails;
}

const ESTIMATOR_ITEMS: EstimatorItem[] = [
    { id: 'branding', label: 'Brand Identity Systems', baseCost: 15000, minDays: 30 },
    { id: 'web', label: 'Vite / React Frontend', baseCost: 20000, minDays: 45 },
    { id: 'laravel', label: 'Laravel Backend & APIs', baseCost: 25000, minDays: 60 },
    { id: 'cms', label: 'Filament CMS Integration', baseCost: 10000, minDays: 20 },
    { id: 'ai', label: 'Custom AI & Chatbots', baseCost: 30000, minDays: 40 },
    { id: 'seo', label: 'Advanced SEO & Analytics', baseCost: 8000, minDays: 15 },
];

interface DiscoverProps {
    page?: { content?: { hero?: Record<string, string> } } | null;
}

export default function Discover({ page = null }: DiscoverProps) {
    const hero = page?.content?.hero ?? {};
    // ----------------------------------------------------
    // Local State
    // ----------------------------------------------------
    const [wizardStep, setWizardStep] = useState(0);
    const [roi, setRoi] = useState<RoiState>({ traffic: 50000, convRate: 1.2, avgValue: 150 });
    const [selectedEstimatorItems, setSelectedEstimatorItems] = useState<string[]>([]);
    const [showExitIntent, setShowExitIntent] = useState(false);
    const [hasFiredExitIntent, setHasFiredExitIntent] = useState(false);

    // ----------------------------------------------------
    // Inertia Form Setup
    // ----------------------------------------------------
    const { data, setData, post, processing, wasSuccessful, reset } = useForm<WizardForm>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_name: '',
        company_size: '1-10',
        industry: '',
        services: [],
        budget_range: '₹10,00,000 - ₹25,00,000',
        timeline: 'Short-term (1-3 months)',
        goals_challenges: '',
        estimator_details: {
            selected_items: [],
            estimated_investment: '',
            estimated_duration: '',
            roi_metrics: {
                monthly_uplift: '',
                annual_uplift: '',
            },
        },
    });

    // ----------------------------------------------------
    // Auto-Save Logic (Local Storage)
    // ----------------------------------------------------
    useEffect(() => {
        const savedData = localStorage.getItem('ovoll_wizard_draft');

        if (savedData) {
            try {
                const parsed = JSON.parse(savedData) as Partial<WizardForm>;
                // Restore form data — merge over defaults so every field exists
                setData((prev) => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error('Failed to parse wizard draft', e);
            }
        }

        EventTracker.trackFormStart('Project Discovery Wizard');
    }, [setData]);

    const saveDraft = (currentFormState: typeof data) => {
        localStorage.setItem('ovoll_wizard_draft', JSON.stringify(currentFormState));
    };

    const handleFormChange = (field: keyof WizardForm, value: WizardForm[keyof WizardForm]) => {
        setData((prev) => ({ ...prev, [field]: value }));
        // Queue draft save
        const updated = { ...data, [field]: value };
        saveDraft(updated);
    };

    // ----------------------------------------------------
    // Exit Intent Handler
    // ----------------------------------------------------
    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 30 && !hasFiredExitIntent) {
                setShowExitIntent(true);
                setHasFiredExitIntent(true);
                EventTracker.trackExitIntentTriggered();
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasFiredExitIntent]);

    // ----------------------------------------------------
    // Estimator Calculations
    // ----------------------------------------------------
    const toggleEstimatorItem = (id: string) => {
        setSelectedEstimatorItems((prev) => {
            const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
            EventTracker.trackEstimatorSelected(id, next.includes(id));

            // Sync with wizard form services array
            handleFormChange('services', next);

            return next;
        });
    };

    const calculateEstimate = () => {
        let cost = 0;
        let days = 0;
        selectedEstimatorItems.forEach((id) => {
            const item = ESTIMATOR_ITEMS.find((x) => x.id === id);

            if (item) {
                cost += item.baseCost;
                days = Math.max(days, item.minDays);
            }
        });

        // Add buffering
        return {
            minInvestment: cost,
            maxInvestment: Math.round(cost * 1.3),
            minDuration: days,
            maxDuration: days + 15,
        };
    };

    const estimate = calculateEstimate();

    // ----------------------------------------------------
    // ROI Calculations
    // ----------------------------------------------------
    const calculateRoi = () => {
        const currentRevenue = roi.traffic * (roi.convRate / 100) * roi.avgValue;
        // Assume OVOLL optimizes conversion rate by 1.5x on average
        const targetConvRate = roi.convRate * 1.5;
        const targetRevenue = roi.traffic * (targetConvRate / 100) * roi.avgValue;
        const monthlyUplift = targetRevenue - currentRevenue;
        const annualUplift = monthlyUplift * 12;

        return {
            currentRevenue,
            targetRevenue,
            monthlyUplift,
            annualUplift,
        };
    };

    const roiCalculations = calculateRoi();

    const handleRoiSliderChange = (field: keyof RoiState, val: number) => {
        setRoi((prev) => {
            const next = { ...prev, [field]: val };
            EventTracker.trackCalculatorChange('ROI Calculator', next);

            return next;
        });
    };

    // ----------------------------------------------------
    // Wizard Form Navigation
    // ----------------------------------------------------
    const nextStep = () => {
        setWizardStep((prev) => {
            const next = Math.min(prev + 1, 2);
            EventTracker.trackStepChange('Project Discovery Wizard', next, `Step ${next + 1}`);
            const stepLabels = ['Contact Info', 'Scope & Budget', 'Project Brief'];
            announce(`Moving to step ${next + 1}: ${stepLabels[next] ?? 'Complete'}`, 'polite');

            return next;
        });
    };

    const prevStep = () => {
        setWizardStep((prev) => {
            const next = Math.max(prev - 1, 0);
            const stepLabels = ['Contact Info', 'Scope & Budget', 'Project Brief'];
            announce(`Returning to step ${next + 1}: ${stepLabels[next] ?? 'Start'}`, 'polite');

            return next;
        });
    };

    const submitWizard = (e: React.FormEvent) => {
        e.preventDefault();

        // Inject estimator details
        const details = {
            selected_items: selectedEstimatorItems,
            estimated_investment: `₹${estimate.minInvestment.toLocaleString('en-IN')} - ₹${estimate.maxInvestment.toLocaleString('en-IN')}`,
            estimated_duration: `${estimate.minDuration}-${estimate.maxDuration} Days`,
            roi_metrics: {
                monthly_uplift: `₹${roiCalculations.monthlyUplift.toLocaleString('en-IN')}`,
                annual_uplift: `₹${roiCalculations.annualUplift.toLocaleString('en-IN')}`,
            },
        };

        setData('estimator_details', details);

        post('/leads', {
            onSuccess: () => {
                localStorage.removeItem('ovoll_wizard_draft');
                reset();
                setSelectedEstimatorItems([]);
                setWizardStep(0);
                EventTracker.trackFormComplete('Project Discovery Wizard', 100);
            },
        });
    };

    return (
        <>
            <SeoHead title="Discovery & Project Estimator — OVOLL" />
            <CustomCursor />

            <PageBreadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Services', href: '/services' },
                    { label: 'Discover' },
                ]}
            />

            <div className="bg-surface-raised relative min-h-screen overflow-hidden px-6 pt-6 pb-24 font-sans text-white">
                {/* Background glow matrix */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03)_0%,_transparent_60%)]" />

                <div className="relative z-10 mx-auto max-w-6xl space-y-24">
                    {/* Header */}
                    <div className="mx-auto max-w-3xl space-y-4 text-center">
                        <Text
                            variant="caption"
                            className="font-mono tracking-widest text-white/40 uppercase"
                        >
                            {hero.badge || 'Conversion Engine'}
                        </Text>
                        <Text
                            variant="h1"
                            className="text-4xl leading-none font-bold tracking-tighter md:text-6xl"
                        >
                            {hero.titleLead || 'Project Discovery Suite'}
                        </Text>
                        <Text variant="body" className="text-lg text-white/60">
                            {hero.subtitle ||
                                'Evaluate return on investment, configure scopes, and validate your business goals.'}
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* LEFT & CENTER: Estimator & ROI Calculator */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* ROI Calculator */}
                            <Glass className="space-y-6 rounded-2xl border border-white/5 p-8">
                                <div className="space-y-2">
                                    <Text
                                        variant="h4"
                                        className="font-bold tracking-tight text-white"
                                    >
                                        ROI Lift Calculator
                                    </Text>
                                    <Text variant="body" className="text-sm text-white/50">
                                        Calculate potential revenue growth assuming a standard OVOLL
                                        1.5x conversion lift.
                                    </Text>
                                </div>

                                <div className="space-y-6">
                                    {/* Traffic slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between font-mono text-xs text-white/50">
                                            <span>Monthly Traffic</span>
                                            <span className="text-white">
                                                {roi.traffic.toLocaleString()} Visits
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="5000"
                                            max="500000"
                                            step="5000"
                                            value={roi.traffic}
                                            onChange={(e) =>
                                                handleRoiSliderChange(
                                                    'traffic',
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-white"
                                        />
                                    </div>

                                    {/* Conversion Rate slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between font-mono text-xs text-white/50">
                                            <span>Conversion Rate</span>
                                            <span className="text-white">{roi.convRate}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="10"
                                            step="0.1"
                                            value={roi.convRate}
                                            onChange={(e) =>
                                                handleRoiSliderChange(
                                                    'convRate',
                                                    parseFloat(e.target.value),
                                                )
                                            }
                                            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-white"
                                        />
                                    </div>

                                    {/* Avg Order Value slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between font-mono text-xs text-white/50">
                                            <span>Average Order Value (AOV)</span>
                                            <span className="text-white">
                                                ₹{roi.avgValue.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="10"
                                            max="1000"
                                            step="10"
                                            value={roi.avgValue}
                                            onChange={(e) =>
                                                handleRoiSliderChange(
                                                    'avgValue',
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-center">
                                    <div className="rounded-xl bg-white/[0.02] p-4">
                                        <div className="mb-1 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                            Monthly Growth Lift
                                        </div>
                                        <div className="text-2xl font-bold tracking-tight text-white">
                                            ₹
                                            {Math.round(
                                                roiCalculations.monthlyUplift,
                                            ).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.02] p-4">
                                        <div className="mb-1 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                            Annual Revenue Lift
                                        </div>
                                        <div className="text-2xl font-bold tracking-tight text-white">
                                            ₹
                                            {Math.round(
                                                roiCalculations.annualUplift,
                                            ).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                            </Glass>

                            {/* Project Estimator */}
                            <Glass className="space-y-6 rounded-2xl border border-white/5 p-8">
                                <div className="space-y-2">
                                    <Text
                                        variant="h4"
                                        className="font-bold tracking-tight text-white"
                                    >
                                        Project Scope Estimator
                                    </Text>
                                    <Text variant="body" className="text-sm text-white/50">
                                        Select key system layers to instantly view estimated budgets
                                        and engineering timelines.
                                    </Text>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {ESTIMATOR_ITEMS.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => toggleEstimatorItem(item.id)}
                                            className={cn(
                                                'flex items-center justify-between rounded-xl border p-4 text-left transition-all',
                                                selectedEstimatorItems.includes(item.id)
                                                    ? 'border-white bg-white/5'
                                                    : 'border-white/5 bg-white/[0.01] hover:border-white/10',
                                            )}
                                        >
                                            <div className="space-y-1">
                                                <div className="text-sm font-semibold">
                                                    {item.label}
                                                </div>
                                                <div className="font-mono text-[10px] text-white/40">
                                                    From ₹{item.baseCost.toLocaleString('en-IN')}
                                                </div>
                                            </div>
                                            <div
                                                className={cn(
                                                    'flex h-4 w-4 items-center justify-center rounded-full border transition-colors',
                                                    selectedEstimatorItems.includes(item.id)
                                                        ? 'text-surface-raised border-white bg-white'
                                                        : 'border-white/20',
                                                )}
                                            >
                                                {selectedEstimatorItems.includes(item.id) && (
                                                    <span className="text-[10px] font-bold">✓</span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {selectedEstimatorItems.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-center">
                                        <div className="rounded-xl bg-white/[0.02] p-4">
                                            <div className="mb-1 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                                Estimated Investment
                                            </div>
                                            <div className="text-xl font-bold tracking-tight text-white md:text-2xl">
                                                ₹{estimate.minInvestment.toLocaleString('en-IN')} -
                                                ₹{estimate.maxInvestment.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-white/[0.02] p-4">
                                            <div className="mb-1 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                                Estimated Timeline
                                            </div>
                                            <div className="text-xl font-bold tracking-tight text-white md:text-2xl">
                                                {estimate.minDuration} - {estimate.maxDuration} Days
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Glass>
                        </div>

                        {/* RIGHT COLUMN: Discovery Wizard Form */}
                        <div className="lg:col-span-1">
                            <Glass className="sticky top-24 space-y-6 rounded-2xl border border-white/5 p-8">
                                <div className="space-y-1">
                                    <Text
                                        variant="h4"
                                        className="font-bold tracking-tight text-white"
                                    >
                                        Discovery Wizard
                                    </Text>
                                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                                        <div
                                            className="h-full bg-white transition-all duration-300"
                                            style={{ width: `${((wizardStep + 1) / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {wasSuccessful ? (
                                    <div className="space-y-4 py-12 text-center">
                                        <div className="text-surface-raised mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold">
                                            ✓
                                        </div>
                                        <Text variant="h5" className="font-bold">
                                            Brief Submitted!
                                        </Text>
                                        <Text
                                            variant="body"
                                            className="text-xs leading-relaxed text-white/60"
                                        >
                                            We have saved your details. Our strategist team will
                                            review the parameters and contact you shortly.
                                        </Text>
                                    </div>
                                ) : (
                                    <form onSubmit={submitWizard} className="space-y-6">
                                        {/* Step 1: Contact info */}
                                        {wizardStep === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Contact Name
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="First"
                                                            value={data.first_name}
                                                            onChange={(e) =>
                                                                handleFormChange(
                                                                    'first_name',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-white/30 focus:outline-none"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Last"
                                                            value={data.last_name}
                                                            onChange={(e) =>
                                                                handleFormChange(
                                                                    'last_name',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-white/30 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        id="discover-email"
                                                        name="email"
                                                        autoComplete="email"
                                                        type="email"
                                                        required
                                                        placeholder="you@company.com"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-white/30 focus:outline-none"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Company Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Acme Corp"
                                                        value={data.company_name}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'company_name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-white/30 focus:outline-none"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 2: Scope info */}
                                        {wizardStep === 1 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Company Size
                                                    </label>
                                                    <select
                                                        value={data.company_size}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'company_size',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                                                    >
                                                        <option value="1-10">
                                                            1 - 10 Employees
                                                        </option>
                                                        <option value="10-100">
                                                            10 - 100 Employees
                                                        </option>
                                                        <option value="100+">100+ Employees</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Target Budget
                                                    </label>
                                                    <select
                                                        value={data.budget_range}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'budget_range',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                                                    >
                                                        <option value="Under ₹10,00,000">
                                                            Under ₹10,00,000
                                                        </option>
                                                        <option value="₹10,00,000 - ₹25,00,000">
                                                            ₹10,00,000 - ₹25,00,000
                                                        </option>
                                                        <option value="₹25,00,000 - ₹50,00,000">
                                                            ₹25,00,000 - ₹50,00,000
                                                        </option>
                                                        <option value="₹50,00,000+ (Enterprise)">
                                                            ₹50,00,000+ (Enterprise)
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Launch Timeline
                                                    </label>
                                                    <select
                                                        value={data.timeline}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'timeline',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-white/30 focus:outline-none"
                                                    >
                                                        <option value="Immediate (1 month)">
                                                            Immediate (1 month)
                                                        </option>
                                                        <option value="Short-term (1-3 months)">
                                                            Short-term (1-3 months)
                                                        </option>
                                                        <option value="Flexible (3+ months)">
                                                            Flexible (3+ months)
                                                        </option>
                                                    </select>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Step 3: Brief detail */}
                                        {wizardStep === 2 && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <label className="font-mono text-[10px] text-white/50 uppercase">
                                                        Project Goals & Challenges
                                                    </label>
                                                    <textarea
                                                        rows={5}
                                                        placeholder="Describe target business objectives, challenges, or scope needs..."
                                                        value={data.goals_challenges}
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'goals_challenges',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-white/30 focus:outline-none"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex justify-between border-t border-white/5 pt-4">
                                            {wizardStep > 0 ? (
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="rounded-xl px-4 py-2 font-mono text-xs text-white/60 uppercase transition-colors hover:text-white"
                                                >
                                                    Back
                                                </button>
                                            ) : (
                                                <div />
                                            )}

                                            {wizardStep < 2 ? (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="text-surface-raised rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase"
                                                >
                                                    Continue
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="text-surface-raised rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase disabled:opacity-50"
                                                >
                                                    {processing ? 'Submitting...' : 'Submit Brief'}
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                )}
                            </Glass>
                        </div>
                    </div>
                </div>
            </div>

            {/* EXIT INTENT DIALOG MODAL */}
            <AnimatePresence>
                {showExitIntent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                        {/* Backdrop */}
                        <div
                            onClick={() => setShowExitIntent(false)}
                            className="bg-surface-raised/80 absolute inset-0 backdrop-blur-md"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 w-full max-w-md space-y-6 rounded-2xl border border-white/10 bg-neutral-950 p-8 text-center shadow-2xl"
                        >
                            <div className="space-y-2">
                                <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                    Exclusive Gift
                                </span>
                                <Text variant="h3" className="font-bold tracking-tight text-white">
                                    Free Growth Audit
                                </Text>
                                <Text
                                    variant="body"
                                    className="text-sm leading-relaxed text-white/60"
                                >
                                    Before you leave, grab our elite **Web & Brand Audit
                                    Checksheet** to analyze performance leaks on your existing
                                    systems.
                                </Text>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href="/downloads/audit-checksheet.pdf"
                                    onClick={() => {
                                        setShowExitIntent(false);
                                        EventTracker.trackCtaClick(
                                            'Download Audit Guide',
                                            'Exit Intent Modal',
                                        );
                                    }}
                                    className="text-surface-raised block w-full rounded-xl bg-white py-3 font-mono text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-neutral-200"
                                >
                                    Download Checksheet (PDF)
                                </a>
                                <button
                                    onClick={() => setShowExitIntent(false)}
                                    className="font-mono text-xs tracking-wider text-white/40 uppercase transition-colors hover:text-white/80"
                                >
                                    No thanks, I\'ll explore later
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* FLOATING WHATSAPP CTA */}
            <a
                href="https://wa.me/1234567890?text=Hi%20OVOLL,%20I'd%20like%20to%20discuss%20a%20new%20digital%20project."
                target="_blank"
                rel="noreferrer"
                onClick={() => EventTracker.trackCtaClick('WhatsApp Widget', 'Floating CTA')}
                className="fixed right-6 bottom-6 z-40 flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-transform hover:scale-105"
            >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.745 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.013-5.091-2.859-6.937C16.5 1.993 14.04 1.945 11.66 1.945c-5.437 0-9.863 4.414-9.866 9.831-.001 1.962.518 3.878 1.503 5.589L2.25 21.03l4.397-1.876z" />
                </svg>
            </a>
        </>
    );
}
