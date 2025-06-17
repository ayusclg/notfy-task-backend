import { sendMail } from "../Service/Nodemailer";
import ApiError from "../Utils/ApiError";
import { asyncHandler } from "../Utils/AsyncHandler";
import { Request, Response } from "express";
import ApiResponse from "../Utils/ApiRes";

const mailSender = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    
    const { to, subject, text } = req.body
    
    const result: string = await sendMail({
        to,
        subject,
        html: `<p>${text}</p>`,
        text,
    })
    if (!result) throw new ApiError(400,{},"couldnot send mail")
        
   res.status(200).json(new ApiResponse(200,result,"MAIL SEND SUCCESSFULLY"))

})
export {mailSender}