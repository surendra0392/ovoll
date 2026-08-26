import React from 'react';

export const BRAND = {
    teal: '#14B8A6',
    cyan: '#00D1FF',
    deepSpace: '#081320',
};

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: 'default' | 'monochrome' | 'white' | 'wordmark';
    animated?: boolean;
}

export function Logo({ className = '', variant = 'default', ...props }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 select-none ${className}`} {...props}>
            <div className="relative flex h-8 w-8 items-center justify-center shrink-0">
                {/* Outer boundary ring */}
                <div className="absolute inset-0 rounded-full border border-[#00D1FF]/30" />
                {/* Middle dashed orbit ring */}
                <div className="absolute h-6 w-6 rounded-full border border-dashed border-[#14B8A6] animate-[spin_10s_linear_infinite]" />
                {/* Inner core */}
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] animate-pulse" />
            </div>
            <span className="font-sans text-xl font-bold tracking-widest text-white transition-colors duration-300 group-hover:text-[#00D1FF] md:text-2xl">
                OVOLL
            </span>
        </div>
    );
}

export function LogoWithText({
    className = '',
    variant = 'default',
    ...props
}: LogoProps) {
    return (
        <div className={`flex flex-col items-center justify-center text-center ${className}`} {...props}>
            <div className="relative flex h-14 w-14 items-center justify-center mb-4 shrink-0">
                {/* Outer boundary ring */}
                <div className="absolute inset-0 rounded-full border border-[#00D1FF]/30 scale-110" />
                {/* Middle dashed orbit ring */}
                <div className="absolute h-10 w-10 rounded-full border border-dashed border-[#14B8A6] animate-[spin_12s_linear_infinite]" />
                {/* Inner core */}
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#00D1FF] animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-widest md:text-2xl text-white leading-tight">
                OVOLL
            </span>
            <span className="text-[0.5rem] font-semibold tracking-[0.2em] text-[#14B8A6] uppercase md:text-xs mt-1">
                Build Better Brands
            </span>
        </div>
    );
}
