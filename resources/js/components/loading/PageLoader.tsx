import { Spinner } from './Spinner';

export function PageLoader() {
    return (
        <div className="bg-surface-raised/90 fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-md">
            <Spinner size="lg" />
        </div>
    );
}
