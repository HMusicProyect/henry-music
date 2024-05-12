"use client"
import React, { useEffect, useState } from 'react'
import MediaItem from './sidebar/MediaItem';
import { Play, Pause, StepBack, StepForward, Volume1, Volume2 } from 'lucide-react';
import Slider from './Slider';
import usePlayer from '@/store/hooks/usePlayer';
import useSound from 'use-sound'
import {ModalComponent} from '@/components/ui/Modal/Modal';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Music } from '@/lib/definitions';

interface PlayerContentProps {
    song: Music;
    songUrl?: string;

}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const { data: session, status } = useSession();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(previousSong);
    }
    
    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    )

    useEffect(() => {
        if (!session) {
            setIsModalOpen(true);
            setMessage('Por favor, inicia sesión para reproducir música.');
            return;
        } else if (session) {
            sound?.play();
            return () => {
                sound?.unload();
            }
        }
    }, [sound])

    const handlePlay = () => {
        if (!session) {
            setIsModalOpen(true);
            setMessage('Por favor, inicia sesión para reproducir música.');
            return;
        } else if (session) {
            if (!isPlaying) {
                play();

            } else {
                pause();
            }
        }

    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(0.5);
        } else {
            setVolume(0);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setMessage('');
    };
    

    return (
            <>
                <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
                        <div className='flex w-full justify-start'>
                            <Link
                                href={`/home/lists/${song.id}`}
                            >
                                <div className='flex items-center gap-x-4'>
                                    <MediaItem data={song}/>
                                </div>
                            </Link>
                        </div>
                        <div className='hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6'>
                            <StepBack
                                onClick={onPlayPrevious}
                                size={30}
                                className='text-neutral-400 cursor-pointer hover:text-white transition'
                            />
                            <div
                                onClick={handlePlay}
                                className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'
                            >
                                {isPlaying ? (
                                    <Pause className="text-black" fill="black" />
                                ) : (
                                    <Play className="text-black" fill="black" />
                                )}
                            </div>
                            <StepForward
                                onClick={onPlayNext}
                                size={30}
                                className='text-neutral-400 cursor-pointer hover:text-white transition'
                            />
                        </div>
                        <div className='hidden md:flex w-full justify-end pr-2'>
                            <div className='flex items-center gap-x-2 w-[120px]'>
                                {volume === 0 ? (
                                    <Volume1 onClick={toggleMute} className="text-black cursor-pointer" fill="white" size={35} />
                                ) : (
                                    <Volume2 onClick={toggleMute} className="text-black cursor-pointer" fill="white" size={35} />
                                )}
                                <Slider value={volume} onChange={(value) => setVolume(value)} />
                            </div>
                        </div>
                </div>
            <ModalComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            >
                <div className="flex items-center justify-center rounded-[20px] ">
                    <div 
                        className="
                        flex 
                        flex-col 
                        items-center 
                        bg-white 
                        text-center 
                        rounded-xl p-8 
                        space-y-4 
                        w-80
                        bg-gradient-to-b from-green-800 to-black
                        "
                    >
                        <button 
                            className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                            onClick={handleModalClose}
                        >
                            ✖
                        </button>
                        {/* <img className="w-20" src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png" alt="cookies-img" /> */}
                        <h1 className="mb-10 text-lg">
                            Empieza a escuchar con una cuenta gratis de henry music
                        </h1>
                        <button
                        onClick={()=> router.push('/register')}
                            className="bg-red-500 text-white rounded-md w-48 py-3 text-sm focus:outline-none shadow-md"
                        >
                            Registrarse Gratis
                        </button>
                        <p>
                            ya tienes una cuenta? 
                            <Link 
                                href="/login"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </ModalComponent>
        </>

    )
}

export default PlayerContent


