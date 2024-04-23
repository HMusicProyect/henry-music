"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import SearchInput from '@/components/search/SearchInput';
import SearchContent from '@/components/search/SearchContent';
import useStore from '@/store/songs.store';
import getSongByTitle from '@/store/actions/getSongsByTitle';
import { Music } from '@/lib/definitions';


interface SearchProps {
  searchParams: {
    title: string;
  }
}

const Search = ({ searchParams }: SearchProps) => {

  const { todos, getMusic } = useStore();
  const [songs, setSongs] = useState<Music[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSongsByTitle = async () => {
      try {
        const fetchedSongs = await getSongByTitle(searchParams.title);
        setSongs(fetchedSongs);
        
        // Si no se encuentran resultados en la búsqueda, establecer el mensaje de error
        if (fetchedSongs.length === 0) {
          setError('No se encontraron resultados para: ' + searchParams.title);
        } else {
          setError(null);
        }
      } catch (error) {
        setError('Error al cargar las canciones');
      }
    };
  
    // Solo cargar canciones si hay un título de canción proporcionado
    if (searchParams?.title?.trim() !== '') {
      loadSongsByTitle();
    } else {
      // Si no hay ningún título de canción, vacía la lista de canciones y elimina cualquier mensaje de error
      setSongs([]);
      setError(null);
    }
  }, [searchParams.title, getMusic]);
  

  useEffect(() => {
    getMusic();
  }, []);


  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Search
        </h1>
      </Header>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <SearchInput />
      </div>
      <div className="mt-2 mb-7 px-6 ">
        <SearchContent songs={songs} error={error} />
      </div>
    </div>
  );
};

export default Search;

