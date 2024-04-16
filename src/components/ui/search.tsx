'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 500;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if(term) {
      params.set('music', term);
    } else {
      params.delete('music');
    }
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE )

  return (
    <div 
      className="mt-2 mb-7 px-6 flex justify-between items-center"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className="px-4 py-2 border rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 "
        placeholder={placeholder}
        defaultValue={searchParams.get('music')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
