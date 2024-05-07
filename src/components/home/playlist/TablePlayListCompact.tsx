import { capitalizeWords } from '@/utils/CapitalizeWords';
import usePlaylistStore from '@/store/playlist.store';
import Link from 'next/link';

interface PlaylistDetails {
    ArtistName: string;
    GenreName: string;
    PlaylistID: string;
    SongsID: number;
    SongsImage: string;
    SongsName: string;
    id: string;
}

export default function TablePlayListCompact({
  query,
  currentPage,
}: {
  query: string;
  currentPage: PlaylistDetails[];
}) {
  const deleteSongFromPlaylist = usePlaylistStore((state) => state.deleteSongFromPlaylist);
  console.log('currentPage', currentPage);


  const filteredTodos = currentPage?.filter((invoice) =>
    typeof query === 'string' && (
      invoice.SongsName?.toLowerCase().includes(query.toLowerCase()) ||
      invoice.ArtistName.toLowerCase().includes(query.toLowerCase()) ||
      invoice.GenreName.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <section className="container mx-auto font-semibold">
      <div className="w-full mb-8 rounded-t-xl">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-bold text-left text-black-600 border-b border-gray-100/30 ">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Artist</th>
                <th className="px-4 py-3">Género</th>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="">
              {filteredTodos?.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="text-white transition-transform duration-300 ease-in-out transform  hover:bg-neutral-400/10 "
                >
                
                  <td className="px-4 py-3 text-md font-semibold dark:border-slate-500 ">
                  <Link
                    href={`/home/lists/${invoice.SongsID}`}
                  >
                    <div className="flex items-center text-sm">
                      <div className="relative mr-3 rounded-full md:block">
                        {invoice.ArtistName}
                      </div>
                    </div>
                  </Link>
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">

                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {capitalizeWords(invoice.SongsName)}
                        </div>
                      </div>
   
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
   
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.GenreName}
                        </div>
                      </div>
       
                  </td>
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
     
                    <div className="flex items-center text-sm">
                        <div className="relative mr-3 rounded-full md:block">
                        {invoice.SongsID}
                        </div>
                      </div>

                  </td>
                  
                  <td className="px-4 py-3 text-sm dark:text-gray-200 dark:border-slate-600 ">
                    <div
                        className="flex items-center text-sm"
                    >
                        <div
                            className="relative mr-3 rounded-full md:block"
                        >
                            <button 
                                className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                                onClick={(e) => {
                                // Evita que el evento de clic se propague al elemento padre (Link)
                                e.stopPropagation();
                                // Llama a deleteSongFromPlaylist con el id de la canción
                                deleteSongFromPlaylist(invoice?.id);
                            }}
                            >
                                ✖
                            </button>
                        </div>
                    </div>

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