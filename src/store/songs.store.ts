import { Music } from "@/lib/definitions";
import { create } from "zustand";

export interface State {
  todos: Music[];
  loading: boolean;
  error: string | null;
  userPlaylists: any[];
  getMusic: () => Promise<void>;
  addMusic: (musicData: Music, token: string) => Promise<void>; 
  deleteMusic: (id: number) => Promise<void>;
  searchMusic: (query: string) => Promise<void>;
  getMusicById: (id: number) => Promise<void>;
  filterMusic: (query: string) => void;
  getUserPlaylists: (userId: string) => Promise<void>;
}

const useStore = create<State>((set) => ({
  todos: [],
  userPlaylists: [],
  loading: false,
  error: null,
  getMusic: async () => {
    try {
      set({ loading: true, error: null });
      const todos = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs`
      ).then((res) => res.json());
      set({ todos, loading: false });
    } catch (error) {
      set({ loading: false, error: "Error al obtener los todos" });
    }
  },

  addMusic: async (musicData, token) => {
    try {
      set({ loading: true, error: null });
      const newMusic = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs`,
        {
          method: "POST",
          body: JSON.stringify(musicData),
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
        }
      ).then((res) => res.json());
      set((state) => ({ todos: [...state.todos, newMusic], loading: false }));
    } catch (error) {
      set({ loading: false, error: "Error al agregar la canción" });
    }
  },

  deleteMusic: async (id) => {
    try {
      set({ loading: true, error: null });
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        todos: state.todos.filter((Music) => Music?.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: "Error al eliminar el Music" });
    }
  },
  searchMusic: async (query) => {
    try {
      set({ loading: true, error: null });
      const filteredTodos = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs?q=${query}`
      ).then((res) => res.json());
      set({ todos: filteredTodos, loading: false });
    } catch (error) {
      set({ loading: false, error: "Error al buscar los todos" });
    }
  },

  getMusicById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const music = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${id}`
      ).then((res) => res.json());
      set({ todos: [music], loading: false });
    } catch (error) {
      set({ loading: false, error: "Error al buscar la canción" });
    }
  },

  getUserPlaylists: async (userId) => {
    try {
      set({ loading: true, error: null });
      const playlists = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserPlaylist`,
        {
          method: "POST",
          body: JSON.stringify({ id: userId }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => res.json());
      set({ userPlaylists: playlists, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: "Error al obtener las playlists del usuario",
      });
    }
  },

  filterMusic: (query: string) => {
    set((state) => ({
      ...state,
      filteredTodos: state.todos.filter(
        (invoice) =>
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
