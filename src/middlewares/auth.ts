import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Consumer} from "../models/consumer";


declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
      authuser: string;
    }
  }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const { authorization } = req.headers
        if (!authorization || !authorization.startsWith("Bearer ")) {
            res.status(404).json({
                message:"Token Not Found"
            })
            return;
        }

        const purifyToken = authorization.split(" ")[1]

        const decodeToken = jwt.decode(purifyToken) as JwtPayload
        if (!decodeToken) {
            res.status(400).json({
                message:"Token Not Successfully Decoded"
            })
            return;
        }
        
        const authOid = decodeToken.sub
        
        const user = await Consumer.findOne({ authOid: authOid })

        if (!user) {
            res.status(404).json({
                message:"User Not Registered"
            })
            return;
        }

        req.userId = user._id.toString()
        req.auth0Id = authOid as string
        next();
    } catch (error) {
        res.json({
            message: "User Not Logged In",
            statusCode: "401",
            success:false
        })
    }
}