// playlist.store.ts
import { create } from 'zustand';
import { fetchUserPlaylists, fetchAllPlaylists, fetchPlaylistDetail, postPlaylist, postSongToPlaylist, deleteSongFromPlaylist, updatePlaylist, deletePlaylist } from '@/store/actions/playlist/indext';
import { handlePhotoSubmit } from '../postCloudinary';

export interface Playlist {
    id: string;
    name: string;
    image: string;
}

export interface PlaylistDetailData {
    UsersID: string;
    id: string;
    image: string | File;
    name: string;
}

export interface PlaylistDetailSong {
    ArtistName: string;
    GenreName: string;
    PlaylistID: string;
    SongsID: number;
    SongsImage: string;
    SongsName: string;
    id: string;
}

export interface Song {
    AlbumsID: number;
    ArtistID: number;
    GenreID: number;
    id: number;
    image: string;
    name: string;
    pathMusic: string;
}

export interface PlaylistDetail {
    dataValues: PlaylistDetailData;
    playlistDetails: PlaylistDetailSong[];
    songs: Song[];
}

export type PlaylistState = {
    userPlaylists: Playlist[];
    allPlaylists: Playlist[];
    currentSong: Song | null;
    playlistDetail: PlaylistDetail | null;
    error: string | null;
    fetchUserPlaylists: (id: string) => void;
    fetchAllPlaylists: () => void;
    fetchPlaylistDetail: (id: string) => void;
    postPlaylist: (name: string, userId: string) => void;
    postSongToPlaylist: (playlistId: string, songId: string) => void;
    deleteSongFromPlaylist: (id: string ) => void;
    updatePlaylist: (id: string, name?: string, image?: File) => Promise<void>;
    deletePlaylist: (id: string) => void;
};

const usePlaylistStore = create<PlaylistState>((set) => ({
    userPlaylists: [],
    allPlaylists: [],
    currentSong: null,
    playlistDetail: null,
    error: null,
    //este controlador es para traer las playlist del usuario que consulta
    fetchUserPlaylists: async (id: string) => {
        try {
            const playlists = await fetchUserPlaylists(id);
            console.log(playlists)
            set({ userPlaylists: playlists });
        } catch (error) {
            set({ error: 'Error fetching user playlists:' + error });
        }
    },

    fetchAllPlaylists: async () => {
        try {
            const playlists = await fetchAllPlaylists();
            set({ allPlaylists: playlists });
        } catch (error) {
            set({ error: 'Error fetching all playlists:' + error });
        }
    },
    fetchPlaylistDetail: async (id: string) => {
        try {
            const playlistDetail = await fetchPlaylistDetail(id);
            set({ playlistDetail });
        } catch (error) {
            set({ error: 'Error fetching playlist detail:' + error });
        }
    },

    //este controlador es para crear una playlist nueva
    postPlaylist: async (name: string, userId: string) => {
        try {
            const newPlaylist = await postPlaylist(name, userId);
            set((state) => ({ userPlaylists: [...state.userPlaylists, newPlaylist] }));
        } catch (error) {
            set({ error: 'Error posting new playlist:' + error });
        }
    },

    postSongToPlaylist: async (playlistId: string, songId: string) => {
        try {
            const updatedPlaylist = await postSongToPlaylist( playlistId, songId);
            set((state) => ({
                userPlaylists: state.userPlaylists.map((playlist) =>
                    playlist.id === playlistId ? updatedPlaylist : playlist
                ),
            }));
        } catch (error) {
            set({ error: 'Error posting song to playlist:' + error });
        }
    },
    deleteSongFromPlaylist: async (songId: string,) => {
        try {
            const updatedPlaylist = await deleteSongFromPlaylist(songId);
            set((state: PlaylistState) => {
                return { 
                    ...state, 
                    playlistDetail: updatedPlaylist 
                };
            });
        } catch (error) {
            set((state) => ({ 
                ...state, 
                error: 'Error deleting song from playlist:' + error 
            }));
        }
    },
    
    updatePlaylist: async (id: string, name?: string, image?: File) => {
        try {
            const updatedPlaylist = await updatePlaylist(id, set, handlePhotoSubmit, name, image);
            set((state) => ({
                userPlaylists: state.userPlaylists.map((p) =>
                    p.id === id ? { ...p, name: updatedPlaylist.name, image: updatedPlaylist.image } : p
                ),
            }));
        } catch (error) {
            set({ error: 'Error updating playlist:' + error });
        }
    },
    
    //este controlador es para eliminar una playlist, toma el id de la playlist a eliminar por params y la 
    //elimina.
    deletePlaylist: async (playlistId: string) => {
        try {
            await deletePlaylist(playlistId, set);
        } catch (error) {
            set({ error: 'Error deleting playlist:' + error });
        }
    },
}));

export default usePlaylistStore;