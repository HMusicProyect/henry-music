"use client"
import React, { useState } from 'react';
import { data } from '@/components/ui/sidebar/data'; 
import AlbumCard from "@/components/ui/sidebar/AlbumCard";

const Search: React.FC = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    const filtered = data.filter(
      item =>
        item.songName.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.artistName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="mt-2 mb-7 px-6">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar canción o artista..."
          className="px-4 py-2 border rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          {filteredData.map((item, index) => (
            <AlbumCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;