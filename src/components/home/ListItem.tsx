"use client"

import { useRouter } from "next/navigation";
import { Play } from 'lucide-react';
import React from 'react'
import Image from "next/image";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    //agregar autenticacion luego de pushear
    router.push(href);
  }
  return (
    <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="font-medium truncate py-5">
        {name}
      </p>
      <div className="absolute transition opacity-0 rounded-full items-center justify-center bg-green-500 p-2 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <Play className="text-black" fill="black" size={25} />
      </div>
    </button>
  )
}

export default ListItem;