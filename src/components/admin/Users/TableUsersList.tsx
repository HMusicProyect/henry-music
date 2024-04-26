"use client"
import { useEffect, useState } from 'react';
import { useStore } from '@/store/user.store';
import Image from 'next/image';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import { User } from '@/lib/definitions';

export default function TableUsersList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { users, fetchUsers } = useStore();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [verificationFilter, setVerificationFilter] = useState<string>('');
  const [alphabeticalFilter, setAlphabeticalFilter] = useState<string>('');
  const [idFilter, setIdFilter] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredUsers(users || []);
    } else {
      const filtered = users?.filter(user =>
        (user.name && user.name.toLowerCase().includes(query.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredUsers(filtered || []);
    }
  }, [query, users]);

  useEffect(() => {
    let filtered = users;

    // Aplicar filtros
    if (roleFilter) {
      filtered = filtered?.filter(user => user.rol === roleFilter);
    }

    if (verificationFilter) {
      filtered = filtered?.filter(user => {
        const isVerified = user.esta_verificado;
        return verificationFilter === 'Yes' ? isVerified : !isVerified;
      });
    }

    if (alphabeticalFilter === 'A-Z') {
      filtered = filtered?.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
    } else if (alphabeticalFilter === 'Z-A') {
      filtered = filtered?.sort((a, b) => (b?.name || '').localeCompare(a?.name || ''));
    }

    if (idFilter === 'Oldest User') {
      filtered = filtered?.sort((a, b) => (a?.id || '').localeCompare(b?.id || ''));
    } else if (idFilter === 'Newest User') {
      filtered = filtered?.sort((a, b) => (b?.id || '').localeCompare(a?.id || ''));
    }


    setFilteredUsers(filtered || []);
  }, [roleFilter, verificationFilter, alphabeticalFilter, idFilter, users]);
  return (

    <section className="container mx-auto font-semibold">
      <div className='mb-7 mt-8 flex items-center justify-between gap-8'>
        <select className="flex h-12 w-1/4 rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline"
          onChange={(e) => setRoleFilter(e.target.value)} >
          <option value="">Filter by Role</option>
          <option value="gratis">Gratis</option>
          <option value="registrado">Registrado</option>
          <option value="premium">Premium</option>
          <option value="baneado">Baneado</option>
          <option value="admin">Admin</option>
        </select>

        <select className="flex h-12 w-1/4 rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline"
          onChange={(e) => setVerificationFilter(e.target.value)}>
          <option value="">Filter by Verification Status</option>
          <option value="Yes">Verified</option>
          <option value="No">Not Verified</option>
        </select>
        <select className="flex h-12 w-1/4 rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline"
          onChange={(e) => setAlphabeticalFilter(e.target.value)}
        >
          <option value="">Filter Alphabetically</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select className="flex h-12 w-1/4 rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline"
          onChange={(e) => setIdFilter(e.target.value)}>
          <option value="">Filter creation time</option>
          <option value="Oldest First">Oldest User</option>
          <option value="Newest First">Newest User</option>

        </select>
      </div>
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3 pl-8">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Verified</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="text-white transition-transform duration-300 ease-in-out transform hover:bg-neutral-400/10"
                >
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-6 dark:border-slate-500">
                    <div className="flex items-center justify-center">
                      <div className="min-w-20 min-h-20 rounded-full overflow-hidden relative">
                        <Image
                          src={user.image || ''}
                          alt={user.name || ''}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600">
                    {capitalizeWords(user.rol || '')}
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600">
                    {user.esta_verificado ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
