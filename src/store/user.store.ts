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
  unbanUser: (userId: string, token: string) => Promise<void>;
  updateUser: (id: string, name?: string, image?: string, token?: string) => Promise<void>;
  putAdmin: (userId: string, token: string) => Promise<void>;
  putDeleteAdmin: (userId: string, token: string) => Promise<void>;
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
  unbanUser: async (userId: string, token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/unbanUser`, {
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

      throw new Error('Failed to unban user');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateUser: async (id: string, name?: string, image?: string, token?: string) => {
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/editNameAndPic/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },

            body: Object.keys(requestBody).length > 0 ? JSON.stringify(requestBody) : undefined
        });

        if (response.ok) {
            await get().fetchUsers();
            return;
        }

        throw new Error('Fallo al actualizar el usuario');
    } catch (error) {
        console.error(error);
        throw error;
    }
},
putAdmin: async (userId: string, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/putAdmin`, {
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

    throw new Error('Failed to update user to admin');
  } catch (error) {
    console.error(error);
    throw error;
  }
},

putDeleteAdmin: async (userId: string, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/putDeleteAdmin`, {
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

    throw new Error('Failed to update user to non-admin');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

}));