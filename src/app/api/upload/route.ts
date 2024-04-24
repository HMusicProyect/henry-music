import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
import { writeFile } from "fs/promises";
import path, { resolve } from "path";
import { rejects } from "assert";

type CloudinaryResponse = {
    secure_url: string;
};

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
        // const filePath = path.join(process.cwd(), 'public', image.name);
        // await writeFile(filePath, buffer);

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
        console.log(response)
        return NextResponse.json({
            message: 'file uploaded',
            url: response.secure_url,
            status: 200,
        });
    }
}