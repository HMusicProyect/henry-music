"use client"
import React, { useEffect, useState } from 'react';
import useStore from '@/store/songs.store';
import Link from 'next/link';
import MediaItem from '../ui/sidebar/MediaItem';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function TableList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { todos, getMusic } = useStore();
  const { data: session } = useSession();
  const [page, setPage] = useState(currentPage);
  const itemsPerPage = 10;
  const userSession = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMusic();
  }, []);

  const filteredTodos = todos?.filter(
    (invoice) =>
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.Artist?.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.Genre?.name.toLowerCase().includes(query.toLowerCase())
  );

  // Calcular índices de inicio y fin para la paginación
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = filteredTodos?.slice(startIndex, endIndex);

  const handleHeartClick = async (id: string) => {
    const userId = userSession?.id; // Reemplaza esto con el ID de usuario actual
    setIsLoading(true);

    if (!userId) {
      toast.error('User not found');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, songId: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Successful addition to favorites.");
    } catch (error) {
      toast.error(`Musicasong already exists in favorites.`);
      setIsLoading(true);
      console.error('Error adding song to favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3 pl-8">Title</th>
                <th className="px-4 py-3">Artist</th>
                <th className="px-4 py-3">Género</th>
              </tr>
            </thead>
            <tbody className="">
              {paginatedTodos?.length === 0 ? (
                <tr>
                  <td className="text-center py-4">
                    <div className="text-center text-red-500 font-bold">
                      No se encontraron resultados
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedTodos?.map((invoice: any, index: number) => (
                  <tr
                    key={invoice.id}
                    className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                  >
                    <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-3 dark:border-slate-500 ">
                      <Link href={`/home/lists/${invoice.id}`}>
                        <div className="flex items-center text-sm">
                          <div className="relative mr-3 rounded-full md:block">
                            <MediaItem
                              onClick={() => {}}
                              key={invoice.id}
                              data={invoice}
                            />
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                      {invoice.Artist?.name}
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                      {invoice.Genre?.name}
                    </td>
                    <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                      <button
                        onClick={() => {
                          handleHeartClick(invoice.id);
                        }}
                      >
                        ❤️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center">
        {Array.from({ length: Math.ceil(filteredTodos?.length / itemsPerPage) || 1 }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded-md ${
              page === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-800'
            }`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
