import multer from "multer";
import cloudinary, { UploadApiResponse } from  "cloudinary"
import dotenv from 'dotenv'

dotenv.config()
const storage = multer.memoryStorage()
export const upload = multer({
    storage:storage
})

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
});


const UploadImage = async(file: Express.Multer.File):Promise<string> => {
    const b64 = Buffer.from(file.buffer).toString("base64")
    const dataUri = `data:${file.mimetype};base64,${b64}`;

try {
   
    const result:UploadApiResponse = await cloudinary.v2.uploader.upload(dataUri)
 
        return result.secure_url;
    
} catch (error) {
    console.log(error)
    throw new Error("cloudinary Upload Failed In Server")
}
}
export {UploadImage}