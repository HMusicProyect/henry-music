import { create } from 'zustand';

export interface Album {
    id: number;
    name: string;
    image: string;
}

export interface State {
    albums: Album[];
    loading: boolean;
    error: string | null;
    getAlbums: () => Promise<void>;
    postAlbum: (name: string, image: string) => Promise<void>;
    updateAlbum: (id: string, name?: string, image?: string, token?: string) => Promise<void>;
}

export const useAlbumsStore = create<State>((set) => ({
    albums: [],
    loading: false,
    error: null,
    getAlbums: async () => {
        try {
            set({ loading: true, error: null });
            const albums = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/albums`).then((res) => res.json());
            set({ albums, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al obtener los álbumes' });
        }
    },
    postAlbum: async (name: string, image: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/albums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, image }),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el álbum');
            }
            const newAlbum = await response.json();
            set((state) => ({ ...state, albums: [...state.albums, newAlbum] }));
        } catch (error) {
            console.error(error);
            throw new Error('Error al agregar el álbum');
        }
    },
    updateAlbum: async (id: string, name?: string, image?: string, token?: string) => {
        try {
            if (!token) {
                throw new Error('Token de autorización faltante');
            }
    
            const requestBody: any = {};
    
            if (name !== undefined && name !== null) {
                requestBody.name = name;
            }
    
            if (image !== undefined && image !== null) {
                requestBody.image = image;
            }
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/albums/editAlbum/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
    
                body: Object.keys(requestBody).length > 0 ? JSON.stringify(requestBody) : undefined
            });
    
            if (response.ok) {
                await useAlbumsStore.getState().getAlbums();
                return;
            }
    
            throw new Error('Fallo al actualizar el usuario');
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}));

export default useAlbumsStore;
