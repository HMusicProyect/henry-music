"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import useAlbumsStore from '@/store/albums.store';
import useGenreStore from '@/store/genres.store';


export default function TableGenresCompact({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { genres, getGenres } = useGenreStore();

  useEffect(() => {
    getGenres();
  }, []);


  const filteredAlbums = genres?.filter((album) =>
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
                <th className="px-4 py-3 ">Album Name</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredAlbums?.map((album: any) => (
                <tr
                  key={album.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    <div className="flex items-center text-sm">
                      <div className="relative mr-3 rounded-full md:block">
                        {album?.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <div className="flex items-center text-sm">
                      <div className="relative mr-3 rounded-full md:block">
                        {capitalizeWords(album.name)}
                      </div>
                    </div>
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
