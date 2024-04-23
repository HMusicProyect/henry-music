"use client"

import { useEffect, useState } from "react"
import UploadSongsModal from "@/components/admin/Songs/UploadSongsModal";
import UploadGenresModal from '../components/admin/Genres/UploadGenresModal';
import UploadArtistsModal from '../components/admin/Artists/UploadArtistsModal';
import UploadAlbumsModal from "@/components/admin/Albums/UploadAlbumsModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

    return(
        <>
        <UploadSongsModal />
        <UploadGenresModal />
        <UploadArtistsModal />
        <UploadAlbumsModal />
        </>
    )
}

export default ModalProvider;