    // updatePlaylist.ts
    // Este controlador es para actualizar una playlist existente

import { PlaylistState } from "./playlist.store";

    type FilePair = {
    photo: File;
};
    
export const updatePlaylist = (id: string, set: Function, handlePhotoSubmit: Function, name?: string, image?: string | File): Promise<any> => {
    
    return new Promise(async (resolve, reject) => {
        let imageUrl: string = '';

        if (image && typeof image !== 'string') {
            const filePair: FilePair = { photo: image };
            const uploadResponse = await handlePhotoSubmit(filePair);
            if (uploadResponse.status === 200) {
                imageUrl = uploadResponse.url;
            } else {
                reject('Error uploading image to Cloudinary');
                return;
            }
        }

        if (!id || (!name && !imageUrl)) {
            reject('Error: ID, Name or Image is undefined');
            return;
        }

        try {
            console.log('img', imageUrl);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/putPlaylist`, {
                method: 'PUT',
                body: JSON.stringify({ id, name, image: imageUrl }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                reject(`HTTP error! status: ${response.status}`);
                return;
            }

            const updatedPlaylist = await response.json();
            console.log('updatedPlaylist', updatedPlaylist);

            set((state: PlaylistState) => {
                const updatedUserPlaylists = state.userPlaylists.map((playlist) =>
                    playlist.id === id
                        ? { ...playlist, name: updatedPlaylist.name || playlist.name, image: updatedPlaylist.image || playlist.image }
                        : playlist
                );
                return { userPlaylists: updatedUserPlaylists };
            });

            resolve(updatedPlaylist);
        } catch (error) {
            console.log('Error updating playlist:', error);
            reject('Error updating playlist:' + error);
        }
    });
};