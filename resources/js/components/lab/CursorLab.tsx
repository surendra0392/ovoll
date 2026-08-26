import { Text } from '@/components/ui';

export function CursorLab() {
    return (
        <div className="mx-auto max-w-7xl p-8">
            <Text variant="h2" className="mb-8 text-white">
                Cursor Lab
            </Text>
            <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Text variant="h5" className="text-white/40">
                    Lab provisioning in progress...
                </Text>
            </div>
        </div>
    );
}
