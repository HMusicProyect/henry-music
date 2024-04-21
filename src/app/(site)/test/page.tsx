import React, { useState, useEffect } from 'react';
import type { User } from '@/lib/definitions';

function UserComponent() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    if (!user) {
        return <div>No hay usuario</div>;
    }

    return (
        <div>
            <h2>Información del usuario</h2>
            <p>ID: {user.id}</p>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Acceso: {user.access ? 'Sí' : 'No'}</p>
            <p>Verificado: {user.esta_verificado ? 'Sí' : 'No'}</p>
            <img src={user.image} alt="Imagen del usuario" />
        </div>
    );
}

export default UserComponent;