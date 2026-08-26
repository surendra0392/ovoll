import { create } from 'zustand';

interface NavState {
    isMobileMenuOpen: boolean;
    isMegaMenuOpen: boolean;
    activeMegaMenu: string | null;
    isScrolled: boolean;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
    setMegaMenuOpen: (isOpen: boolean, menuName?: string) => void;
    setScrolled: (isScrolled: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
    isMobileMenuOpen: false,
    isMegaMenuOpen: false,
    activeMegaMenu: null,
    isScrolled: false,
    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    setMegaMenuOpen: (isOpen, menuName) =>
        set({ isMegaMenuOpen: isOpen, activeMegaMenu: isOpen ? menuName : undefined }),
    setScrolled: (isScrolled) => set({ isScrolled }),
}));
