"use client"

import { useEffect, useState } from "react"
import UploadSongsModal from "@/components/admin/Songs/UploadSongsModal";

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
        </>
    )
}

export default ModalProvider;