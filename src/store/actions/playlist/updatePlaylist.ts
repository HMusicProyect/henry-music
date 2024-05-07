    // updatePlaylist.ts
    // Este controlador es para actualizar una playlist existente

import { PlaylistState } from "./test";

    type FilePair = {
    photo: File;
};
    
    export const updatePlaylist = (id: string,   set: Function, handlePhotoSubmit: Function,name?: string, image?: string | File): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            let imageUrl: string = '';
            console.log('updatePlaylist', id, name, image);

            if (image && typeof image !== 'string') {
                const filePair: FilePair = { photo: image };
                const uploadResponse = await handlePhotoSubmit(filePair);
                console.log('uploadResponse:', uploadResponse);
                if (uploadResponse.status === 200) {
                    imageUrl = uploadResponse.url;
                } else {
                    const error = 'Error uploading image to Cloudinary';
                    console.error(error);
                    reject(error);
                    return;
                }
            }

            if (!id || (!name && !imageUrl)) {
                const error = 'Error: ID, Name or Image is undefined';
                console.error(error);
                reject(error);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/putPlaylist`, {
                    method: 'PUT',
                    body: JSON.stringify({ id, name, image: imageUrl }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const error = `HTTP error! status: ${response.status}`;
                    console.error(error);
                    reject(error);
                    return;
                }

                await response.json();

                set((state: PlaylistState) => {
                    const updatedUserPlaylists = state.userPlaylists.map((playlist) =>
                        playlist.id === id
                            ? { ...playlist, name: name || playlist.name, image: imageUrl || playlist.image }
                            : playlist
                    );
                    return { userPlaylists: updatedUserPlaylists };
                });

                resolve();
            } catch (error) {
                console.error('Error updating playlist:', error);
                reject(error);
            }
        });
    };