"use client"
import { useState } from 'react';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import Header from '@/components/ui/header/Header';
import useOnPlay from '@/store/hooks/useOnPlay';
import Player from '@/components/ui/player';
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import TableList from '@/components/lists/TableList';
import TableCompact from '@/components/lists/TableCompact';
import { useOptionsStore } from '@/store/hooks/useOptions';
import { Music } from '@/lib/definitions';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;
    songs: Music[];
  };
}) {
  const { selectedOption } = useOptionsStore();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };


  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Lists of Musics
        </h1>
      </Header>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
        <Input className='w-1/4' placeholder='Search Invoices' value={searchValue} onChange={handleSearch} />
        <div></div>
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
