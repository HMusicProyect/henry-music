"use client"

import React, { useEffect, useState } from 'react';
import Header from "@/components/ui/header/Header";
import AlbumCard from "@/components/ui/sidebar/AlbumCard";
import { data } from '@/components/ui/sidebar/data';
import ListItem from "@/components/home/ListItem";
import useStore from '@/store/songs.store';
import SongsPage from '@/components/home/SongsPage';
import Link from 'next/link';
import useAlbumsStore from '@/store/albums.store';


const Home: React.FC = () => {

  const { todos, getMusic } = useStore();
  const { albums, loading: albumsLoading, getAlbums } = useAlbumsStore();

  useEffect(() => {
    getMusic();
    getAlbums();
  }, []);


  const firstFourSongs = todos.slice(0, 4);
  if ( albumsLoading) {
    return <div>Loading...</div>;
}


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
          <Link href="/lists">
            <h2 className="text-xl hover:bg-neutral-400/10 p-2 rounded-md cursor-pointer">
                  View More
            </h2>
          </Link>
        </div>
             <SongsPage songs={firstFourSongs}/>
        <div className="mt-5 flex justify-between items-center">
          <h2 className="text-white text-2xl font-semibold">Newest Albums</h2>
        </div>
        <div className="flex  justify-center gap-3 items-center">
            {albums.map((album, index) => (
                <AlbumCard key={index} imageUrl={album.image} name={album.name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

