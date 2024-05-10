"use client"
import { useState, useEffect, useMemo } from 'react';
import useArtistStore from '@/store/artist.store';
import useUpdateArtistsModal from '@/store/hooks/useUpdateArtists';
import { Pen } from 'lucide-react';
import Image from 'next/image';

export default function TableArtistList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const editUsersModal = useUpdateArtistsModal();
  const { artists, getArtists } = useArtistStore();
  const [page, setPage] = useState(currentPage);
  const [filteredArtists, setFilteredArtists] = useState<any[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    getArtists();
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = artists.filter((artist: any) =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArtists(filtered);
  }, [query, artists]);

  const totalItems = filteredArtists.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentArtists = filteredArtists.slice(startIndex, endIndex);

  const onClickEdit = (artistId: string) => {
    editUsersModal.onOpen(artistId);
  }

  const changePage = (newPage: number) => {
    setPage(newPage);
  }

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        {totalItems === 0 ? (
          <div className="text-center text-red-500 font-bold">No se encontraron resultados</div>
        ) : (
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3 pl-8">Artist Name</th>
                  <th className="px-4 py-3">Photography</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {currentArtists.map((artist: any, index: number) => (
                  <tr
                    key={artist.id}
                    className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                  >
                    <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-3 dark:border-slate-500 ">
                      {artist.name}
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                      <Image className='rounded-full' src={artist.image} alt={artist.name} width={100} height={100} />
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                      <button
                        className="p-2 mr-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                        onClick={() => onClickEdit(artist.id)}
                      >
                        <Pen />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
      <div className="flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded-md ${page === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-800'
              }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}