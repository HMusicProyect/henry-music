import {create} from 'zustand';
import { Music } from '@/lib/definitions';

type PlaylistState = {
    userPlaylists: any[];
    allPlaylists: any[];
    currentSong: Music | null;
    playlistDetail: any | null;
    fetchUserPlaylists: (id: string) => void;
    fetchAllPlaylists: () => void;
    fetchPlaylistDetail: (id: string) => void;
    postPlaylist: (name: string, userId: string) => void;
    postSongToPlaylist: (playlistId: string, songId: string) => void;
};

const usePlaylistStore = create<PlaylistState>((set) => ({
    currentSong: null,
    userPlaylists: [],
    allPlaylists: [],
    playlistDetail: null,
    //este controlador es para traer las playlist del usuario que consulta
    fetchUserPlaylists: async (id) => {
        if (!id) {
            console.error('Error: ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserPlaylist/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            set({ userPlaylists: data });
        } catch (error) {
            console.error('Error fetching user playlists:', error);
        }
    },

    //este controlador es para traer la playlist de todos los usuarios en la
    //base de datos
    fetchAllPlaylists: async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getPlaylist`);
            const data = await response.json();
            set({ allPlaylists: data });
        } catch (error) {
            console.error('Error fetching all playlists:', error);
        }
    },

    //este controlador es para consulta el detalles de una playlist especifica
    //que requiera el usuario
    fetchPlaylistDetail: async (id) => {
        if (!id) {
            console.error('Error: ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getPlaylistDetail/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            set({ playlistDetail: data });
        } catch (error) {
            console.error('Error fetching playlist detail:', error);
        }
    },

    //este controlador es para crear una playlist nueva
// ...
    postPlaylist: async (name: string, userId: string) => {
        if (!name || !userId) {
            console.error('Error: Name or User ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist`, {
                method: 'POST',
                body: JSON.stringify({ name, userId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            set((state) => {
                if (Array.isArray(state.userPlaylists)) {
                    return { userPlaylists: [...state.userPlaylists, data] };
                } else {
                    console.error('Error: userPlaylists is not an array');
                    return state;
                }
            });

        } catch (error) {
            console.error('Error posting new playlist:', error);
        }
    },

    //Este controlador es para guardar la playlist que el usuario le ha dado like(me gusta)
    postSavingPlaylist: async (userId: string, playlistId: string) => {
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

            set((state) => {
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
    },

    // Este módulo define una función para agregar una canción a una lista de reproducción en una base de datos.

    postSongToPlaylist: async (playlistId: string, songId: string) => {
        if (!playlistId || !songId) {
            console.error('Error: Playlist ID or Song ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postPlaylist`, {
                method: 'POST',
                body: JSON.stringify({ playlistId, songId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Aquí puedes actualizar el estado según sea necesario
            // Por ejemplo, puedes agregar la nueva canción a la playlist en el estado
            set((state) => {
                const updatedPlaylist = state.playlistDetail?.songs
                    ? { ...state.playlistDetail, songs: [...state.playlistDetail.songs, data] }
                    : state.playlistDetail;
                return { playlistDetail: updatedPlaylist };
            });

        } catch (error) {
            console.error('Error posting song to playlist:', error);
        }
    },

    // Este controlador es para actualizar una playlist existente
    updatePlaylist: async (id: string, name?: string, image?: string) => {
        if (!id || (!name && !image)) {
            console.error('Error: ID, Name or Image is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/putPlaylist`, {
                method: 'PUT',
                body: JSON.stringify({ id, name, image }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            set((state) => {
                const updatedUserPlaylists = state.userPlaylists.map((playlist) => 
                    playlist.id === id 
                        ? { ...playlist, name: name || playlist.name, image: image || playlist.image } 
                        : playlist
                );
                return { userPlaylists: updatedUserPlaylists };
            });

        } catch (error) {
            console.error('Error updating playlist:', error);
        }
    },

    //este controlador es para eliminar una cancion de una playlist, recibe el id de la cancion y 
    //el id de la playlist por params.

    deleteSongFromPlaylist: async (songId: string, playlistId: string) => {
        if (!songId || !playlistId) {
            console.error('Error: Song ID or Playlist ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/deleteSongFromPlaylist/${songId}/${playlistId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

        set((state) => {
            const updatedPlaylist = state.playlistDetail?.songs
                ? { 
                    ...state.playlistDetail, 
                    songs: state.playlistDetail.songs.filter((song: { id: string }) => song.id !== songId) 
                }
                : state.playlistDetail;
            return { playlistDetail: updatedPlaylist };
        });

        } catch (error) {
            console.error('Error deleting song from playlist:', error);
        }
    },

    //este controlador es para eliminar una playlist, toma el id de la playlist a eliminar por params y la 
    //elimina.

    deletePlaylist: async (id: string) => {
        if (!id) {
            console.error('Error: ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/deletePlaylist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            set((state) => {
                const updatedUserPlaylists = state.userPlaylists.filter((playlist: { id: string }) => playlist.id !== id);
                const updatedAllPlaylists = state.allPlaylists.filter((playlist: { id: string }) => playlist.id !== id);
                return { 
                    userPlaylists: updatedUserPlaylists,
                    allPlaylists: updatedAllPlaylists,
                    playlistDetail: state.playlistDetail?.id === id ? null : state.playlistDetail
                };
            });

        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    },
    
}));

export default usePlaylistStore;