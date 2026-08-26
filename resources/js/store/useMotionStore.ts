import { create } from 'zustand';

interface MotionState {
    // Cursor State
    cursorState: 'default' | 'hover' | 'text' | 'media' | 'hidden';
    setCursorState: (state: 'default' | 'hover' | 'text' | 'media' | 'hidden') => void;
    cursorText: string;
    setCursorText: (text: string) => void;

    // Scroll State
    scrollY: number;
    setScrollY: (y: number) => void;
    scrollVelocity: number;
    setScrollVelocity: (velocity: number) => void;
    isScrolling: boolean;
    setIsScrolling: (scrolling: boolean) => void;

    // Page Transition State
    isNavigating: boolean;
    setIsNavigating: (navigating: boolean) => void;
}

export const useMotionStore = create<MotionState>((set) => ({
    cursorState: 'default',
    setCursorState: (state) => set({ cursorState: state }),
    cursorText: '',
    setCursorText: (text) => set({ cursorText: text }),

    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),
    scrollVelocity: 0,
    setScrollVelocity: (v) => set({ scrollVelocity: v }),
    isScrolling: false,
    setIsScrolling: (s) => set({ isScrolling: s }),

    isNavigating: false,
    setIsNavigating: (nav) => set({ isNavigating: nav }),
}));
