// playlist.store.ts
import { create } from 'zustand';
import { fetchUserPlaylists, fetchAllPlaylists, fetchPlaylistDetail, postPlaylist, postSongToPlaylist, deleteSongFromPlaylist, updatePlaylist, deletePlaylist } from '@/store/actions/playlist/indext';
import { handlePhotoSubmit } from '../postCloudinary';

export type Music = {
    id: string;
    name: string;
    artist: string;
    album: string;
    image?: string;
    url: string;
};

export type Playlist = {
    id: string;
    name: string;
    image: string;
    likes: any[];
    songs: Music[];
    userId: string; 
};

export type PlaylistState = {
    userPlaylists: Playlist[];
    allPlaylists: Playlist[];
    currentSong: Music | null;
    playlistDetail: Playlist | null;
    error: string | null;
    fetchUserPlaylists: (id: string) => void;
    fetchAllPlaylists: () => void;
    fetchPlaylistDetail: (id: string) => void;
    postPlaylist: (playlist: Playlist) => void;
    postSongToPlaylist: (song: Music, playlistId: string) => void;
    deleteSongFromPlaylist: (songId: string, playlistId: string) => void;
    updatePlaylist: (playlist: Playlist) => void;
    deletePlaylist: (playlistId: string) => void;
};

const usePlaylistStore = create<PlaylistState>((set) => ({
    userPlaylists: [],
    allPlaylists: [],
    currentSong: null,
    playlistDetail: null,
    error: null,
    fetchUserPlaylists: async (id: string) => {
        try {
            const playlists = await fetchUserPlaylists(id);
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

    postPlaylist: async (playlist: Playlist) => {
        try {
            const newPlaylist = await postPlaylist(playlist.name, playlist.userId); // Pasa el userId aquí
            set((state) => ({ userPlaylists: [...state.userPlaylists, newPlaylist] }));
        } catch (error) {
            set({ error: 'Error posting new playlist:' + error });
        }
    },

    postSongToPlaylist: async (song: Music, playlistId: string) => {
        try {
            const updatedPlaylist = await postSongToPlaylist(playlistId, song);
            set((state) => ({
                userPlaylists: state.userPlaylists.map((playlist) =>
                    playlist.id === playlistId ? updatedPlaylist : playlist
                ),
            }));
        } catch (error) {
            set({ error: 'Error posting song to playlist:' + error });
        }
    },
    deleteSongFromPlaylist: async (songId: string, playlistId: string) => {
        try {
            await deleteSongFromPlaylist(songId, playlistId, set);
            set((state: PlaylistState) => {
                const updatedPlaylists = state.userPlaylists.map((playlist) =>
                    playlist.id === playlistId ? { ...playlist, songs: playlist.songs.filter((song) => song.id !== songId) } : playlist
                );
                return { 
                    ...state, 
                    userPlaylists: updatedPlaylists 
                };
            });
        } catch (error) {
            set((state) => ({ 
                ...state, 
                error: 'Error deleting song from playlist:' + error 
            }));
        }
    },
    updatePlaylist: async (playlist: Playlist) => {
        try {
            await updatePlaylist(playlist.id,  set, handlePhotoSubmit, playlist.name, playlist.image);
            set((state) => ({
                userPlaylists: state.userPlaylists.map((p) =>
                    p.id === playlist.id ? { ...p, name: playlist.name, image: playlist.image } : p
                ),
            }));
        } catch (error) {
            set({ error: 'Error updating playlist:' + error });
        }
    },

    deletePlaylist: async (playlistId: string) => {
        try {
            await deletePlaylist(playlistId, set);
        } catch (error) {
            set({ error: 'Error deleting playlist:' + error });
        }
    },
}));

export default usePlaylistStore;