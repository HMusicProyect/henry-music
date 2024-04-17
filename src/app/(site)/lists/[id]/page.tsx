"use client";
import { useState, useEffect } from 'react';
import useStore, { Music } from '@/store/songs.store';
import Image from 'next/image';

interface Props {
    id: number;
}
export default function MusicPlayer({ params }: { params: Props }) {

    const id = params.id;
    
    console.log("id",id);

    const { todos, getMusicById } = useStore();

    const [currentSong, setCurrentSong] = useState<Music | null | undefined>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null); 

    // Llama a getMusicById cuando el componente
    useEffect(()=> {
        getMusicById(id);
        setCurrentSong(todos[0]);
    }, [id]);

    console.log("todos",todos);

    console.log("currentSong",currentSong);
    return (
    <div>
        <h1>Music Player</h1>
        {currentSong && (
            <div>
                <img
                    src={currentSong.image} 
                    alt={currentSong.name} 
                />

                <p>{currentSong.name}</p>
                <p>{currentSong.Artist?.name}</p>
                <p>{currentSong.Genre?.name}</p>
            </div>
        )}
        {currentSong && <p>Now playing: {currentSong.name}</p>}
    </div>
    );
}