import { create } from 'zustand';

export interface Artist {
    name: string;
}

export interface Genre {
    name: string;
}

export interface Music {
    id: number;
    image: string;
    name: string;
    pathMusic?: string;
    ArtistID?: number;
    GenreID?: number;
    Artist?: Artist;
    Genre?: Genre;
};

export interface State {
    todos: Music[];
    loading: boolean;
    error: string | null;
    getMusic: () => Promise<void>;
    addMusic: (title: string) => Promise<void>;
    deleteMusic: (id: number) => Promise<void>;
    searchMusic: (query: string) => Promise<void>;
    getMusicById: (id: number) => Promise<void>;
    filterMusic: (query: string) => void;
    
};

const useStore = create<State>((set) => ({
    todos: [],
    loading: false,
    error: null,
    getMusic: async () => {
        try {
            set({ loading: true, error: null });
            // Lógica para obtener los todos desde una API o cualquier otra fuente de datos
            const todos = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs`).then((res) => res.json());
            set({ todos, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al obtener los todos' });
        }
    },

    addMusic: async (title) => {
        try {
            set({ loading: true, error: null });
            // Lógica para agregar un nuevo Music a la API o cualquier otra fuente de datos
            const newTodo = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs`, {
                method: 'POST',
                body: JSON.stringify({ title, completed: false }),
                headers: { 'Content-Type': 'application/json' },
            }).then((res) => res.json());
            set((state) => ({ todos: [...state.todos, newTodo], loading: false }));
        } catch (error) {
            set({ loading: false, error: 'Error al agregar el Music' });
        }
    },

    deleteMusic: async (id) => {
        try {
            set({ loading: true, error: null });
            // Lógica para eliminar un Music de la API o cualquier otra fuente de datos
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${id}`, { method: 'DELETE' });
            set((state) => ({
                todos: state.todos.filter((Music) => Music.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: 'Error al eliminar el Music' });
        }
    },
    searchMusic: async (query) => {
        try {
            set({ loading: true, error: null });
            const filteredTodos = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs?q=${query}`)
                .then((res) => res.json());
            set({ todos: filteredTodos, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al buscar los todos' });
        }
    },

    getMusicById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const music = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${id}`)
                .then((res) => res.json());
            set({ todos: [music], loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al buscar la canción' });
        }
    },

    filterMusic: (query: string) => {
        set((state) => ({
            ...state,
            filteredTodos: state.todos.filter((invoice) =>
            invoice.name.toLowerCase().includes(query.toLowerCase()) ||
            invoice.Artist?.name.toLowerCase().includes(query.toLowerCase()) ||
            invoice.Genre?.name.toLowerCase().includes(query.toLowerCase())
            ),
        }));
    },
}));

export default useStore;



// const { todos, getMusic, filterMusic, filteredTodos } = useStore();

// useEffect(() => {
//   getMusic();
// }, []);

// useEffect(() => {
//   filterMusic(query);
// }, [query]);
