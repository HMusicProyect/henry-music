"use client"

import Header from '@/components/ui/header/Header'
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import React, { Suspense } from 'react'
import TableUsersCompact from '@/components/admin/Users/TableUsersCompact';

const Admin: React.FC = ({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;

  }
}) => {

  const { selectedOption } = useOptionsStore()
  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-green-900'>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <TableUsersCompact
            query={query}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default Admin