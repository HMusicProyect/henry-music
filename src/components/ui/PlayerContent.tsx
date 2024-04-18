"use client"

import { Music } from '@/store/songs.store'
import React, { useEffect, useState } from 'react'
import MediaItem from './sidebar/MediaItem';
import { Play, Pause, StepBack, StepForward, Volume1, Volume2 } from 'lucide-react';
import Slider from './Slider';
import usePlayer from '@/store/hooks/usePlayer';
import useSound from 'use-sound'
import Modal from './Modal/Modal';
import { useSession } from 'next-auth/react';

interface PlayerContentProps {
    song: Music;
    songUrl?: string;

}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const { data: session, status } = useSession();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [message, setMessage] = useState("");

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
            setVolume(1);
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
                            <div className='flex items-center gap-x-4'>
                                <MediaItem data={song} />
                            </div>
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
            <Modal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                >
                <div className="p-8 mt-10">
                    <div className="w-1/2 p-4 rounded-md shadow-lg bg-gray-50">
                    <h1 className="text-2xl font-bold text-indigo-500 mb-4">{message}</h1>

                    <div className="text-right">
                        <button
                        onClick={handleModalClose}
                        className="inline-block bg-indigo-500 py-2 px-4 text-white rounded-md font-semibold uppercase text-sm "
                        >
                        Ok
                        </button>
                    </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default PlayerContent