"use client";


import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense, useState } from 'react';
import Header from '@/components/ui/header/Header';
import TableList from '@/components/home/ListPlaylist/PlaylistsTableList';
import TableCompact from '@/components/home/ListPlaylist/PlaylistsTableCompact';
import { Input } from '@/components/ui/input';
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
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const query = searchParams?.playlist || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Lists of Playlist
        </h1>
      </Header>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
        <Input className='w-1/4' placeholder='Search Invoices' value={searchValue} onChange={handleSearch} />
        {/* <OptionsDropdown /> */}
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <TableList
            query={searchValue}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </div>
  );
}