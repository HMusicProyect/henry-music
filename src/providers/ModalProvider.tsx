"use client"

import { useEffect, useState } from "react"
import UploadSongsModal from "@/components/admin/Songs/UploadSongsModal";
import UploadGenresModal from '../components/admin/Genres/UploadGenresModal';
import UploadArtistsModal from '../components/admin/Artists/UploadArtistsModal';
import UploadAlbumsModal from "@/components/admin/Albums/UploadAlbumsModal";
import UserActionsModal from "@/components/admin/Users/UserActionsModal";
import UserBanModal from "@/components/admin/Users/UserBanModal";
import UserUnbanModal from "@/components/admin/Users/UserUnbanModal";
import UserPutAdminModal from "@/components/admin/Users/UserPutAdminModal";
import UserDeleteAdminModal from "@/components/admin/Users/UserDeleteAdminModal";
import UpdateArtistsModal from "@/components/admin/Artists/UpdateArtistsModal";
import UpdateAlbumModal from "@/components/admin/Albums/UpdateAlbumModal";


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
        <UserActionsModal />
        <UserBanModal />
        <UserUnbanModal />
        <UserPutAdminModal />
        <UserDeleteAdminModal /> 
        <UpdateArtistsModal />
        <UpdateAlbumModal />
        <UpdateArtistsModal />
        </>
    )
}

export default ModalProvider;