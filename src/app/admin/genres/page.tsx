"use client"
import React, { useState } from 'react';
import TableGenresCompact from '@/components/admin/Genres/TableGenresCompact';
import TableGenresList from '@/components/admin/Genres/TableGenresList';
import Header from '@/components/ui/header/Header';
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import useUploadGenresModal from '@/store/hooks/useUploadGenresModal';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';

const Genres: React.FC = ({ searchParams }: { searchParams?: { music?: string; page?: string } }) => {
  const { selectedOption } = useOptionsStore();
  const uploadModal = useUploadGenresModal();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onClick = () => {
    uploadModal.onOpen();
  };

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-rose-900">
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Genres Dashboard</h1>
        </div>
      </Header>
      <div className="flex items-center justify-end px-6 pb-6 mt-5">
        <button onClick={onClick} className="flex gap-x-2 transition hover:bg-neutral-400/5 px-4 py-2 cursor-pointer rounded-md bg-neutral-900">
          Add Genre
          <Plus fill="white" />
        </button>
      </div>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
        <Input className="w-1/4" placeholder="Search Genres" value={searchQuery} onChange={handleSearch} />
        <OptionsDropdown />
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense key={searchQuery + searchParams?.page} fallback={<InvoicesTableSkeleton />}>
          {selectedOption === 'list' ? (
            <TableGenresList query={searchQuery} currentPage={Number(searchParams?.page) || 1} />
          ) : (
            <TableGenresCompact query={searchQuery} currentPage={Number(searchParams?.page) || 1} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Genres;
