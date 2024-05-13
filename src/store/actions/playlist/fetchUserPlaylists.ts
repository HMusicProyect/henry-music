// fetchUserPlaylists.ts


//este controlador es para traer las playlist del usuario que consulta
export const fetchUserPlaylists = async (id: string): Promise<any[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserPlaylist/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener las listas de reproducción del usuario');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las listas de reproducción del usuario');
    }
};