export function SkipLink() {
    return (
        <a
            href="#main"
            className="bg-primary text-primary-foreground fixed top-4 left-4 z-[9999] -translate-y-[150%] rounded-md px-4 py-2 opacity-0 shadow-sm transition focus:translate-y-0 focus:opacity-100"
        >
            Skip to main content
        </a>
    );
}
