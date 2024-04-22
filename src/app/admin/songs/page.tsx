"use client"

import TableSongsCompact from '@/components/admin/Songs/TableSongsCompact';
import TableSongsList from '@/components/admin/Songs/TableSongsList';
import Header from '@/components/ui/header/Header'
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import useUploadSongsModal from '@/store/hooks/useUploadSongModal';
import { Music } from '@/store/songs.store';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react'

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

  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;

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
      <div onClick={onClick} className="flex items-center justify-end px-6 pb-6 mt-5">
        <button  className='flex gap-x-2 transition hover:bg-neutral-400/5 px-4 py-2 cursor-pointer rounded-md bg-neutral-900'>
          Add Song
        <Plus fill='white' />
        </button>
      </div>
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
            <TableSongsList
              query={query}
              currentPage={currentPage}
            />
          ) : (
            <TableSongsCompact
              query={query}
              currentPage={currentPage}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default Songs;