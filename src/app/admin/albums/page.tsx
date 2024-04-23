"use client"
import React, { Suspense } from 'react';
import Header from '@/components/ui/header/Header';
import { Plus } from 'lucide-react'; // Importa el icono de Plus si es necesario
import useUploadSongsModal from '@/store/hooks/useUploadSongModal';
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import useUploadAlbumsModal from '@/store/hooks/useUploadAlbumsModal';
import TableAlbumsList from '@/components/admin/Albums/TableAlbumsList';
import TableAlbumsCompact from '@/components/admin/Albums/TableAlbumsCompact';

const Albums: React.FC = ({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;

  };
}) => {

  const { selectedOption } = useOptionsStore();
  const uploadModal = useUploadAlbumsModal();

  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;

  const onClick = () => {
    return uploadModal.onOpen();
  }

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-purple-900'>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Albums Dashboard</h1>
        </div>
      </Header>
      <div  className="flex items-center justify-end px-6 pb-6 mt-5">
        <button onClick={onClick} className='flex gap-x-2 transition hover:bg-neutral-400/5 px-4 py-2 cursor-pointer rounded-md bg-neutral-900'>
          Add Album
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
            <TableAlbumsList
              query={query}
              currentPage={currentPage}
            />
          ) : (
            <TableAlbumsCompact
              query={query}
              currentPage={currentPage}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Albums;
