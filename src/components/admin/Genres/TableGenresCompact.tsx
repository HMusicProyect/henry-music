import React, { useEffect, useState } from 'react';
import useGenreStore from '@/store/genres.store';

const ITEMS_PER_PAGE = 10;

export default function TableGenresCompact({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { genres, getGenres } = useGenreStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(currentPage - 1);

  useEffect(() => {
    getGenres();
    setCurrentPageIndex(currentPage - 1);
  }, [currentPage]);

  const filteredGenres = genres?.filter((genre) =>
    genre.name.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGenres.length / ITEMS_PER_PAGE);
  const startIndex = currentPageIndex * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredGenres.length);
  const currentGenres = filteredGenres.slice(startIndex, endIndex);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
  };

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        {filteredGenres.length === 0 ? (
          <div className="text-center text-red-500 font-bold">No se encontraron resultados</div>
        ) : (
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3 pl-8">Name</th>
                </tr>
              </thead>
              <tbody className="">
                {currentGenres.map((genre: any, index: number) => (
                  <tr
                    key={genre.id}
                    className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                  >
                    <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-3 dark:border-slate-500 ">
                      {genre.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`mx-1 px-4 py-2 rounded-md ${
                    currentPageIndex === index ? 'bg-gray-900 text-white' : 'bg-gray-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
