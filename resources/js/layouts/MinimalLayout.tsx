export function MinimalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background text-foreground flex min-h-screen flex-col">
            <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
        </div>
    );
}
