import { create } from 'zustand';

export type Breakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'ultrawide';
export type Theme = 'light' | 'dark' | 'system';

interface PlaygroundState {
    // Layout & Navigation
    activeLab: string;
    setActiveLab: (lab: string) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;

    // View Controls
    breakpoint: Breakpoint;
    setBreakpoint: (bp: Breakpoint) => void;

    // Global Toggles
    theme: Theme;
    setTheme: (theme: Theme) => void;
    showGrid: boolean;
    setShowGrid: (show: boolean) => void;
    showBaseline: boolean;
    setShowBaseline: (show: boolean) => void;
    showBorders: boolean;
    setShowBorders: (show: boolean) => void;
    reduceMotion: boolean;
    setReduceMotion: (reduce: boolean) => void;
    rtl: boolean;
    setRtl: (rtl: boolean) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
    // Layout
    activeLab: 'typography',
    setActiveLab: (lab) => set({ activeLab: lab }),
    sidebarOpen: true,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),

    // View Controls
    breakpoint: 'desktop',
    setBreakpoint: (bp) => set({ breakpoint: bp }),

    // Overlays & Toggles
    theme: 'system',
    setTheme: (theme) => set({ theme }),
    showGrid: false,
    setShowGrid: (show) => set({ showGrid: show }),
    showBaseline: false,
    setShowBaseline: (show) => set({ showBaseline: show }),
    showBorders: false,
    setShowBorders: (show) => set({ showBorders: show }),
    reduceMotion: false,
    setReduceMotion: (reduce) => set({ reduceMotion: reduce }),
    rtl: false,
    setRtl: (rtl) => set({ rtl }),
}));
