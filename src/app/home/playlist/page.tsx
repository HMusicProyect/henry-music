import { useEffect } from 'react';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import Header from '@/components/ui/header/Header';
import useOnPlay from '@/store/hooks/useOnPlay';
import Player from '@/components/ui/player';
import { Input } from '@/components/ui/input';
import OptionsDropdown from '@/components/ui/OptionDropdown';
import TableList from '@/components/home/ListPlaylist/PlaylistsTableList';
import TableCompact from '@/components/home/ListPlaylist/PlaylistsTableCompact';
import usePlaylistStore  from '@/store/playlist.store';
import { Music } from '@/lib/definitions';

export default function Playlist({
  searchParams,
}: {
  searchParams?: {
    music?: string;
    page?: string;
    songs: Music[];
  };
}) {
  const { allPlaylists, fetchAllPlaylists } = usePlaylistStore();

  useEffect(() => {
    fetchAllPlaylists();
  }, [fetchAllPlaylists]);

  console.log(allPlaylists);
  const query = searchParams?.music || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className='from-bg-neutral-900'>
        <h1 className='text-white text-3xl font-semibold'>
          Lists of Musics
        </h1>
      </Header>
      <div className="px-6 mb-7 flex items-center justify-between gap-2 md:mt-8">
        <Input className='w-1/4' placeholder='Search Invoices' />
        <OptionsDropdown />
      </div>
      <div className="mt-2 mb-7 px-6 flex justify-between items-center">
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          { allPlaylists.length > 0 ? (
            <TableList
              query={query}
              currentPage={currentPage}
              playlists={allPlaylists}
            />
          ) : (
            <TableCompact
              query={query}
              currentPage={currentPage}
              playlists={allPlaylists}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}