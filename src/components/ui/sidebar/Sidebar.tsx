"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Home, Search, List } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Box from './Box';
import SidebarItem from './SidebarItem';
import MusicLibrary from './playlist/MusicLibrary';
import usePlayer from '@/store/hooks/usePlayer';
import usePlaylistStore from '@/store/playlist.store'; 
import { useSession } from 'next-auth/react';
import {User} from "@/lib/definitions"

interface SidebarProps {
    children:React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children}) => {
    const { fetchUserPlaylists, userPlaylists: userPlaylistsFromPlaylistStore } = usePlaylistStore();  
    const { data: session } = useSession();
    const userSession: User = session?.user!;
    const pathname = usePathname();
    const player = usePlayer();


    useEffect(() => {
        if (userSession?.id && (userPlaylistsFromPlaylistStore.length === 0 || !userPlaylistsFromPlaylistStore)) {
            fetchUserPlaylists(userSession.id);
        }
    }, [userSession, fetchUserPlaylists, userPlaylistsFromPlaylistStore]);



    const routes = useMemo(() => [
        {
            icon: <Home />,
            label: 'Home',
            active: pathname === '/home',
            href: '/home'
        },
        {
            icon: <Search />,
            label: 'Search',
            active: pathname === '/home/search',
            href: '/home/search'
        },
        {
            icon: <List />,
            label: 'Lists',
            active: pathname === '/home/lists',
            href: '/home/lists'
        }
    ], [pathname]);

    return (
        <div className={twMerge(`flex h-full`, player.activeId && "h-[calc(100%-80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <MusicLibrary 
                        playlist={userPlaylistsFromPlaylistStore || []} 
                        user={userSession}
                    />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;