
// import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/components/ui/search';
import Table from '@/components/lists/table';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import Header from '@/components/ui/header/Header';
import useOnPlay from '@/store/hooks/useOnPlay';
import { Music } from '@/store/songs.store';
import Player from '@/components/ui/player';

export default function Page({
  searchParams,

}: {
  searchParams?:
  
  {
    music?: string;
    page?: string;
    songs: Music[]
  };
}) {

  console.log("searchParams", searchParams);

  const query = searchParams?.music || '';

  console.log("query", query);

  const currentPage = Number(searchParams?.page) || 1;


  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Lists of Musics
        </h1>
      </Header>
      <div
        className="mt-4 flex items-center justify-between gap-2 md:mt-8"
      >
        <Search placeholder="Search invoices..." />
        {/* <CreateMusic /> */}
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton
          />}
        >
          <Table
            query={query}
            currentPage={currentPage}
          />
        </Suspense>
      </div>

      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={todos.length}
        />
      </div> */}
    </div>
  );
}