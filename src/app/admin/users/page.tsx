"use client"

import TableUsersCompact from '@/components/admin/Users/TableUsersCompact';
import TableUsersList from '@/components/admin/Users/TableUsersList';
import Header from '@/components/ui/header/Header'
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { useOptionsStore } from '@/store/hooks/useOptions';
import React, { Suspense } from 'react'

const Users: React.FC = ({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;

  };
}) => {

  // Opciones para filtrar por rol
   const roleOptions = ["Admin", "User", "Guest"];

   // Opciones para filtrar por estado de verificación
   const verificationOptions = ["Verified", "Not Verified"];
 
   // Opciones para filtrar alfabéticamente
   const alphabeticalOptions = ["A-Z", "Z-A"];
 
   // Opciones para filtrar por ID
   const idOptions = ["Oldest First", "Newest First"];
 

  const { selectedOption } = useOptionsStore()
  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-green-900'>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">User Dashboard</h1>
        </div>
      </Header>
      <div className="px-6 mb-7 flex items-end justify-end gap-2 md:mt-8">
 
        <OptionsDropdown />
      </div>
    
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          {selectedOption === 'list' ? (
            <TableUsersList
              query={query}
              currentPage={currentPage}
            />
          ) : (
            <TableUsersCompact
              query={query}
              currentPage={currentPage}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

export default Users;