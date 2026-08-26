import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

function describe(expr: string): string {
    const parts = expr.trim().split(/\s+/);

    if (parts.length !== 5) {
        return 'Expecting 5 fields: minute hour day-of-month month day-of-week';
    }

    const [min = '*', hour = '*', dom = '*', mon = '*', dow = '*'] = parts;
    const at =
        min === '*' && hour === '*'
            ? 'every minute'
            : `at ${hour === '*' ? 'every hour' : hour.padStart(2, '0')}:${
                  min === '*' ? '00' : min.padStart(2, '0')
              }`;
    const days = dow === '*' ? 'every day' : `on weekday ${dow}`;
    const monthly = dom === '*' ? '' : ` on day ${dom} of the month`;
    const months = mon === '*' ? '' : ` in month ${mon}`;

    return `Runs ${at}, ${days}${monthly}${months}.`;
}

function nextRuns(expr: string): string[] {
    const parts = expr.trim().split(/\s+/);

    if (parts.length !== 5) {
        return [];
    }

    const [min, hour] = parts;
    const results: string[] = [];
    const now = new Date();
    const cursor = new Date(now.getTime());
    cursor.setSeconds(0, 0);
    let guard = 0;

    while (results.length < 5 && guard < 100000) {
        guard++;
        cursor.setMinutes(cursor.getMinutes() + 1);
        const mOk = min === '*' || Number(min) === cursor.getMinutes();
        const hOk = hour === '*' || Number(hour) === cursor.getHours();

        if (mOk && hOk) {
            results.push(cursor.toLocaleString());
        }
    }

    return results;
}

export default function CronExpressionBuilder() {
    const [expr, setExpr] = useState('0 9 * * 1');

    const description = useMemo(() => describe(expr), [expr]);
    const runs = useMemo(() => nextRuns(expr), [expr]);

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5 text-left">
            <div className="space-y-2">
                <Label className="text-xs tracking-wider text-white/70 uppercase">
                    Cron Expression
                </Label>
                <Input
                    value={expr}
                    onChange={(e) => setExpr(e.target.value)}
                    className="font-mono text-sm"
                />
                <div className="flex gap-2 font-mono text-[9px] text-white/30">
                    <span>min</span>
                    <span>hour</span>
                    <span>day-of-month</span>
                    <span>month</span>
                    <span>day-of-week</span>
                </div>
            </div>

            <div className="border border-[#2EC4A5]/20 bg-[#2EC4A5]/5 p-4 text-sm text-white/80">
                {description}
            </div>

            {runs.length > 0 && (
                <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-widest text-[#00D1FF] uppercase">
                        Next runs
                    </span>
                    {runs.map((r, i) => (
                        <div
                            key={i}
                            className="bg-surface-raised/60 border border-white/5 px-3 py-1.5 font-mono text-[11px] text-white/60"
                        >
                            {r}
                        </div>
                    ))}
                </div>
            )}
            <p className="font-mono text-[10px] text-white/40">
                Day-of-month and day-of-week are OR-ed, not AND-ed — a classic trap.
            </p>
        </div>
    );
}
