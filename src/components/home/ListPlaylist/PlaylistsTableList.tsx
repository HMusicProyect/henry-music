"use client";
import { useEffect } from 'react';
import useStore from '@/store/songs.store';
import Link from 'next/link';
import MediaItem from '@/components/ui/sidebar/MediaItem';
import { Clock } from 'lucide-react';
import usePlaylistStore from '@/store/playlist.store';
import PlaylistItem from '@/components/home/ListPlaylist/PlaylistItem';

export default function TableList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { allPlaylists, fetchAllPlaylists } = usePlaylistStore();

  useEffect(() => {
    fetchAllPlaylists();
  }, [fetchAllPlaylists]);

  const filteredTodos = allPlaylists?.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.Artist?.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.Genre?.name.toLowerCase().includes(query.toLowerCase())
  );

  console.log('filteredTodos',filteredTodos);
  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3 pl-8">Title</th>
                <th className="px-4 py-3">autor</th>
                {/* <th className="px-4 py-3">Género</th> */}
                <th className="px-4 py-3">#</th>
      
              </tr>
            </thead>
            <tbody className="">
              {filteredTodos?.map((invoice : any) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-6 py-3 dark:border-slate-500 ">
                    
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                          <PlaylistItem
                            key={invoice.id}
                            data={invoice}
                          />
                        </div>
                      </div>
                    
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    {invoice.User.name}
                  </td>
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {invoice?.id}
                  </td>
              

                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    {invoice.Genre?.name}
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