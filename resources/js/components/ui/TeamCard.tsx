import { cn } from '@/utils';

interface TeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    role: string;
    image?: string;
    socials?: { label: string; href: string }[];
}

export function TeamCard({ name, role, image, socials, className, ...props }: TeamCardProps) {
    return (
        <div className={cn('group text-center', className)} {...props}>
            <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-2xl bg-muted transition-transform duration-300 group-hover:scale-[1.03]">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-muted-foreground">
                        {name.charAt(0)}
                    </div>
                )}
            </div>
            <h3 className="text-base font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
            {socials && socials.length > 0 && (
                <div className="mt-3 flex justify-center gap-3">
                    {socials.map((s) => (
                        <a key={s.label} href={s.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors" aria-label={s.label} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    ))}
                </div>
            )}
        </div>
    );
}
