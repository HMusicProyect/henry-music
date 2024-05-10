"use client"
import { useState } from 'react';
import TableArtistCompact from '@/components/admin/Artists/TableArtistCompact';
import TableArtistList from '@/components/admin/Artists/TableArtistList';
import Header from '@/components/ui/header/Header';
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import useUploadArtistsModal from '@/store/hooks/useUploadArtistsModal';
import { Plus } from 'lucide-react';
import React, { Suspense } from 'react';

const Artists: React.FC = ({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;
  };
}) => {
  const { selectedOption } = useOptionsStore();
  const uploadModal = useUploadArtistsModal();
  const [filterValue, setFilterValue] = useState('');

  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;

  const onClick = () => {
    return uploadModal.onOpen();
  };

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-red-900">
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Artists Dashboard</h1>
        </div>
      </Header>
      <div className="flex items-center justify-end px-6 pb-6 mt-5">
        <button onClick={onClick} className="flex gap-x-2 transition hover:bg-neutral-400/5 px-4 py-2 cursor-pointer rounded-md bg-neutral-900">
          Add Artist
          <Plus fill="white" />
        </button>
      </div>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
      <Input
            className='w-1/4 h-12'
            placeholder='Search Artists'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        <OptionsDropdown />
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          {selectedOption === 'list' ? (
            <TableArtistList
              query={filterValue}
              currentPage={currentPage}
            />
          ) : (
            <TableArtistCompact
              query={filterValue}
              currentPage={currentPage}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Artists;