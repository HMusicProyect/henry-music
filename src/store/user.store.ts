import { create } from 'zustand';

type User = {
  id?: string;
  name: string;
  email: string;
};

type Store = {
  users: User[];
  fetchUsers: () => Promise<void>;
  postUser: (user: User) => Promise<Response>; 
  getUserById: (id: string) => User | undefined;
};

export const useStore = create<Store>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
    const users = await response.json();
    set({ users });
  },
  postUser: async (user: User) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const newUser = await response.json();
      set((state) => ({ users: [...state.users, newUser] }));
    }
    return response;
  },
  getUserById: (id: string) => {
    const state = get();
    return state.users.find((user) => user.id === id);
  },
}));