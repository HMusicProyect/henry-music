"use client"

import { useState, useEffect } from 'react';
import useStore, { Music } from '@/store/songs.store';
import { useSession } from 'next-auth/react';
import Header from '@/components/ui/header/Header';
import { FastAverageColor } from 'fast-average-color';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
    id: number;
}

export default function MusicPlayer({ params }: { params: Props }) {
    const { data: session, status } = useSession();
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string>('');
    const isSessionLoading = status === 'loading';
    const router = useRouter();

    //musicas
    const { todos, getMusicById } = useStore();
    const [currentSong, setCurrentSong] = useState<Music | null | undefined>(null);

    useEffect(() => {
        if (!session) {
            router.replace('/login');
        }
    }, [session, router]);

    const id = params.id;

    useEffect(() => {
        getMusicById(id);
    }, [id]);

    useEffect(() => {
        setCurrentSong(todos[0]);
    }, [todos]);

    useEffect(() => {
        if (currentSong && currentSong.image) {
            const fac = new FastAverageColor();
            const img = document.createElement('img');
            img.crossOrigin = 'Anonymous';
            img.src = currentSong.image as string;
            img.onload = () => {
                const color = fac.getColor(img);
                setHeaderBackgroundColor(color.hex);
            };
        }
    }, [currentSong]);

    if (isSessionLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            {currentSong && (
                <div className={`${headerBackgroundColor} `}>
                    <Header className={headerBackgroundColor}>
                        <h1 className="bg-neutral-900"></h1>
                    </Header>
                    <div className='mt-2 mb-7 px-6'>
                        <div className="flex gap-x-4 items-center">
                            <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={currentSong.image}
                                    alt={currentSong.name}
                                    width={300}
                                    height={400}
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold">{currentSong.name}</h2>
                                <p className="text-sm text-gray-500">{currentSong.Artist?.name}</p>
                                <p className="text-sm text-gray-500">{currentSong.Genre?.name}</p>
                            </div>
                        </div>
                        {currentSong && <p className='mt-5'>Now playing: {currentSong.name}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
