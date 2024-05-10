"use client"

import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import usePlaylistStore from '@/store/actions/playlist/playlist.store';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import Image from 'next/image';
import { ModalComponent } from '@/components/ui/Modal/Modal';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import { Music } from '@/lib/definitions';
import useOnPlay from '@/store/hooks/useOnPlay';
import { Play } from 'lucide-react';
import { useSession } from 'next-auth/react';
import TablePlayList from '@/components/ui/sidebar/playlist/TablePlayList';
// import { TablePlayListCompact, EditPlaylistDetails, AddMusicToPlaylist} from '@/components/home/playlist/index.playlist';
import { TablePlayListCompact, EditPlaylistDetails, AddMusicToPlaylist} from '@/components/ui/playlist/index.playlist';


//comentario 

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
    const { data: session, status } = useSession();


    
    const fetchPlaylistDetail = usePlaylistStore((state) => state.fetchPlaylistDetail);
    
    const playlistData = usePlaylistStore((state) => {
        if (state.playlistDetail) {
            return state.playlistDetail.dataValues;
        } else {
            // Manejar el caso en que playlistDetail es undefined
            return null;
        }
    });

    const otherDetails = usePlaylistStore((state) => state.playlistDetail?.playlistDetails);
    const [set, setset ] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    
    useEffect(() => {
        fetchPlaylistDetail(id);
    }, [set, id ]);
    
    const onPlay = useOnPlay((otherDetails || []).map((song) => ({
        id: song.SongsID,
        name: song.SongsName, 
        image: song.SongsImage 
    })));

    const handlePlayClick = (songId: string) => {
        onPlay(songId);
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (playlistData?.name !== 'Favoritos') {
            setIsModalEditOpen(true);
        } else {
            return;
        }
    };

    
    if(status === "loading" || playlistData?.image === undefined){
        return <p>Cargando...</p>;
    }



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
                        setset={setset}
                        setIsModalOpen={setIsModalOpen}
                        // userId={userId}
                        id={id}
                    />
                </ModalComponent>

                <ModalComponent
                    isModalOpen={isModalEditOpen}
                    setIsModalOpen={setIsModalEditOpen}
                >

                    <EditPlaylistDetails
                        setset={setset}
                        setIsModalOpen={setIsModalEditOpen}
                    />

                </ModalComponent>
                <div className='mt-2 mb-7 px-6'>
                    <div className="flex gap-x-4 items-center">
                        <div
                            className="relative rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                            onClick={(e) => handleImageClick(e)}
                        >
                            <Image
                                className="w-full h-full object-cover"
                                src={typeof playlistData?.image === 'string' ? playlistData.image : '/images/HenrryMusic.svg'}
                                alt={playlistData?.name || 'Playlist Image'} 
                                width={300}
                                height={400}
                            />
                        </div>

                        <div>
                            <h2
                                onClick={(e) => handleImageClick(e)}
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
                                {otherDetails && otherDetails.length > 0 &&
                                    <button
                                        className='transition rounded-full flex items-center bg-yellow-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
                                        onClick={() => handlePlayClick(otherDetails[0].SongsID.toString())} 
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
                {/* <Input className='w-1/4' placeholder='Search Invoices' /> */}
                {/* <OptionsDropdown /> */}
            </div>
            <div className="mt-2 mb-7 px-6 flex justify-between items-center">
                <Suspense
                    key={query + JSON.stringify(otherDetails)}
                    fallback={<InvoicesTableSkeleton />}
                >
                    {selectedOption === 'list' ? (
                        <TablePlayList
                            playlistDetail={otherDetails}
                            setset={setset}
                            query={query}
                            id={id}
                        />
                    ) : (
                        <TablePlayListCompact
                            query={query}
                        />
                    )}
                </Suspense>
            </div>
        </div>
    );
}

export default MusicPlayer;