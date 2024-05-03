import {create } from 'zustand';
import axios from 'axios';


interface ModifyRolStore {
    modifyRole: (email: string) => Promise<any>;
  }

const useStore = create<ModifyRolStore>((set) => ({
  modifyRole: async (email: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/paied`, {
        email
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  },
}));

export default useStore;