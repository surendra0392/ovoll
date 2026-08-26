import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface CounterProps extends React.HTMLAttributes<HTMLSpanElement> {
    from?: number;
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export function Counter({ from = 0, to, duration = 2000, prefix = '', suffix = '', decimals = 0, className, ...props }: CounterProps) {
    const [count, setCount] = useState(from);
    const ref = useRef<HTMLSpanElement>(null);
    const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [entry?.isIntersecting, from, to, duration]);

    return (
        <span ref={ref} className={cn('tabular-nums', className)} {...props}>
            {prefix}{count.toFixed(decimals)}{suffix}
        </span>
    );
}
