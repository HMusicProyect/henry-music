"use client";
import { useState, useEffect } from 'react';
import useStore, { Music } from '@/store/songs.store';
import { useSession } from 'next-auth/react';

interface Props {
    id: number;
}

export default function MusicPlayer({ params }: { params: Props }) {
    const { data: session, status } = useSession();
    const isSessionLoading = status === 'loading';

    if (isSessionLoading) {
        return <div>Cargando...</div>;
    }

    if (!session) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return null;
    }

    const id = params.id;

    console.log("id", id);

    const { todos, getMusicById } = useStore();

    const [currentSong, setCurrentSong] = useState<Music | null | undefined>(null);

    // Llama a getMusicById cuando el componente
    useEffect(() => {
        getMusicById(id);
        setCurrentSong(todos[0]);
    }, [id]);

    console.log("todos", todos);

    console.log("currentSong", currentSong);
    return (
        <div>
            <h1>Music Player</h1>
            {todos.map((song, index) => (
                <div key={index} className="flex flex-col items-center p-4 shadow-md">
    <img
        src={song.image}
        alt={song.name}
        className="w-90 h-70 rounded-lg mb-4"
    />
    <div className="text-center">
        <p className="font-semibold text-2xl">{song.name}</p>
        <p className="text-gray-600">{song.Artist?.name}</p>
        <p className="text-gray-600">{song.Genre?.name}</p>
    </div>
</div>
            ))}
            {todos && <p>Now playing: {todos[0].name}</p>}
        </div>
    );
}
