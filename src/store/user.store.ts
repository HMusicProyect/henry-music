import { User } from '@/lib/definitions';
import { create } from 'zustand';



type Store = {
  user: User;
  users: User[];
  fetchUsers: () => Promise<void>;
  postUser: (user: User) => Promise<Response>; 
  getUserById: (id: string) => User | undefined;
  verifyUser: (id: string, url: string) => Promise<void>;
  banUser: (userId: string, token: string) => Promise<void>;
};

export const useStore = create<Store>((set, get) => ({
  users: [],

  user: {
    id: '',
    name: '',
    email: ''
  },
  
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
      return response;
    }
    return response;
  },
  getUserById: (id: string) => {
    const state = get();
    return state.users.find((user) => user.id === id);
  },
  
  verifyUser: async (id: string, url: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verification?id=${id}&url=${url}`);

    
    if(!response) return response;
    
    if (response.ok) {
      const updatedUser = await response.json();

      set((state) => ({
        user: state.user.id === id ? updatedUser : state.user
      }));
    }
    
  },
  banUser: async (userId: string, token:string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/banUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        }
      });

      if (response.ok) {
        await get().fetchUsers();
        return;
      }

      throw new Error('Failed to ban user');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));