"use client"
import React, { useState } from 'react';
import { data } from '@/components/ui/sidebar/data'; 
import AlbumCard from "@/components/ui/sidebar/AlbumCard";

const Search: React.FC = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [query, setQuery] = useState('');
  const [orderBy, setOrderBy] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    const filtered = data.filter(
      item =>
        item.songName.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.artistName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Resetear a la primera página al hacer una nueva búsqueda
  };

  const handleSort = (selectedOrder: string) => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => {
      if (selectedOrder === 'asc') {
        return a.releaseYear - b.releaseYear;
      } else {
        return b.releaseYear - a.releaseYear;
      }
    });
    setFilteredData(sortedData);
    setOrderBy(selectedOrder);
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
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar canción o artista..."
          className="px-4 py-2 border rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
        />
        <select
          value={orderBy}
          onChange={(e) => handleSort(e.target.value)}
          className="mt-2 px-4 py-2 border rounded-full bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Fecha de estreno (descendente)</option>
          <option value="asc">Fecha de estreno (ascendente)</option>
        </select>
      </div>
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
  );
};

export default Search;
