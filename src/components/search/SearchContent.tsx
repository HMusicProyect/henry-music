"use client"
import { Music } from '@/store/songs.store'


interface SearchContentProps {
    songs: Music[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No songs Found.
            </div>
        )
    }

    return (
        <div>SearchContent</div>
    )
}

export default SearchContent