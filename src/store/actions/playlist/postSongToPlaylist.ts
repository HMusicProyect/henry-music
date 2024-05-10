
import { PlaylistDetail, PlaylistState } from "./playlist.store";

export const postSongToPlaylist = async (playlistId: string, songId: string, set:any ):  Promise<PlaylistDetail | undefined> => {
    if (!playlistId || !songId) {
        console.error('Error: Playlist ID or Song ID is undefined');
        return;
    }
    let updatedPlaylist: PlaylistDetail | null = null;
    try {
        // Actualizar el estado primero
        set((state: PlaylistState) => {
            const updatedState = { ...state };
            const playlist = updatedState.userPlaylists.find(pl => pl.id === playlistId);
            if (playlist) {
                if (!playlist.songs) {
                    playlist.songs = [];
                }
                playlist.songs.push({ AlbumsID: 0, ArtistID: 0, GenreID: 0, id: 0, image: '', name: '', pathMusic: '' }); // Asegúrate de reemplazar esto con la canción real
                updatedState.playlistDetail = {
                    dataValues: {
                        UsersID: '', // Actualiza esto con los valores correctos
                        id: playlist.id,
                        image: playlist.image,
                        name: playlist.name,
                    },
                    playlistDetails: [], // Actualiza esto con los valores correctos
                    songs: playlist.songs,
                };
            }
            return updatedState;
        });


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
        const newSong = data.newSong;

        updatedPlaylist = data.playlistDetail?.songs
            ? { 
                ...data.playlistDetail, 
                songs: [...data.playlistDetail.songs, newSong] 
            }
            : data.playlistDetail;

          // Actualizar el estado con los datos de la API
        set((state: PlaylistState) => ({
            ...state,
            playlistDetail: updatedPlaylist
        }));

    } catch (error) {
        console.error('Error posting song to playlist:', error);
    }
};