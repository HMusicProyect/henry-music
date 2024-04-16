import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import qs from 'query-string'

import useDebounce from '@/store/hooks/useDebounce';
import { Input } from '../ui/input';

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = {
            title: debouncedValue.toString(),
        }

        const url = qs.stringifyUrl({
            url:'/search',
            query:query
        });
        router.push(url);

    }, [debouncedValue, router])
  return (
    <Input 
        placeholder="Buscar canción o Artista"
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default SearchInput