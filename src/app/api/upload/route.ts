import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
import { writeFile } from "fs/promises";
import path from "path";

cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
    api_key: `${process.env.CLOUDINARY_API_KEY}`, 
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`, 
});

export async function POST(request: Request, response: Response){
    const data = await request.formData();
    const image = data.get('photo');
    
    if(!data || !image){
        return NextResponse.json({
            message: 'error uploaded',
            status: 400,
        });
    }

    if(image instanceof File){
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        //guardar en un archivo
        const filePath = path.join(process.cwd(), 'public', image.name);
        await writeFile(filePath, buffer);
        const resImag = await cloudinary.uploader.upload(filePath);

        return NextResponse.json({
            message: 'file uploaded',
            url: resImag.secure_url,
            status: 200,
        });
    }
}