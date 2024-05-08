"use client";
import { useEffect } from 'react';
import useStore from '@/store/songs.store';
import { capitalizeWords } from '@/utils/CapitalizeWords';

export default function TableSongsCompact({
  query,
  currentPage,
  sortDirection
}: {
  query: string;
  currentPage: number;
  sortDirection:string;
}) {
  const { todos, getMusic } = useStore();

  useEffect(() => {
    getMusic();
  }, []);

  const filteredTodos = todos?.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.Artist?.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.Genre?.name.toLowerCase().includes(query.toLowerCase())
  );

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a && b) {
      if (sortDirection === 'asc') {
        return (a.id || 0) - (b.id || 0);
      } else {
        return (b.id || 0) - (a.id || 0);
      }
    } else {
      return 0;
    }
  });
  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3 ">Title</th>
                <th className="px-4 py-3">Artist</th>
                <th className="px-4 py-3">Género</th>
              </tr>
            </thead>
            <tbody className="">
              {sortedTodos?.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">

                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                      {invoice?.id}
                        </div>
                      </div>
 
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">

                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {capitalizeWords(invoice.name)}
                        </div>
                      </div>
   
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
   
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.Artist?.name}
                        </div>
                      </div>
       
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
     
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.Genre?.name}
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