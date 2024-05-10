"use client";
import { useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import MediaItem from '../../ui/sidebar/MediaItem';
import { Clock, Pen } from 'lucide-react';
import useAlbumsStore from '@/store/albums.store';
import useUpdateAlbumModal from '@/store/hooks/useUpdateAlbums';

export default function TableAlbumsList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { albums, getAlbums } = useAlbumsStore();
  const editUsersModal = useUpdateAlbumModal();
  useEffect(() => {
    getAlbums();
  }, []);

  const filteredAlbums = albums?.filter((album) =>
    album.name.toLowerCase().includes(query.toLowerCase())
  );


  const onClickEdit = (albumId: string) => {
    console.log(albumId)
    editUsersModal.onOpen(albumId);
  }


  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3 pl-8">Name</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredAlbums?.map((album: any) => (
                <tr
                  key={album.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                    {album?.id}
                  </td>
                  <Link href={`/admin/albums/${album.id}`}>
                      <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                          <MediaItem
                            onClick={() => { }}
                            key={album.id}
                            data={album}
                          />
                        </div>
                      </div>
                    </Link>
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
    </section>
  );
}
