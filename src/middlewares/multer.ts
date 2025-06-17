import multer from "multer";
import cloudinary, { UploadApiResponse} from 'cloudinary'

const storage = multer.memoryStorage()
export const upload = multer({
    storage:storage
})


const UploadImage = async(file: Express.Multer.File):Promise<string> => {
    const b64 = Buffer.from(file.buffer).toString("base64")
    const dataUri = `data:${file.mimetype},"b64"${b64}`

try {
    
        const upload: UploadApiResponse = await cloudinary.v2.uploader.upload(dataUri)
        return upload.secure_url;
    
} catch (error) {
    console.log("Error in cloudinary Upload", error)
    throw new Error("cloudinary Upload Failed In Server")
}
}
export {UploadImage}