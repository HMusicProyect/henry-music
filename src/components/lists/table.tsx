"use client";
import { useEffect } from 'react';
import useStore from '@/store/songs.store';
import Link from 'next/link';
import Image from 'next/image';

export default function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
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

  return (
<section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-gray-600 dark:text-gray-100 bg-neutral-100/10 dark:bg-slate-700 border-b border-gray-300 dark:border-slate-700 divide-x dark:divide-slate-600">
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Artista</th>
                <th className="px-4 py-3">Género</th>
                {/* <th className="px-4 py-3">Ruta de la música</th> */}
              </tr>
            </thead>
            <tbody className="bg-neutral-100/10 dark:bg-slate-600 dark:border-slate-500 divide-y dark:divide-gray-500">
              {filteredTodos?.map((invoice) => (
                <tr 
                  key={invoice.id}
                  className="text-gray-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-200 dark:hover:bg-slate-500"
                >
                  <td className="px-6 py-3 dark:border-slate-500 ">
                    <Link href={`/lists/${invoice.id}`}>
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full" 
                            src={invoice.image} 
                            alt={`${invoice.name}'s profile picture`} 
                            width={64} 
                            height={64} 
                          />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        {/* <div>
                          <p className="font-semibold text-black dark:text-white">
                            {invoice.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {invoice.Artist?.name}
                          </p>
                        </div> */}
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {invoice?.name}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    {invoice.Artist?.name}
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