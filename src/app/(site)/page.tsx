"use client"

import ListItem from "@/components/home/ListItem";
import Header from "@/components/ui/header/Header";
import AlbumCard from "@/components/ui/sidebar/AlbumCard";
interface SongData {
  imageUrl: string;
  songName: string;
  artistName: string;
}
export default function Home() {
  const data: SongData[] = [
    {
      imageUrl: "https://akamai.sscdn.co/uploadfile/letras/albuns/6/c/2/7/1068271619182076.jpg",
      songName: "Album 1",
      artistName: "Artista 1"
    },
    {
      imageUrl: "https://f4.bcbits.com/img/a0465333642_10.jpg",
      songName: "Album 2",
      artistName: "Artista 2"
    },
    {
      imageUrl: "https://radiotubers.los40.com/los40/imagenes/2017/11/28/album/1511885438_220718_1512040978_album_normal.jpg",
      songName: "Album 3",
      artistName: "Artista 3"
    },
    {
      imageUrl: "https://www.cinconoticias.com/wp-content/uploads/tipos-de-albumes.jpg",
      songName: "Album 3",
      artistName: "Artista 3"
    }
  ];

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome Back
          </h1>
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
          <h1 className="text-white text-2xl font-semibold">
            Newest Songs
          </h1>
        </div>
        <div className="">
          List of Songs!
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
        
      {data.map((item, index) => (
            <AlbumCard key={index} {...item} />
          ))}
          </div>
    </div>
    
  );
}

