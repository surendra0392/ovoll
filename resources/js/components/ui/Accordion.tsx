import { useState } from 'react';
import { cn } from '@/utils';

interface AccordionItem {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpen?: string[];
}

export function Accordion({ items, allowMultiple = false, defaultOpen = [], className, ...props }: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
        } else {
            setOpenItems((prev) => prev.includes(id) ? [] : [id]);
        }
    };

    return (
        <div className={cn('divide-y divide-white/10 border-t border-b border-white/10 bg-transparent overflow-hidden', className)} {...props}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id);
                return (
                    <div key={item.id} className="group/item overflow-hidden">
                        <button
                            id={`accordion-button-${item.id}`}
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                                "flex w-full items-center justify-between px-0 py-5 text-left text-sm font-semibold transition-all duration-260 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:bg-[#2EC4A5]/5",
                                isOpen ? "text-[#00D1FF] bg-transparent" : "text-white/70 hover:bg-[#2EC4A5]/3 hover:text-white"
                            )}
                            aria-expanded={isOpen}
                            aria-controls={`accordion-${item.id}`}
                        >
                            <span className="relative z-10">{item.title}</span>
                            <svg 
                                className={cn('h-4 w-4 shrink-0 transition-transform duration-260 ease-[var(--ease-out)]', isOpen ? 'rotate-180 text-[#00D1FF]' : 'text-white/40 group-hover/item:text-white')} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth="2.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div 
                            id={`accordion-${item.id}`} 
                            role="region" 
                            aria-labelledby={`accordion-button-${item.id}`} 
                            className={cn('transition-all duration-260 ease-[var(--ease-out)] overflow-hidden', isOpen ? 'max-h-[500px] opacity-100 bg-transparent' : 'max-h-0 opacity-0')}
                        >
                            <div className="px-6 pb-6 pt-3 text-sm text-white/50 leading-relaxed font-medium">
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
