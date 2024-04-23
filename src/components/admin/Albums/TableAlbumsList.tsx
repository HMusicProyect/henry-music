"use client";
import { useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import MediaItem from '../../ui/sidebar/MediaItem';
import { Clock } from 'lucide-react';
import useAlbumsStore from '@/store/albums.store';

export default function TableAlbumsList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { albums, getAlbums } = useAlbumsStore();

  useEffect(() => {
    getAlbums();
  }, []);

  const filteredAlbums = albums?.filter((album) =>
    album.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3 pl-8">Name</th>
                <th className="px-4 py-3">Image</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredAlbums?.map((album : any) => (
                <tr
                  key={album.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {album?.id}
                  </td>
                  <td className="px-6 py-3 dark:border-slate-500 ">
                  {album?.name}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Image src={album.image} alt={album.name} width={100} height={100} />
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
