"use client"

import TableSongsCompact from '@/components/admin/Songs/TableSongsCompact';
import TableSongsList from '@/components/admin/Songs/TableSongsList';
import Header from '@/components/ui/header/Header'
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Music } from '@/lib/definitions';
import { useOptionsStore } from '@/store/hooks/useOptions';
import useUploadSongsModal from '@/store/hooks/useUploadSongModal';
import { Plus } from 'lucide-react';
import React, { Suspense, useState } from 'react'

const Songs: React.FC = ({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;
    songs: Music[];
  };
}) => {

  const { selectedOption } = useOptionsStore();
  const uploadModal = useUploadSongsModal();
  const [filterValue, setFilterValue] = useState('');
  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDirection(e.target.value as 'asc' | 'desc');
  };
  const onClick = () => {
    return uploadModal.onOpen();
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-blue-500'>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Songs Dashboard</h1>
        </div>
      </Header>
      <div className="flex items-center justify-end px-6 pb-6 mt-5">
        <button onClick={onClick} className='flex gap-x-2 transition hover:bg-neutral-400/5 px-4 py-2 cursor-pointer rounded-md bg-neutral-900'>
          Add Song
          <Plus fill='white' />
        </button>
      </div>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
        <div className='flex items-center gap-x-4'>

          <Input
            className='w-full h-12'
            placeholder='Search Invoices'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <select className='flex h-12 w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline' onChange={handleSortChange} value={sortDirection}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <OptionsDropdown />
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          {selectedOption === 'list' ? (
            <TableSongsList
              query={filterValue}
              currentPage={currentPage}
              sortDirection={sortDirection}
            />
          ) : (
            <TableSongsCompact
              query={filterValue}
              currentPage={currentPage}
              sortDirection={sortDirection}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default Songs;