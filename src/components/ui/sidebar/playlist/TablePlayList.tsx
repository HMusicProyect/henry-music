"use client";
import MediaItem from '@/components/ui/sidebar/MediaItem';
import usePlaylistStore, { PlaylistDetailSong } from '@/store/actions/playlist/playlist.store';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect,useState, useMemo } from 'react';


export default function TablePlayList({
  query,
  setset,
  id
}: {
  query: string;
  setset: any;
  id: string;
}) {

  const searchParams = useSearchParams();
    const playlistID = searchParams.get('id') || '';

  const [deletePressed, setDeletePressed] = useState(false);

  const deleteSongFromPlaylist = usePlaylistStore((state) => state.deleteSongFromPlaylist);

  const playlistDetail = usePlaylistStore((state) => state.playlistDetail?.playlistDetails);
  
  const fetchPlaylistDetail = usePlaylistStore((state) => state.fetchPlaylistDetail);

  
  useEffect(() => {
  
      fetchPlaylistDetail(playlistID);
      console.log('El botón de eliminar fue presionado');
  }, [playlistDetail?.length]);

  // console.log(`playlistDetail`,playlistDetail.le);

  const filteredTodos = useMemo(() => {
    return playlistDetail?.filter((invoice) =>
      typeof query === 'string' && (
        invoice.SongsName?.toLowerCase().includes(query.toLowerCase()) ||
        invoice.ArtistName.toLowerCase().includes(query.toLowerCase()) ||
        invoice.GenreName.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [playlistDetail, query]);

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
              {filteredTodos?.map((invoice : PlaylistDetailSong) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-6 py-3 dark:border-slate-500 ">
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                          <Link
                              href={`/home/lists/${invoice.SongsID}`}
                              key={invoice.id}
                          >
                              <MediaItem
                                onClick={() => { }}
                                key={invoice.id}
                                data={invoice}
                              />
                          </Link>
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
                    {invoice?.SongsID}
                  </td>
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    <button 
                        className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteSongFromPlaylist(invoice?.id);
                            setset((prev: number) => prev + 1);
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