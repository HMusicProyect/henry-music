import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';

interface CloudinaryResponse {
    secure_url: string;
}

cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
    api_key: `${process.env.CLOUDINARY_API_KEY}`, 
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`, 
});

export async function POST(request: Request, response: Response){
    const data = await request.formData();

    const image = data.get('photo');
    const sound = data.get('audio');


    if((!image && sound == undefined) || (!sound && image == null)){
        return NextResponse.json({
            message: 'error uploaded',
            status: 400,
        });
    }

    // -- Imagen --
    if(image instanceof File && image !== undefined){
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);


        const response = await new Promise<CloudinaryResponse | undefined>((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        });

        if (!response) {
            // Manejar el caso en el que response es undefined
            return NextResponse.json({
                message: 'error uploading file to Cloudinary',
                status: 500,
            });
        }
        
        console.log('response', response.secure_url);
        return NextResponse.json({
            message: 'image uploaded',
            url: response.secure_url,
            status: 200,
        });
    }

    // -- Sonido --
    if(sound instanceof File && sound !== undefined){
        console.log('sound', sound);
        const bytes = await sound.arrayBuffer();
        const base64Audio = Buffer.from(bytes).toString('base64');

        const response = await new Promise<CloudinaryResponse | undefined>((resolve, reject) => {
            cloudinary.uploader.upload(`data:audio/mpeg;base64,${base64Audio}`, { resource_type: 'video' }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });

        if (!response) {
            return NextResponse.json({
                message: 'error uploading file to Cloudinary',
                status: 500,
            });
        }

        return NextResponse.json({
            message: 'audio uploaded',
            url: response.secure_url,
            status: 200,
        });
    }
}