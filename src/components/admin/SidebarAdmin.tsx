"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Home, Search, List } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import useStore, { Music } from '@/store/songs.store';
import usePlayer from '@/store/hooks/usePlayer';
import Box from '../ui/sidebar/Box';
import SidebarItem from '../ui/sidebar/SidebarItem';

interface SidebarProps {
    children: React.ReactNode;
}
const SidebarAdmin: React.FC<SidebarProps> = ({ children }) => {
    const { todos, getMusic } = useStore();

    useEffect(() => {
        getMusic();
    }, []);
    const pathname = usePathname();

    const player = usePlayer();

    const routes = useMemo(() => [
        {
            icon: <Home />,
            label: 'Home',
            active: pathname === '/admin',
            href: '/admin'
        },
        {
            icon: <Search />,
            label: 'Users',
            active: pathname === '/admin/users',
            href: '/admin/users'
        },
        {
            icon: <Search />,
            label: 'Songs',
            active: pathname === '/admin/songs',
            href: '/admin/songs'
        },
        {
            icon: <Search />,
            label: 'Albums',
            active: pathname === '/admin/albums',
            href: '/admin/albums'
        },
        {
            icon: <List />,
            label: 'Artists',
            active: pathname === '/admin/artists',
            href: '/admin/artists'
        },
        {
            icon: <List />,
            label: 'Genres',
            active: pathname === '/admin/genres',
            href: '/admin/genres'
        }
    ], [pathname]);

    return (
        <div className={twMerge(`flex h-full`, player.activeId && "h-[calc(100%-80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">

                <Box className="overflow-y-auto h-full">
                    <div className="flex flex-col justify-between items-center gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}



export default SidebarAdmin;