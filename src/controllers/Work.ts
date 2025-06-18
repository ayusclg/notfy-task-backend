import { Consumer } from "../models/consumer";
import { Work } from "../models/workload";
import { sendMail } from "../Service/Nodemailer";
import ApiError from "../Utils/ApiError";
import ApiResponse from "../Utils/ApiRes";
import { asyncHandler } from "../Utils/AsyncHandler";
import { Request, Response } from "express";
import mongoose from "mongoose";


const createWorkSchedule = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body) throw new ApiError(404, {}, "Contents not found")
    const { title, description, reminderTime,taskDay} = req.body
    

    const user = await Consumer.findById(req.userId)
    if (user) {
        const create = await Work.create({
            title,
            description,
            reminderTime,
            taskDay,
            createdBy:new mongoose.Types.ObjectId(req.userId),
            
       
            
        })
        if (!create) {throw new ApiError(400, {}, "Work not created")}
        (user.works as any).push(create._id)
        await user.save()
        res.status(201).json(new ApiResponse(201,create,"Work Successfully Created"))
    }
    else {
        throw new ApiError(403,{},"User Not Found")
    }
})

const updateWork = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    
    if (!req.body) throw new ApiError(404, {}, "Contents not found")
    
    const { title, description, reminderTime, taskDay } = req.body
    const user = await Consumer.findById(req.userId)
    const workId = req.params.id

    const work = await Work.findById(workId)
    if (!work) throw new ApiError(404, {}, "Work Not Found")
    
    const workCreator = work.createdBy.toString()
    if (req.userId != workCreator) {
        throw new ApiError(403,null,"Permission Denied")
    }

    if (title) work.title = title
    if (description) work.description = description
    if (reminderTime) work.reminderTime = reminderTime
    if (taskDay) work.taskDay = taskDay
    
    await work.save()
    res.status(200).json(new ApiResponse(200,work,"Work Data Updated Successfully"))
})

const updateStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const status = req.body

    const work = await Work.findById(req.params.id)
    if (!work) throw new ApiError(404, {}, "Please Create a Work First")
    
    if (status) work.status = status
    await work.save()

    res.status(200).json(new ApiResponse(200,work,`Work Status set to ${status}` ))

})

const activateMailService = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const workId = req.params.id
    const user = await Consumer.findById(req.userId)
        if(!user) throw new ApiError(401,{},"Unauthorized")
    
    const findWork = await Work.findById(workId)
    if (!findWork) throw new ApiError(404, {}, "No Work Scheduled")
    
    const dueTime = findWork.reminderTime
    const email = user.email

    const timeLeft = new Date(dueTime).getTime() - Date.now()
    
    if (timeLeft > 0) {
        setTimeout(async () => {
      try {
        await sendMail({
          to: email,
          subject: findWork.title,
          html: findWork.description,
          text: findWork.description
        });
        console.log(`Reminder email sent to ${email}`);
      } catch (err) {
        console.error(`Failed to send reminder email to ${email}:`, err);
      }
    }, timeLeft);

    res.status(200).json({ message: 'Reminder scheduled successfully.' });
  } else {
    res.status(400).json({ error: 'Reminder time is in the past.' });
  }
});

export {createWorkSchedule,updateWork,updateStatus,activateMailService}