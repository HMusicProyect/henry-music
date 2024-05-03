"use client"
import Header from "@/components/ui/header/Header";
import React, { useEffect, useState } from "react";
import useStore from '@/store/songs.store';
import { Music } from "@/lib/definitions";
import Link from 'next/link';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import Image from "next/image";

export default function Genres({ params: { genres } }: { params: { genres: string } }) {

  const { todos, getMusic } = useStore();

  const [filteredTodos, setFilteredTodos] = useState<Music[]>([]);

  useEffect(() => {
    getMusic();
  }, [getMusic]);

  useEffect(() => {
    if (todos.length > 0) {
      // Limpiar y formatear el parámetro de género
      const cleanedGenre = genres.replace(/%20/g, ' ').replace(/[^a-zA-Z\s]/g, '');
      const filtered = todos.filter((todo) => todo.Genre?.name.toLowerCase() === cleanedGenre.toLowerCase());
      setFilteredTodos(filtered);
    }
  }, [todos, genres]);


  return (
    <div>
      <Header className=''>
        <h1 className='text-white font-semibold' style={{ fontSize: '4rem' }}>
          {genres.replace(/%20/g, ' ')}
        </h1>
        <p className="mt-10">Nuestras canciones de {genres.replace(/%20/g, ' ')}</p>
      </Header>

      <div className="px-6 ">
        <ul>
          {filteredTodos?.map((invoice: any) => (
            <tr
              key={invoice.id}
              className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
            >
              <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                <Link href={`/home/lists/${invoice.id}`}>
                  <div className="flex items-center text-sm">
                    <div className="relative mr-3 rounded-full md:block">
                      {invoice?.id}
                    </div>
                  </div>
                </Link>
              </td>
              <Image
                src={invoice.image}
                alt={invoice.name}
                className="w-12 h-12 object-cover mt-3 transform translate-y-4"
                width={48}
                height={48}
              />

              <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                <Link href={`/home/lists/${invoice.id}`}>
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
                <Link href={`/home/lists/${invoice.id}`}>
                  <div className="flex items-center text-sm">
                    <div className="relative mr-3 rounded-full md:block">
                      {invoice.Genre?.name}
                    </div>
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </ul>
      </div>
    </div>
  )
}

