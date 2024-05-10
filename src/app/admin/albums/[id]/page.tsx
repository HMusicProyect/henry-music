"use client"
import { Suspense, useEffect, useState } from 'react';
import Header from "@/components/ui/header/Header";
import useAlbumsStore, { AlbumDetail } from '@/store/albums.store';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import Image from 'next/image';
import MediaItem from '@/components/ui/sidebar/MediaItem';
import { Plus } from 'lucide-react';
import useAddSongsToAlbum from '@/store/hooks/useAddSongsToAlbum';

interface Props {
    id: number;
}

export default function AlbumIdPage({ params }: { params: Props }) {
    const { getAlbumById } = useAlbumsStore();
    const [albumDetail, setAlbumDetail] = useState<AlbumDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const id = params.id;
    const Songs = albumDetail?.album.Songs;
    const uploadModal = useAddSongsToAlbum();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumData = await getAlbumById(params.id);
                setAlbumDetail(albumData);
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los detalles del álbum');
                setLoading(false);
            }
        };

        fetchData();
    }, [getAlbumById, params.id]);
    useEffect(() => {
        const unsubscribe = useAlbumsStore.subscribe(
            (newState) => {
                if (albumDetail && newState.albums) {
                    const updatedAlbum = newState.albums.find((album) => album.id === albumDetail.album.id);
                    if (updatedAlbum) {
                        const updatedAlbumDetail: AlbumDetail = {
                            album: {
                                ...albumDetail.album,
                                ...updatedAlbum,
                            }
                        };
                        setAlbumDetail(updatedAlbumDetail);
                    }
                    
                }
            }
        );
    
        return unsubscribe;
    }, [albumDetail]);
    
    

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!albumDetail) {
        return <div>No se encontraron detalles del álbum</div>;
    }
    const onClick = () => {
        return uploadModal.onOpen(id.toString());
      }

    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            <div className={``}>
                <Header>
                    <h1 className="bg-neutral-900"></h1>
                </Header>
                <div className='mt-2 mb-7 px-6'>
                    <div className="flex gap-x-4 items-center">
                        <div className="relative rounded-lg overflow-hidden">
                            <Image
                                className="w-full h-full object-cover"
                                src={albumDetail.album.image}
                                alt={albumDetail.album.name}
                                width={300}
                                height={400}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">{capitalizeWords(albumDetail.album.name)}</h2>
                            <button
                                onClick={onClick}
                                className='transition rounded-full flex items-center bg-yellow-500 p-2 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
                            >
                                <Plus className="text-black" fill="black" size={30} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-2 mb-7 px-6 flex gap-4 flex-col justify-between ">
                    <h2 className='mt-8 text-2xl font-semibold text-white text-start'>Canciones que pertenecen</h2>
                    <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                    {Array.isArray(Songs) && Songs.length > 0 ? (
                            Songs.map((item) => (
                                <MediaItem
                                    key={item.id}
                                    onClick={() => { }}
                                    data={item}
                                />
                            ))
                        ) : (
                            <p className="text-white">Este álbum no contiene canciones.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
