"use client"

import React, { useEffect, useState } from 'react';
import Header from "@/components/ui/header/Header";
import AlbumCard from "@/components/ui/sidebar/AlbumCard";
import { data } from '@/components/ui/sidebar/data';
import ListItem from "@/components/home/ListItem";
import useStore from '@/store/songs.store';
import SongsPage from '@/components/home/SongsPage';


const Home: React.FC = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // Número de elementos por página

  const { todos, getMusic } = useStore();

  useEffect(() => {
    getMusic();
  }, []);

  // Función para calcular el índice de inicio y fin de la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Función para obtener los datos de la página actual
  const getCurrentPageData = () => {
    return todos.slice(startIndex, endIndex);
  };

  // Función para manejar el cambio de página
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem 
              image="/images/liked.png" 
              name="Liked Songs" 
              href="liked" 
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
          <h2 className="text-xl">
                View More
            </h2>
        </div>
          <SongsPage songs={todos}/>
        
        <div className="mt-5 flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Albums</h1>
        </div>
        {/* Aquí puedes colocar la lógica para mostrar la lista de canciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          {getCurrentPageData().map((item, index) => (
            <AlbumCard 
              key={index} 
              imageUrl={item.image} 
              songName={item.name} 
              artistName={item.Artist?.name} 
            />
          ))}
        </div>
        {/* Botones de paginación */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(data.length / pageSize))].map((_, index) => (
            <button
              key={index}
              onClick={() => handleChangePage(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === index + 1 ? 'bg-blue-500' : ''
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

