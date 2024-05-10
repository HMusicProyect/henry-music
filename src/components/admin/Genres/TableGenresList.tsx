import React, { useState, useEffect } from 'react';
import useGenreStore from '@/store/genres.store';

const TableGenresCompact: React.FC<{
  query: string;
  currentPage: number;
}> = ({ query, currentPage }) => {
  const { genres, getGenres } = useGenreStore();
  const [filteredGenres, setFilteredGenres] = useState<any[]>([]);
  const [page, setPage] = useState(currentPage);
  const itemsPerPage = 10;

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    const filtered = genres?.filter(genre =>
      genre.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGenres(filtered);
  }, [genres, query]);

  const totalItems = filteredGenres.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentGenres = filteredGenres.slice(startIndex, endIndex);

  const changePage = (newPage: number) => {
    setPage(newPage);
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
          </div>
        )}
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
};

export default TableGenresCompact;
