// Lab Imports
import { ButtonLab } from '@/components/dev/labs/ButtonLab';
import { CardLab } from '@/components/dev/labs/CardLab';
import { FormLab } from '@/components/dev/labs/FormLab';
import { PremiumLab } from '@/components/dev/labs/PremiumLab';
import { TypographyLab } from '@/components/dev/labs/TypographyLab';
import { Text } from '@/components/ui';
import { PlaygroundLayout } from '@/layouts/PlaygroundLayout';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';

export default function Playground() {
    const { activeLab } = usePlaygroundStore();

    const renderLab = () => {
        switch (activeLab) {
            case 'typography':
                return <TypographyLab />;
            case 'buttons':
                return <ButtonLab />;
            case 'forms':
                return <FormLab />;
            case 'cards':
                return <CardLab />;
            case 'premium-animations':
                return <PremiumLab />;
            default:
                return (
                    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
                        <svg
                            className="text-muted-foreground/50 h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                        </svg>
                        <Text variant="h5" className="text-muted-foreground">
                            Lab Not Implemented
                        </Text>
                        <Text variant="body" className="text-muted-foreground">
                            The {activeLab} lab is currently under construction.
                        </Text>
                    </div>
                );
        }
    };

    return (
        <PlaygroundLayout title={`Dev UI - ${activeLab}`}>
            <div className="bg-background border-border h-full w-full overflow-y-auto rounded-lg border p-6 shadow-sm">
                {renderLab()}
            </div>
        </PlaygroundLayout>
    );
}
