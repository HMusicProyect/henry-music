// postPlaylist.ts
//este controlador es para crear una playlist nueva

import { Playlist } from "./playlist.store";
import Swal from 'sweetalert2';

export const postPlaylist = async (name: string, userId: string, signOut: () => void ): Promise<Playlist> => {
    if (!name || !userId) {
        console.error('Error: Name or User ID is undefined');
        throw new Error('Name or User ID is undefined');
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
            const errorData = await response.json();
            if (response.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: '<span style="color: white;">Error</span>',
                    html: `<span style="color: white;">${errorData.error.split(",")}</span>`,
                    footer: '<a href="#" style="color: white;">¿Por qué tengo este problema?</a>',
                    background: '#505050',
                    confirmButtonColor: '#FFCC00',
                })
                .then(() => {
                    // Aquí es donde cerrarías la sesión
                    signOut();
                });
            }
            throw new Error(errorData.error);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las listas de reproducción del usuario');
    }
};