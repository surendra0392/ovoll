import { useId } from 'react';
import { cn } from '@/utils';
import { Label } from './Label';

export interface FormFieldProps {
    label?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    className?: string;
    children: React.ReactNode;
    htmlFor?: string;
}

export function FormField({ label, error, helperText, required, className, children, htmlFor }: FormFieldProps) {
    const generatedId = useId();
    const fieldId = htmlFor ?? generatedId;

    return (
        <div className={cn('space-y-1.5', className)}>
            {label && (
                <Label htmlFor={fieldId}>
                    {label}
                    {required && <span className="ml-0.5 text-danger">*</span>}
                </Label>
            )}

            {children}

            {error && (
                <p className="text-sm text-danger" role="alert">
                    {error}
                </p>
            )}

            {!error && helperText && (
                <p className="text-sm text-muted-foreground">
                    {helperText}
                </p>
            )}
        </div>
    );
}

FormField.displayName = 'FormField';
