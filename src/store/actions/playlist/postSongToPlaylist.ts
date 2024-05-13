import toast from 'react-hot-toast';
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
            const errorData = await response.json();
            switch (response.status) {
                case 400:
                    toast.error(errorData.error);
                    break;
                case 404:
                    toast.error(errorData.error);
                    break;
                case 409:
                    toast.error(errorData.error);
                    break;
                case 500:
                    toast.error(errorData.error);
                    break;
                default:
                    toast.error('Ha ocurrido un error desconocido.');
            }
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Actualizar solo la parte modificada del estado
        toast.success('Las canciones se han agregado con éxito a la playlist.');
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
        if (error instanceof Error) {
            console.error('Error posting song to playlist:', error);
        }
    }
};