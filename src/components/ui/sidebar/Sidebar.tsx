"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Home, Search, List } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Box from './Box';
import SidebarItem from './SidebarItem';
import MusicLibrary from './MusicLibrary';
import useStore, { Music } from '@/store/songs.store';
import usePlayer from '@/store/hooks/usePlayer';

interface SidebarProps {
    children:React.ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({ children}) => {
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
                    <MusicLibrary songs={todos}/>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}



export default Sidebar;