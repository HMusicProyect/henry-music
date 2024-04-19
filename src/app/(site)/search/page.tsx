"use client"
import React, { useEffect, useState } from 'react';
import { data } from '@/components/ui/sidebar/data';
import AlbumCard from "@/components/ui/sidebar/AlbumCard";
import Header from '@/components/ui/header/Header';
import SearchInput from '@/components/search/SearchInput';
import SearchContent from '@/components/search/SearchContent';
import useStore, { Music } from '@/store/songs.store';
import { Input } from '@/components/ui/input';
import getSongByTitle from '@/store/actions/getSongsByTitle';


interface SearchProps {
  searchParams: {
    title: string;
  }
}

const Search = ({searchParams}: SearchProps) => {

  const { todos, getMusic } = useStore();
  const [songs, setSongs] = useState<Music[]>([]); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSongsByTitle = async () => {
      try {
        if (searchParams.title.trim() !== '') {
          const fetchedSongs = await getSongByTitle(searchParams.title);
          setSongs(fetchedSongs);
          setError(null);
        } else {
          setSongs([]);
          setError('No se proporcionó ningún título de canción');
        }
      } catch (error) {
        setError('Error al cargar las canciones');
      }
    };

    loadSongsByTitle();
  }, [searchParams.title, getMusic]);

  useEffect(() => {
    getMusic();
  }, []);
  const [filteredData, setFilteredData] = useState(data);
  const { searchMusic } = useStore();
  const [searchResults, setSearchResults] = useState<Music[]>([]);
  const [query, setQuery] = useState('');
  const [orderByDate, setOrderByDate] = useState('desc');
  const [orderByName, setOrderByName] = useState('alphaAsc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setCurrentPage(1);
  };

  const handleSortByDate = (selectedOrder: string) => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      if (selectedOrder === 'asc') {
        return a.releaseYear - b.releaseYear;
      } else {
        return b.releaseYear - a.releaseYear;
      }
    });
    setFilteredData(sortedData);
    setOrderByDate(selectedOrder);
  };

  const handleSortByName = (selectedOrder: string) => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      const fieldA = a.songName.toLowerCase();
      const fieldB = b.songName.toLowerCase();
      if (selectedOrder === 'alphaAsc') {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    });
    setFilteredData(sortedData);
    setOrderByName(selectedOrder);
  };

  // Calcula el número total de páginas
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Calcula los índices de inicio y fin de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filtra los datos basados en la página actual y el tamaño de la página
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Funciones para manejar la navegación entre páginas
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Search
        </h1>
      </Header>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
         <SearchInput />
        <select
          value={orderByDate}
          onChange={(e) => handleSortByDate(e.target.value)}
          className="mt-2 px-4 py-2 border rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Fecha de estreno (descendente)</option>
          <option value="asc">Fecha de estreno (ascendente)</option>
        </select>
        <select
          value={orderByName}
          onChange={(e) => handleSortByName(e.target.value)}
          className="mt-2 px-4 py-2 border rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="alphaAsc">Nombre de canción (A-Z)</option>
          <option value="alphaDesc">Nombre de canción (Z-A)</option>
        </select>
      </div>
      <div className="mt-2 mb-7 px-6 ">
      <h3 className='text-white text-2xl font-semibold'>Songs</h3>
      <SearchContent songs={songs} error={error} />
      <h3 className='text-white text-2xl font-semibold mt-4'>Albums</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
        {paginatedData.map((item, index) => (
          <AlbumCard key={index} {...item} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 border rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Anterior
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Siguiente
        </button>
      </div>
      </div>
    </div>
  );
};

export default Search;

