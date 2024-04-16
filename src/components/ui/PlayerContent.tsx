"use client"

import { Music } from '@/store/songs.store'
import React, { useEffect, useState } from 'react'
import MediaItem from './sidebar/MediaItem';
import { Play, Pause, StepBack, StepForward, Volume1, Volume2 } from 'lucide-react';
import Slider from './Slider';
import usePlayer from '@/store/hooks/usePlayer';
import useSound from 'use-sound'

interface PlayerContentProps {
    song: Music;
    songUrl?: string;

}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
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
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play();

        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };

    return (
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

    )
}

export default PlayerContent