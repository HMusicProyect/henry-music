"use client"

import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import usePlaylistStore from '@/store/playlist.store';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import Image from 'next/image';
import { ModalComponent } from '@/components/ui/Modal/Modal';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Input } from '@/components/ui/input';
import { useOptionsStore } from '@/store/hooks/useOptions';
import { Music } from '@/lib/definitions';
import TablePlayList from '@/components/ui/sidebar/playlist/TablePlayList';
import AddMusicToPlaylist from '@/components/home/playlist/addMusic';
import EditPlaylistDetails from '@/components/home/playlist/editPlaylist';
import TablePlayListCompact from '@/components/home/playlist/TablePlayListCompact';
import useOnPlay from '@/store/hooks/useOnPlay';
import { Play } from 'lucide-react';

interface PlaylistData {
    id: string;
    name: string;
    image: string; // Cambiado a string en lugar de File
}

interface SongData {
    SongsID: string;
    SongsName: string;
    SongsImage: string;
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

    const playlistDetail = usePlaylistStore((state) => state.playlistDetail);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [playlistData, setPlaylistData] = useState<PlaylistData | undefined>(playlistDetail?.dataValues);

    useEffect(() => {
        setPlaylistData(playlistDetail?.dataValues);
    }, [playlistDetail]);

    const otherDetails = playlistDetail?.playlistDetails;
    const onPlay = useOnPlay(otherDetails?.map((song: SongData) => ({ id: song.SongsID, name: song.SongsName, image: song.SongsImage })));

    useEffect(() => {
        if (id) {
            fetchPlaylistDetail(id);
        }
    }, [id, fetchPlaylistDetail]);

    const handlePlayClick = (songId: string) => {
        onPlay(songId);
    };

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
                    <EditPlaylistDetails />
                </ModalComponent>
                <div className='mt-2 mb-7 px-6'>
                    <div className="flex gap-x-4 items-center">
                        <div
                            className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                            onClick={() => setIsModalEditOpen(true)}
                        >
                            <Image
                                className="w-full h-full object-cover"
                                src={playlistData?.image || '/images/HenrryMusic.svg'} // Modificado para acceder a playlistData.image directamente
                                alt={playlistData?.name || 'Playlist Image'} // Añadido valor predeterminado para alt
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
                            {otherDetails && // Asegúrate de que otherDetails esté definido antes de renderizar el botón de reproducción
                                <button
                                    className='transition rounded-full flex items-center bg-yellow-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
                                    onClick={() => handlePlayClick(otherDetails[0]?.SongsID)} // Cambiado a otherDetails[0]?.SongsID para acceder al primer SongsID
                                >
                                    <Play className="text-black" fill="black" size={25} />
                                </button>
                            }
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

            <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
                <Input className='w-1/4' placeholder='Search Invoices' />
                <OptionsDropdown />
            </div>
            <div className="mt-2 mb-7 px-6 flex justify-between items-center">
                <Suspense
                    key={query + JSON.stringify(otherDetails)} // Cambiado para asegurar que React reconozca los cambios en otherDetails
                    fallback={<InvoicesTableSkeleton />}
                >
                    {selectedOption === 'list' ? (
                        <TablePlayList
                            query={query}
                            currentPage={otherDetails}
                        />
                    ) : (
                        <TablePlayListCompact
                            query={query}
                            currentPage={otherDetails}
                        />
                    )}
                </Suspense>
            </div>
        </div>
    );
}

export default MusicPlayer;
