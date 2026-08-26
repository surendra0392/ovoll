import React from 'react';
import { useLabStore } from '@/store/useLabStore';
import { LabSidebar } from './LabSidebar';

interface LabLayoutProps {
    children: React.ReactNode;
}

export function LabLayout({ children }: LabLayoutProps) {
    const { toggleSidebar } = useLabStore();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-black font-sans text-white">
            <LabSidebar />

            <main className="relative flex h-full flex-1 flex-col overflow-hidden">
                {/* Minimalist Topbar */}
                <header className="absolute top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-black/50 px-6 backdrop-blur-md">
                    <button
                        onClick={toggleSidebar}
                        className="-ml-2 rounded-md p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4 text-sm font-medium text-white/50">
                        <span className="cursor-pointer transition-colors hover:text-white">
                            Documentation
                        </span>
                        <span className="cursor-pointer transition-colors hover:text-white">
                            Settings
                        </span>
                    </div>
                </header>

                {/* Content Area */}
                <div className="mt-16 flex-1 overflow-y-auto bg-[#050505]">{children}</div>
            </main>
        </div>
    );
}
