"use client";


import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import Header from '@/components/ui/header/Header';
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import TableList from '@/components/home/ListPlaylist/PlaylistsTableList';
import TableCompact from '@/components/home/ListPlaylist/PlaylistsTableCompact';
import { useOptionsStore } from '@/store/hooks/useOptions';
import { Music } from '@/lib/definitions';

export default function Playlist({
  searchParams,
}: {
  searchParams?: {
    playlist?: string;
    page?: string;
    songs: Music[];
  };
}) {
  const { selectedOption } = useOptionsStore();

  const query = searchParams?.playlist || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Lists of Musics
        </h1>
      </Header>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
        <Input className='w-1/4' placeholder='Search Invoices' />
        <OptionsDropdown />
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          {selectedOption === 'list' ? (
            <TableList
              query={query}
              currentPage={currentPage}
            />
          ) : (
            <TableCompact
              query={query}
              currentPage={currentPage}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}