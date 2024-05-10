"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import useArtistStore from '@/store/artist.store';
import useUpdateArtistsModal from '@/store/hooks/useUpdateArtists';
import { Pen } from 'lucide-react';

const TableArtistCompact: React.FC<{
  query: string;
  currentPage: number;
}> = ({ query, currentPage }) => {
  const editUsersModal = useUpdateArtistsModal();
  const { artists, getArtists } = useArtistStore();
  const [page, setPage] = useState(currentPage);
  const itemsPerPage = 6;

  useEffect(() => {
    getArtists();
    setPage(currentPage);
  }, [currentPage]);

  const sortedArtists = useMemo(() => {
    return [...artists].sort((a, b) => (b.id || 0) - (a.id || 0));
  }, [artists]);

  const totalItems = sortedArtists.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentArtists = sortedArtists.slice(startIndex, endIndex);

  const onClickEdit = (artistId: string) => {
    console.log(artistId)
    editUsersModal.onOpen(artistId);
  }

  const changePage = (newPage: number) => {
    setPage(newPage);
  }

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3 ">Artist Name</th>
                <th className="px-4 py-3 ">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {currentArtists.map((album: any, index: number) => (
                <tr
                  key={album.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <div className="flex items-center text-sm">
                      <div className="relative mr-3 rounded-full md:block">
                        {capitalizeWords(album.name)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <button
                      className="p-2 mr-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() => onClickEdit(album.id)}
                    >
                      <Pen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded-md ${
              page === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-800'
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

export default TableArtistCompact;