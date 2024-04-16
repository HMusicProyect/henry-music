
// import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/components/ui/search';
import Table from '@/components/lists/table';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';

export default  function Page({
  searchParams,
}: {
  searchParams?:
  {
    music?: string;
    page?: string;
  };
}) {
  
  console.log("searchParams",searchParams);

  const query = searchParams?.music || '';

  console.log("query",query);

  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
      </div>
      <div 
        className="mt-4 flex items-center justify-between gap-2 md:mt-8"
      >
        <Search placeholder="Search invoices..." />
        {/* <CreateMusic /> */}
      </div>
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
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={todos.length} />
      </div> */}
    </div>
  );
}