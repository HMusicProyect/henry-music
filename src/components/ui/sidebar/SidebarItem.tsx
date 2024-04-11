
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge'


interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?:boolean;
    href:string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, href }) => {
    return (
        <Link href={href}
            className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transitio text-neutral-400 py-1`, active && 'text-white')}>
            {icon}
            <p className="truncate w-full">{label}</p>
        </Link>
    )
}

export default SidebarItem;