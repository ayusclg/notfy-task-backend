import { Consumer } from "../models/consumer";
import ApiError from "../Utils/ApiError";
import ApiResponse from "../Utils/ApiRes";
import { asyncHandler } from "../Utils/AsyncHandler";
import { Request,Response } from "express";


const userLogin = asyncHandler(async (req: Request, res: Response) => { 

    const { auth0id } = req.body
  
    
    const user = await Consumer.findOne({ auth0id: auth0id })
    if (user) {
       
    res.status(200).json(new ApiResponse(200,user,"User Successfully Logged In"))
    }
    const createUser = new Consumer(req.body)
   
    await createUser.save()
    res.status(201).json(new ApiResponse(201,createUser,"User Successfully Created"))
})

const getUser = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const user = req.userId as string
    const Finduser = await Consumer.findById(req.userId)
    if(!Finduser) throw new ApiError(404,{},"User Not Found")

    res.status(200).json(new ApiResponse(200,Finduser,"User Fetched Successfully"))
    
})

export {userLogin,getUser}