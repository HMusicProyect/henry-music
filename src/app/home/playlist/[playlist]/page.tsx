"use client"

import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import usePlaylistStore from '@/store/playlist.store';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import Image from 'next/image';
import { useOptionsStore } from '@/store/hooks/useOptions';
import { Music } from '@/lib/definitions';


interface PlaylistData {
    id: string;
    name: string;
    image: File;
}


const MusicPlayer: React.FC = ({
    searchParams,
    }: {
    searchParams?: {
        id?: string;
        music?: string;
        page?: string;
        songs: Music[];
    };
    }) => {

    const { selectedOption } = useOptionsStore();
    const query = searchParams?.music || '';
    const id = searchParams?.id || '';
    const fetchPlaylistDetail = usePlaylistStore((state) => state.fetchPlaylistDetail);
    const {playlistDetail} = usePlaylistStore()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [playlistData, setPlaylistData] = useState<PlaylistData | undefined>(playlistDetail?.dataValues);


    useEffect(() => {
        setPlaylistData(playlistDetail?.dataValues);
    }, [playlistDetail]);
    
    const otherDetails = playlistDetail?.playlistDetails;

    useEffect(() => {
        if (id) {
            fetchPlaylistDetail(id);
        }
    }, [id, fetchPlaylistDetail]);


    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            
            <div className={``}>
                <Header>
                    <h1 className="bg-neutral-900"></h1>
                </Header>
                <div className='mt-2 mb-7 px-6'>
                    
                    <div className="flex gap-x-4 items-center">
                        <div 
                            className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80" 
                            onClick={() => setIsModalEditOpen(true)}
                        >
                            <Image
                                className="w-full h-full object-cover"
                                src={playlistData?.image instanceof File ? URL.createObjectURL(playlistData?.image) : playlistData?.image || '/images/HenrryMusic.svg'}
                                alt={playlistData?.name!} 
                                width={300}
                                height={400}
                            />
                        </div>
                            
                        <div>
                            <h2
                                onClick={() => setIsModalEditOpen(true)}
                                className="text-4xl cursor-pointer hover:opacity-80 font-semibold"
                            >
                                {playlistData && capitalizeWords(playlistData.name)}
                            </h2>
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
        </div>
    );
}



export default MusicPlayer;
