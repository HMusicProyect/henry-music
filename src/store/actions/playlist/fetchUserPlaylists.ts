// fetchUserPlaylists.ts
import Swal from 'sweetalert2';
import Router from 'next/router';

//este controlador es para traer las playlist del usuario que consulta
export const fetchUserPlaylists = async (id: string, signOut: () => void): Promise<any[]> => {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserPlaylist/${id}`);
        if (!response.ok) {
            if (response.status === 403) {
                const errorData = await response.json();
                // Previene la recarga de la página
                Router.push('/login');
                Swal.fire({
                    icon: "error",
                    title: '<span style="color: white;">Error</span>',
                    html: `<span style="color: white;">${errorData.error.split(",")}</span>`,
                    footer: '<a href="#" style="color: white;">¿Por qué tengo este problema?</a>',
                    background: '#505050',
                    confirmButtonColor: '#FFCC00',
                    allowOutsideClick: false,
                }) .then(() => {
                    signOut();
                });
            } else {
                throw new Error('Error al obtener las listas de reproducción del usuario');
            }
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las listas de reproducción del usuario');
    }
};