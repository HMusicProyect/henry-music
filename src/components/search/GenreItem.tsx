import React from 'react';
import Link from 'next/link';
import { colorDarkPallette } from '@/utils/ColorDarkPallette';
import { Genre } from '@/lib/definitions';

interface GenreItemProps {
  genre: Genre;
  index: number;
}

const GenreItem: React.FC<GenreItemProps> = ({ genre, index }) => {
  return (
    <Link href={`/home/${genre.name}`}>
      <div className={`mt-12 h-56 w-56 relative group flex flex-col items-start justify-start rounded-md overflow-hidden gap-x-4 cursor-pointer transition p-3`} style={{ backgroundColor: colorDarkPallette[index % colorDarkPallette.length] }}>
        <p className='text-white text-2xl font-bold'>
          {genre.name}
        </p>
      </div>
    </Link>
  );
};

export default GenreItem;
