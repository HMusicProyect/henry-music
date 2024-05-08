    // postSavingPlaylist.ts

import { PlaylistState } from "./playlist.store";

    // Este módulo define una función para agregar una canción a una lista de reproducción en una base de datos.

    export const postSavingPlaylist = async (userId: string, playlistId: string, set: Function) => {
        if (!userId || !playlistId) {
            console.error('Error: User ID or Playlist ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postSavingPlaylist`, {
                method: 'POST',
                body: JSON.stringify({ userId, playlistId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            set((state: PlaylistState) => {
                const updatedUserPlaylists = state.userPlaylists.map((playlist) => 
                    playlist.id === playlistId 
                        ? { ...playlist, likes: [...playlist.likes, data] } 
                        : playlist
                );
                return { userPlaylists: updatedUserPlaylists };
            });
        } catch (error) {
            console.error('Error saving playlist:', error);
        }
    };