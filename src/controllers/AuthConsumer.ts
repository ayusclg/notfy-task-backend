import { UploadImage } from "../middlewares/multer";
import { Consumer } from "../models/consumer";
import ApiError from "../Utils/ApiError";
import ApiResponse from "../Utils/ApiRes";
import { asyncHandler } from "../Utils/AsyncHandler";
import { Request, Response } from "express";
import  bcrypt from 'bcrypt'
import { Types } from "mongoose";

const AccessToken = async (userId: Types.ObjectId):Promise<string>=>{
    try {
        const user = await Consumer.findById(userId)
        if (!user) {
        throw new Error('User not found');
        }
      
        const AccessToken = user.generateAccessToken() as string
       
        return AccessToken;

    } catch (error) {
       throw new Error("Access Token Generation Failed")
    }

}
const RefreshToken = async (userId:Types.ObjectId):Promise<string>=>{
    try {
        const user = await Consumer.findById(userId)
        if (!user) throw new Error("User Not Found")
        const refreshToken =  user.generateRefreshToken() as string
        user.refreshToken = refreshToken
        await user.save()
        return refreshToken;

    } catch (error) {
        throw new Error("RefreshToken Not Generated")
    }
}

const userCreate = asyncHandler(async (req: Request, res: Response):Promise<void> => { 

    const { username, email, password,role } = req.body

    const userFind = await Consumer.findOne({ email, })
    if (userFind) throw new ApiError(404, {}, "You already have account")
    
    
    const file = req.file as Express.Multer.File
    const uploadUrl = await UploadImage(file)
    const hashedPw = await bcrypt.hash(password, 10)
    
    const createUser = await Consumer.create({
        username,
        email,
        password: hashedPw,
        avatar: uploadUrl,
        role,
    })
    if (!createUser) throw new ApiError(400, {}, "Consumer Not Created")
    
    const createdUser = await Consumer.findById(createUser._id)
    res.status(200).json(new ApiResponse(201,createdUser,"User Successfully Created"))
    
})

const userLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body
    
    const user = await Consumer.findOne({ email, })
    if (!user) throw new ApiError(401, {}, "Unauthorized")
    
    const checkPassword = bcrypt.compare(user.password, password)
    if(!checkPassword) throw new ApiError(403,{},"Invalid Password")
    
    const accessToken = await AccessToken(user._id)
    const refreshToken = await RefreshToken(user._id)
    if (!accessToken || !refreshToken) throw new ApiError(404, null, "Token Not Generated")
    

    const userLoggedIn = await Consumer.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure:false
    }

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiResponse(200, {userLoggedIn,accessToken,refreshToken}, "UserSuccessfully LoggedIn"))
})

const getUser = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const user = req.userId as string
    const Finduser = await Consumer.findById(req.userId).select("-password -refreshToken")
    if(!Finduser) throw new ApiError(404,{},"User Not Found")

    res.status(200).json(new ApiResponse(200,Finduser,"User Fetched Successfully"))
    
})

export {userCreate,getUser,userLogin}