
import { PlaylistDetail, PlaylistState } from "./playlist.store";

export const postSongToPlaylist = async (playlistId: string, songId: string, set:any ):  Promise<PlaylistDetail | undefined> => {
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
        // Actualizar solo la parte modificada del estado
        set((state: PlaylistState) => {
            const updatedPlaylistDetails = state.playlistDetail?.playlistDetails 
                ? [...state.playlistDetail.playlistDetails, data] 
                : [data];

            return {
                ...state,
                playlistDetail: {
                    ...state.playlistDetail,
                    playlistDetails: updatedPlaylistDetails
                }
            };
        });

    } catch (error) {
        console.error('Error posting song to playlist:', error);
    }
};