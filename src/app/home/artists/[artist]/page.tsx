"use client"
import React, { useEffect, useState } from "react";
import useArtistStore from '@/store/artist.store';
import PlayButton from "@/components/home/PlayButton";
import Image from 'next/image';
import useStore from '@/store/songs.store';
import { Music } from "@/lib/definitions";
import Link from "next/link";
import { capitalizeWords } from "@/utils/CapitalizeWords";

interface ArtistProps {
    params: {
        artist: string;
    };
}

const Artist: React.FC<ArtistProps> = ({ params: { artist } }) => {
    const decodedArtist = decodeURIComponent(artist);
    const { artists, loading: artistLoading, getArtists } = useArtistStore();
    const { todos, loading: musicLoading, getMusic } = useStore();
    const [filteredTodos, setFilteredTodos] = useState<Music[]>([]);
    let artistData;

    useEffect(() => {
        getArtists();
        getMusic();
    }, []);

    
    useEffect(() => {
       if (todos.length > 0) {
         const filtered = todos.filter((todo) => todo.Artist?.name == decodedArtist);
         setFilteredTodos(filtered);
       }
    }, [todos, artist]);

    if (artistLoading || musicLoading) {
        return <div>Loading...</div>;
    }

    // Buscar el artista en la lista de artistas
    if (artists) {
        artistData = artists.find(item => item.name === decodedArtist);
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-lg">
                {artistData && (
                   <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-orange-400/5 cursor-pointer hover:bg-orange-400/10 transition p-3 mr-4 mt-2" style={{ transform: 'translateY(8px)' }}>
                        <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
                            <Image
                                className='object-cover'
                                src={artistData.image}
                                alt='Image'
                                width={200} 
                                height={200} 
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

            <ul> 
            <h1 className='text-white font-semibold' style={{ fontSize: '2rem', marginBottom: '1rem' }}>Canciones de {artistData?.name}</h1>

        {filteredTodos?.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform hover:bg-neutral-400/10 rounded-md bg-neutral-950"
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                  <Link href={`/lists/${invoice.id}`}>
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                      {invoice?.id}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <img src={invoice.image} alt={invoice.name} className="w-12 h-12 object-cover mt-3 transform translate-y-4"/>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Link href={`/lists/${invoice.id}`}>
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {capitalizeWords(invoice.name)}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Link href={`/lists/${invoice.id}`}>
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.Artist?.name}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Link href={`/lists/${invoice.id}`}>
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.Genre?.name}
                        </div>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
        </ul>

        </div>
    );
}

export default Artist;
