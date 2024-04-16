"use client";
import { useState, useEffect } from 'react';
import useStore, { Music } from '@/store/songs.Store';
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
    useEffect(() => {
        getMusicById(id);
    }, [id, getMusicById]);

    // Maneja el cambio en todos
    useEffect(() => {
        const song = todos.find(song => song.id === id);
        setCurrentSong(song);
        if (song) {
            setAudio(new Audio(song.pathMusic));
        }
    }, [id, todos]);

    const playSong = (song: Music) => {
        setCurrentSong(song);
        if (audio) {
            audio.pause(); 
        }
        const newAudio = new Audio(song.pathMusic);
        setAudio(newAudio);
        newAudio.play();
    };

    const pauseSong = () => {
        if (audio) {
            audio.pause();
        }
    };

    return (
    <div>
        <h1>Music Player</h1>
        {currentSong && (
            <div>
                <Image
                    src={currentSong.image} 
                    alt={currentSong.name} 
                />
                <button onClick={() => playSong(currentSong)}>Play</button>
                <button onClick={pauseSong}>Pause</button>
                <p>{currentSong.name}</p>
                <p>{currentSong.Artist?.name}</p>
                <p>{currentSong.Genre?.name}</p>
            </div>
        )}
        {currentSong && <p>Now playing: {currentSong.name}</p>}
    </div>
    );
}