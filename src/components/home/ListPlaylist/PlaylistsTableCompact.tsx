"use client";
import { useEffect } from 'react';
import useStore from '@/store/songs.store';
import Link from 'next/link';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import usePlaylistStore from '@/store/playlist.store';

export default function TableCompact({
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
              {filteredTodos?.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                  <Link href={`/lists/${invoice.id}`}>
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                      {invoice?.id}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Link href={`/lists/${invoice.id}`}>
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {capitalizeWords(invoice.name)}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Link href={`/lists/${invoice.id}`}>
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.Artist?.name}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <Link href={`/lists/${invoice.id}`}>
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.Genre?.name}
                        </div>
                      </div>
                    </Link>
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