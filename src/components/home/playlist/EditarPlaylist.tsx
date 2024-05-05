import React, { useState } from 'react';

const EditarPlaylist: React.FC = () => {
    const [playlistName, setPlaylistName] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Realizar la solicitud POST a la API con la información de la playlist
        // Aquí debes agregar tu lógica para enviar los datos a la API

        // Ejemplo de cómo podrías enviar los datos usando fetch:
        fetch('https://api.example.com/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: playlistName }),
        })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes manejar la respuesta de la API después de editar la playlist
                console.log(data);
            })
            .catch(error => {
                // Manejar errores en caso de que la solicitud falle
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Editar Playlist</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre de la Playlist:
                    <input type="text" value={playlistName} onChange={handleInputChange} />
                </label>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
};

export default EditarPlaylist;