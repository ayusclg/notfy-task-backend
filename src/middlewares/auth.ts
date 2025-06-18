import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Consumer} from "../models/consumer";
import ApiError from "../Utils/ApiError";


declare global {
  namespace Express {
    interface Request {
      userId: string;
      
    }
  }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
   try {
     const token = req.cookies.accessToken
       if (!token) throw new ApiError(404, null, "AccessToken not found")
       
       const secretAccess = process.env.ACCESS_TOKEN_SECRET as string
       if (!secretAccess)
       {
           console.log("SecretToken Not Found") 
           
       }
       
       const decode = jwt.verify(token, secretAccess) as JwtPayload
       const user = await Consumer.findById(decode._id)
       if (!user) throw new ApiError(404, null, "User Not Found")
       
       req.userId = user._id.toString()
       next()
   } catch (error) {
     res.json({
            message: "User Not Logged In",
            statusCode: "401",
            success:false
        })
   }
    
}