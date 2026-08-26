import { cn } from '@/utils';
import { Container } from './Container';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

export function PageHeader({
    title,
    description,
    align = 'left',
    className,
    ...props
}: PageHeaderProps) {
    return (
        <div className={cn('py-16 md:py-24', className)} {...props}>
            <Container>
                <div
                    className={cn(
                        'flex flex-col gap-4',
                        align === 'center' ? 'items-center text-center' : 'items-start text-left'
                    )}
                >
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground">
                        {title}
                    </h1>
                    {description && (
                        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                            {description}
                        </p>
                    )}
                </div>
            </Container>
        </div>
    );
}
