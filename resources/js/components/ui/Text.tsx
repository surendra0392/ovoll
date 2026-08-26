import { forwardRef } from 'react';
import { cn } from '@/utils';

type TextVariant =
    | 'display-xl'
    | 'display-l'
    | 'heading-xl'
    | 'heading-l'
    | 'heading-m'
    | 'heading-s'
    | 'body-large'
    | 'body'
    | 'body-small'
    | 'caption'
    | 'label'
    | 'button'
    | 'code'
    // Legacy fallbacks
    | 'display'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle'
    | 'lead'
    | 'small';

const variantStyles: Record<TextVariant, string> = {
    'display-xl': 'typo-display-xl',
    'display-l': 'typo-display-l',
    'heading-xl': 'typo-heading-xl',
    'heading-l': 'typo-heading-l',
    'heading-m': 'typo-heading-m',
    'heading-s': 'typo-heading-s',
    'body-large': 'typo-body-large',
    'body': 'typo-body',
    'body-small': 'typo-body-small',
    'caption': 'typo-caption',
    'label': 'typo-label',
    'button': 'typo-button',
    'code': 'font-mono text-sm bg-muted/50 px-2 py-1 rounded-md text-[#00D1FF]',
    // Legacy maps
    display: 'typo-display-xl',
    h1: 'typo-heading-xl',
    h2: 'typo-heading-l',
    h3: 'typo-heading-m',
    h4: 'typo-heading-s',
    h5: 'typo-heading-s font-semibold',
    h6: 'typo-body font-bold',
    subtitle: 'typo-body-large text-muted-foreground',
    lead: 'typo-body-large text-muted-foreground',
    small: 'typo-body-small text-muted-foreground',
};

const variantElements: Record<TextVariant, keyof React.JSX.IntrinsicElements> = {
    'display-xl': 'h1',
    'display-l': 'h1',
    'heading-xl': 'h2',
    'heading-l': 'h2',
    'heading-m': 'h3',
    'heading-s': 'h4',
    'body-large': 'p',
    'body': 'p',
    'body-small': 'p',
    'caption': 'span',
    'label': 'label',
    'button': 'span',
    'code': 'code',
    // Legacy elements
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle: 'p',
    lead: 'p',
    small: 'span',
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    variant?: TextVariant;
    as?: keyof React.JSX.IntrinsicElements;
    balance?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
    ({ variant = 'body', as, balance = false, className, ...props }, ref) => {
        const Component = (as || variantElements[variant]) as 'div';
        return (
            <Component
                ref={ref as React.Ref<HTMLDivElement>}
                className={cn(variantStyles[variant], balance && 'text-balance', className)}
                {...props}
            />
        );
    }
);

Text.displayName = 'Text';
