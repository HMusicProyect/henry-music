"use client"

import { useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import usePlaylistStore from '@/store/playlist.store';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MediaItem from '@/components/ui/sidebar/MediaItem';
import { ModalComponent } from '@/components/ui/Modal/Modal';
import AddMusicToPlaylist from '@/components/home/playlist/addMusic';

interface Song {
    id: number;
    image: string;
    name: string;
}


export default function MusicPlayer() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const id = searchParams.get('id') || '';
    // const token = searchParams.get('token');

    const fetchPlaylistDetail = usePlaylistStore((state) => state.fetchPlaylistDetail);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const playlistDetail = usePlaylistStore((state) => state.playlistDetail);

    const playlistData = playlistDetail?.dataValues;
    const songs = playlistDetail?.songs
    console.log('songs', songs);

    useEffect(() => {
        if (id) {
            fetchPlaylistDetail(id);
        }
    }, [id]);


    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            
                <div className={``}>
                    <Header>
                        <h1 className="bg-neutral-900"></h1>
                    </Header>
                    <ModalComponent
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    >
                        <AddMusicToPlaylist
                            id={id}
                        />
                    </ModalComponent>
                    <div className='mt-2 mb-7 px-6'>
                        <div className="flex gap-x-4 items-center">
                            <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={playlistData?.image ? playlistData?.image : '/images/HenrryMusic.svg'}
                                    alt={playlistData?.name} 
                                    width={300}
                                    height={400}
                                />
                            </div>
                            <button onClick={() => setIsModalOpen(true)}>Add Song to Playlist</button>
                            <div>
                                <h2 className="text-2xl font-semibold">{playlistData && capitalizeWords(playlistData.name)}</h2>
                                <p className="text-md text-gray-500">
                                    <span className='text-white font-semibold text-md'>Nombre: </span>
                                    {playlistData?.name}
                                </p>
                                <p className="text-md text-gray-500">
                                    <span className='text-white font-semibold text-md'>Autor: </span>
                                    {playlistData?.name}
                                </p>
                                {playlistData && <p className='mt-8'>Now playing: {playlistData.name}</p>}
                            </div>
                        </div>
                    </div>
                </div>

            <div className='mt-8 mb-7 px-6 flex gap-x-16'>
                <div className='w-1/2 flex flex-col gap-8'>
                    <h2 className='text-left'>Explore songs of the same genre</h2>
                    {songs?.map((song: Song) => (
                        <Link
                            href={`/home/lists/${song.id}`}
                            key={song.id}
                        >
                            <MediaItem
                                data={song}
                            />
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
