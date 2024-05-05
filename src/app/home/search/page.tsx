"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import SearchInput from '@/components/search/SearchInput';
import SearchContent from '@/components/search/SearchContent';
import getSongByTitle, { SearchResults } from '@/store/actions/getSongsByTitle';
import Link from 'next/link';
import useGenreStore from '@/store/genres.store';
import { colorDarkPallette } from '@/utils/ColorDarkPallette';

interface SearchProps {
  searchParams: {
    title: string;
  }
}

const Search = ({ searchParams }: SearchProps) => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { genres, getGenres } = useGenreStore();
  
  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        const data = await getSongByTitle(searchParams.title);
        setSearchResults(data);
        if (!data || Object.values(data).every(val => !val || val.length === 0)) {
          setError('No se encontraron resultados para: ' + searchParams.title);
        } else {
          setError(null);
        }
      } catch (error) {
        setError('Error al cargar los resultados de búsqueda');
      }
    };

    if (searchParams.title && searchParams.title.trim() !== '') {
      loadSearchResults();
    } else {
      setSearchResults(null);
      setError(null);
    }
  }, [searchParams.title]);


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
      {!searchResults && (
        <>
            <p className='px-6 mt-2 text-2xl'>
              ¡Comienza tu camino con H-Music!
            </p>
            <div className="mb-7 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre, index) => (
              <Link key={genre.id} href={`/home/genres/${genre.name}`}>
                <div className={`mt-12 h-56 w-56 relative group flex flex-col items-start justify-start rounded-md overflow-hidden gap-x-4 cursor-pointer transition p-3`} style={{ backgroundColor: colorDarkPallette[index % colorDarkPallette.length] }}>
                  <p className='text-white text-2xl font-bold'>
                    {genre.name}
                  </p>
                </div>
              </Link>
            ))}
            </div>
        </>
      )}
      <div className="mt-2 mb-7 px-6 ">
        {searchResults && <SearchContent searchResults={searchResults} searchParams={searchParams} error={error} />}
      </div>
    </div>
  );
};

export default Search;
