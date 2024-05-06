"use client";
import { useEffect } from 'react';
import useStore from '@/store/songs.store';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import MediaItem from '@/components/ui/sidebar/MediaItem';
import usePlaylistStore from '@/store/playlist.store';

interface PlaylistDetails {
    ArtistName: string;
    GenreName: string;
    PlaylistID: string;
    SongsID: number;
    SongsImage: string;
    SongsName: string;
    id: string;
}

export default function TablePlayList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: PlaylistDetails[];
}) {

  const deleteSongFromPlaylist = usePlaylistStore((state) => state.deleteSongFromPlaylist);

  console.log('currentPage', currentPage);
  const filteredTodos = currentPage?.filter((invoice) =>
    typeof query === 'string' && (
      invoice.SongsName?.toLowerCase().includes(query.toLowerCase()) ||
      invoice.ArtistName.toLowerCase().includes(query.toLowerCase()) ||
      invoice.GenreName.toLowerCase().includes(query.toLowerCase())
    )
  );

  console.log('filteredTodos', filteredTodos);

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3 pl-8">Title</th>
                <th className="px-4 py-3">Artist</th>
                <th className="px-4 py-3">Género</th>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3"></th>
      
              </tr>
            </thead>
            <tbody className="">
              {filteredTodos?.map((invoice : PlaylistDetails) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-6 py-3 dark:border-slate-500 ">
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                          <MediaItem
                            data={invoice}
                          />
                        </div>
                      </div>
                  </td>
              
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    {invoice.ArtistName}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    {invoice.GenreName}
                  </td>
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {invoice?.id}
                  </td>
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    <button 
                        className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                          onClick={(e) => {
                          // Evita que el evento de clic se propague al elemento padre (Link)
                          e.stopPropagation();
                          // Llama a deleteSongFromPlaylist con el id de la canción
                          deleteSongFromPlaylist(invoice?.id);
                      }}
                    >
                        ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}