import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StudioState {
    favorites: string[];
    recentlyUsed: string[];
    toggleFavorite: (slug: string) => void;
    isFavorite: (slug: string) => boolean;
    addRecentlyUsed: (slug: string) => void;
}

export const useStudioStore = create<StudioState>()(
    persist(
        (set, get) => ({
            favorites: [],
            recentlyUsed: [],

            toggleFavorite: (slug: string) => {
                const current = get().favorites;

                if (current.includes(slug)) {
                    set({ favorites: current.filter((s) => s !== slug) });
                } else {
                    set({ favorites: [slug, ...current] });
                }
            },

            isFavorite: (slug: string) => {
                return get().favorites.includes(slug);
            },

            addRecentlyUsed: (slug: string) => {
                const current = get().recentlyUsed.filter((s) => s !== slug);
                set({ recentlyUsed: [slug, ...current].slice(0, 20) });
            },
        }),
        {
            name: 'ovoll-studio',
        },
    ),
);
