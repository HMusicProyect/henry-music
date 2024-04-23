"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header/Header';
import SearchInput from '@/components/search/SearchInput';
import SearchContent from '@/components/search/SearchContent';
import getSongByTitle, { SearchResults } from '@/store/actions/getSongsByTitle';

interface SearchProps {
  searchParams: {
    title: string;
  }
}

const Search = ({ searchParams }: SearchProps) => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        <div className="text-white text-2xl font-semibold flex items-center justify-center min-h-[40vh]">
          <p>
            ¡Comienza tu camino con H-Music!
          </p>
        </div>
      )}
      <div className="mt-2 mb-7 px-6 ">
        {searchResults && <SearchContent searchResults={searchResults} searchParams={searchParams} error={error} />}
      </div>
    </div>
  );
};

export default Search;
