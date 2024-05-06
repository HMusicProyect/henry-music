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
import EditPlaylistDetails from '@/components/home/playlist/editPlaylist';

interface PlaylistData {
    id: string;
    name: string;
    image: File;
}


export default function MusicPlayer() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const id = searchParams.get('id') || '';
    // const token = searchParams.get('token');

    const fetchPlaylistDetail = usePlaylistStore((state) => state.fetchPlaylistDetail);
    const deleteSongFromPlaylist = usePlaylistStore((state) => state.deleteSongFromPlaylist);
    const updatePlaylist = usePlaylistStore((state) => state.updatePlaylist);
    const playlistDetail = usePlaylistStore((state) => state.playlistDetail);
    
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [playlistData, setPlaylistData] = useState<PlaylistData | undefined>(playlistDetail?.dataValues);
    
    useEffect(() => {
        setPlaylistData(playlistDetail?.dataValues);
    }, [playlistDetail]);
    
    const otherDetails = playlistDetail?.playlistDetails;

    console.log( 'playlistDetails',otherDetails);

    const handleNameEdit = (newName: string) => {
        if (playlistData) {
            Promise.resolve(updatePlaylist(playlistData.id, newName, playlistData.image))
                .then(() => {
                    setPlaylistData((prevState: PlaylistData | undefined) => prevState ? { ...prevState, name: newName } : undefined);
                });
        }
    };

    // const handleImageEdit = (newImage: File) => {
    //     if (playlistData) {
    //         Promise.resolve(updatePlaylist(playlistData.id, playlistData.name, newImage))
    //             .then(() => {
    //                 setPlaylistData((prevState: PlaylistData | undefined) => prevState ? { ...prevState, image: newImage } : undefined);
    //             });
    //     }
    // };

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

                <ModalComponent
                    isModalOpen={isModalEditOpen}
                    setIsModalOpen={setIsModalEditOpen}
                >
                        <EditPlaylistDetails
                            playlistData={playlistData}
                            updatePlaylist={updatePlaylist}
                        />
                </ModalComponent>
                        <button 
                            onClick={() => setIsModalEditOpen(true)}
                            >
                                edit Playlist
                            </button>
                <div className='mt-2 mb-7 px-6'>
                    
                    <div className="flex gap-x-4 items-center">
                        
                    <div 
                        className="relative rounded-lg overflow-hidden" 
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
                            <button
                                onClick={() => setIsModalEditOpen(true)}
                                className="text-10x10 font-semibold"
                            >
                                <h2
                                >
                                    {playlistData && capitalizeWords(playlistData.name)}
                                </h2>
                            </button>
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
            <div className="flex justify-center items-center mt-4">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Song to Playlist
                </button>
            </div>

            <div className='mt-8 mb-7 px-6 flex gap-x-16'>
                <div className='w-1/2 flex flex-col gap-8'>
                    <h2 className='text-left'>Explore songs of the same genre</h2>
                    {otherDetails?.map((detail: any) => {
                        return (
                            <Link
                                href={`/home/lists/${detail.SongsID}`}
                                key={detail.SongsID}
                            >
                                <MediaItem
                                    data={detail}
                                /> 
                                <button 
                                    className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                                        onClick={(e) => {
                                        // Evita que el evento de clic se propague al elemento padre (Link)
                                        e.stopPropagation();
                                        // Llama a deleteSongFromPlaylist con el id de la canción
                                        deleteSongFromPlaylist(detail.id);
                                    }}
                                >
                                    ✖
                                </button>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
