import { create } from 'zustand';

type LabCategory =
    | 'dashboard'
    | 'hero'
    | 'scroll'
    | 'threejs'
    | 'background'
    | 'cursor'
    | 'text'
    | 'card'
    | 'section'
    | 'ai'
    | 'sound'
    | 'performance'
    | 'vault';

interface LabState {
    activeCategory: LabCategory;
    sidebarOpen: boolean;
    setActiveCategory: (category: LabCategory) => void;
    toggleSidebar: () => void;
}

export const useLabStore = create<LabState>((set) => ({
    activeCategory: 'dashboard',
    sidebarOpen: true,
    setActiveCategory: (category) => set({ activeCategory: category }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
