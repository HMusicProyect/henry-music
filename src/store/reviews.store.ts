import { create } from 'zustand';

export interface Review {
    id: number;
    content: string;
    punctuation: number;
    userId: string;
    User: {
        name: string;
        image: string;
    };
}

export interface State {
    reviews: Review[];
    loading: boolean;
    error: string | null;
    getSongReviews: (songId: number) => Promise<void>;
    addReview: (content: string, punctuation: number, songId: number, userId: string) => Promise<void>;
}

export const useReviewsStore = create<State>((set) => ({
    reviews: [],
    loading: false,
    error: null,
    getSongReviews: async (songId: number) => {
        try {
            set({ loading: true, error: null });
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${songId}`);
            if (!response.ok) {
                set({ reviews: [], loading: false });
                return;
            }
            const reviews = await response.json();
            set({ reviews, loading: false });
        } catch (error) {
            console.error(error);
            set({ error: 'Error al obtener las revisiones de la canción', loading: false });
        }
    },
    addReview: async (content: string, punctuation: number, songId: number, userId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content,
                    punctuation: punctuation,
                    songId: songId,
                    userId: userId
                })
            });

            if (!response.ok) {
                throw new Error('Error al agregar la revisión');
            }

            set((state) => ({
                ...state,
                loading: true,
                error: null
            }));
        } catch (error) {
            console.error(error);
            set({ error: 'Error al agregar la revisión', loading: false });
        }
    },
}));

export default useReviewsStore;
