import { create } from 'zustand';

type CursorVariant = 'default' | 'pointer' | 'text' | 'drag' | 'none';

interface CursorState {
    variant: CursorVariant;
    text: string | null;
    setVariant: (variant: CursorVariant) => void;
    setText: (text: string | null) => void;
    reset: () => void;
}

export const useCursorStore = create<CursorState>((set) => ({
    variant: 'default',
    text: null,
    setVariant: (variant) => set({ variant }),
    setText: (text) => set({ text, variant: text ? 'none' : 'default' }),
    reset: () => set({ variant: 'default', text: null }),
}));
