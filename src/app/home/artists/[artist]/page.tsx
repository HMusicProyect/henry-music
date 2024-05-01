"use client"
import React, { useEffect } from "react";
import useArtistStore from '@/store/artist.store';
import PlayButton from "@/components/home/PlayButton";
import Image from 'next/image';

interface ArtistProps {
    params: {
        artist: string;
    };
}

const Artist: React.FC<ArtistProps> = ({ params: { artist } }) => {
    const decodedArtist = decodeURIComponent(artist);
    const { artists, loading, getArtists } = useArtistStore();
    let artistData;

    useEffect(() => {
        getArtists();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Buscar el artista en la lista de artistas
    if (artists) {
        artistData = artists.find(item => item.name === decodedArtist);
    }

    //mostrar las canciones de este artista 
    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-lg">
           
            {artistData && (
                <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-orange-400/5 cursor-pointer hover:bg-orange-400/10 transition p-3">
                    <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
                        <Image
                            className='object-cover'
                            src={artistData.image}
                            alt='Image'
                            width={200} // Tamaño deseado en píxeles
                            height={200} // Tamaño deseado en píxeles
                        />
                    </div>
                    <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
                        <p className='text-md text-white pb-4 w-full truncate'>{artistData.name}</p>
                    </div>
                    <div className='absolute bottom-24 right-5'>
                        <PlayButton />
                    </div>
                </div>
            )}
        </div>
    </div>
    
    
    
    );
}

export default Artist;
