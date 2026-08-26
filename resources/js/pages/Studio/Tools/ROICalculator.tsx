import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function ROICalculator() {
    const [investment, setInvestment] = useState<number>(5000);
    const [revenue, setRevenue] = useState<number>(12000);
    const [timeframe, setTimeframe] = useState<number>(12); // months

    const profit = revenue - investment;
    const roi = investment > 0 ? (profit / investment) * 100 : 0;
    const annualizedRoi = timeframe > 0 ? roi * (12 / timeframe) : 0;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

    return (
        <div className="mx-auto max-w-4xl space-y-10">
            {/* Results Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-primary mb-2 text-sm font-medium">Net Profit</span>
                    <span className="text-foreground text-4xl font-bold">
                        {formatCurrency(profit)}
                    </span>
                </Card>
                <Card className="flex flex-col items-center justify-center border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                    <span className="mb-2 text-sm font-medium text-emerald-500">Total ROI</span>
                    <span className="text-foreground text-4xl font-bold">{roi.toFixed(1)}%</span>
                </Card>
                <Card className="flex flex-col items-center justify-center border-blue-500/20 bg-blue-500/5 p-6 text-center">
                    <span className="mb-2 text-sm font-medium text-blue-500">Annualized ROI</span>
                    <span className="text-foreground text-4xl font-bold">
                        {annualizedRoi.toFixed(1)}%
                    </span>
                </Card>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="space-y-3">
                    <Label>Total Investment (₹)</Label>
                    <Input
                        type="number"
                        min={0}
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        size="lg"
                    />
                    <p className="text-muted-foreground text-xs">
                        The total cost of the project, marketing campaign, or asset.
                    </p>
                </div>
                <div className="space-y-3">
                    <Label>Total Revenue Generated (₹)</Label>
                    <Input
                        type="number"
                        min={0}
                        value={revenue}
                        onChange={(e) => setRevenue(Number(e.target.value))}
                        size="lg"
                    />
                    <p className="text-muted-foreground text-xs">
                        The total income directly attributed to the investment.
                    </p>
                </div>
                <div className="space-y-3">
                    <Label>Timeframe (Months)</Label>
                    <Input
                        type="number"
                        min={1}
                        value={timeframe}
                        onChange={(e) => setTimeframe(Number(e.target.value))}
                        size="lg"
                    />
                    <p className="text-muted-foreground text-xs">
                        Used to calculate the annualized return rate.
                    </p>
                </div>
            </div>

            {/* Insight */}
            <div className="bg-muted text-foreground flex gap-4 rounded-2xl p-6 text-sm">
                <div className="bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl">
                    💡
                </div>
                <div>
                    <strong className="mb-1 block">ROI Analysis</strong>
                    {roi > 100 ? (
                        <p>
                            Excellent return. You are earning back more than double your initial
                            investment. Consider scaling this strategy if capacity allows.
                        </p>
                    ) : roi > 0 ? (
                        <p>
                            Positive return. You are profitable, earning {roi.toFixed(1)}% on your
                            capital. Optimize costs to push margins higher.
                        </p>
                    ) : roi === 0 ? (
                        <p>
                            Break-even. You recovered your costs but generated no profit.
                            Re-evaluate the strategy.
                        </p>
                    ) : (
                        <p>
                            Negative return. You are operating at a loss. Review your customer
                            acquisition cost (CAC) and conversion rates immediately.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
