"use client";
import { useEffect, useState } from 'react';
import useStore from '@/store/songs.store';
import Link from 'next/link';
import Image from 'next/image';
import MediaItem from '../ui/sidebar/MediaItem';
import { Clock } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { User } from '@/lib/auth/user.auth';
import toast from 'react-hot-toast';

export default function TableList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { todos, getMusic } = useStore();
  const [isLiked, setIsLiked] = useState(false);
  const { data: session, status } = useSession();
  const userSession: User = session?.user!;

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getMusic();
  }, []);

  const filteredTodos = todos?.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.Artist?.name.toLowerCase().includes(query.toLowerCase()) ||
    invoice.Genre?.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleHeartClick = async (id: string) => {
      const userId = userSession.id; // Reemplaza esto con el ID de usuario actual
      setIsLoading(true);

        if(!userId){
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
        } finally{
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
              {filteredTodos?.map((invoice : any) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {invoice?.id}
                  </td>
                  <td className="px-6 py-3 dark:border-slate-500 ">
                    <Link href={`/home/lists/${invoice.id}`}>
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                          <MediaItem
                            onClick={() => { }}
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
                      <button onClick={() => {
                        handleHeartClick(invoice.id);
                        setIsLiked(!isLiked);
                      }}>
                        <span style={{color: isLiked ? 'red' : 'grey'}}>❤️</span>
                      </button>
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