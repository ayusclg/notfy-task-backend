import { Job } from "bullmq";
import { myQueue } from "../middlewares/queue";
import { Consumer } from "../models/consumer";
import { Work } from "../models/workload";
import { sendMail } from "../Service/Nodemailer";
import ApiError from "../Utils/ApiError";
import ApiResponse from "../Utils/ApiRes";
import { asyncHandler } from "../Utils/AsyncHandler";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Types } from "mongoose";


const createWorkSchedule = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body) throw new ApiError(404, {}, "Contents not found")
    const { title, description, reminderTime,taskDay} = req.body
      const utcReminderTime = new Date(reminderTime).toISOString()

    const user = await Consumer.findById(req.userId)
    if (user) {
        const create = await Work.create({
            title,
            description,
            reminderTime:utcReminderTime,
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
  const userLogged = await Consumer.findById(req.userId)
  if (!userLogged) throw new ApiError(401, {}, "User Not Logged In")
  
    const {status} = req.body

    const work = await Work.findById(req.params.id)
  if (!work) throw new ApiError(404, {}, "Please Create a Work First")
  
  
  if (status === work.status) throw new ApiError(403, {}, `${status} already declared`)
  
    if (status) work.status = status
  await work.save()
  if (status === "canceled") {
    const deleteWork = await Work.findByIdAndDelete(req.params.id)
    if(!deleteWork) throw new ApiError(400,null,"Work Canceled")
  }
  console.log(req.params.id)
  console.log(userLogged.works)
  userLogged.works = (userLogged.works as any).filter((id: Types.ObjectId) => id.toString() !== req.params.id.toString()
  )
  await userLogged.save()
    res.status(200).json(new ApiResponse(200,work,`Work Status set to ${status}` ))

})

const activateMailService = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const workId = req.params.id
    const user = await Consumer.findById(req.userId)
    if (!user) throw new ApiError(401, {}, "Unauthorized")
    
    const findWork = await Work.findById(workId)
    if (!findWork) throw new ApiError(404, {}, "No Work Scheduled")
    
    const email = user.email
  const timeLeft = findWork.reminderTime.getTime() - Date.now();
  
  const existingJob: Job | null = await myQueue.getJob(workId)
  if (existingJob) {
      await existingJob.remove()
  }


    if (timeLeft > 0) {
      await myQueue.add("reminderEmail", {
        to: email,
        subject: findWork.title,
        html: findWork.description,
        text: findWork.description
      }, {
        jobId:workId,
        attempts: 3,
        delay: timeLeft,
        removeOnComplete: true,
      });
    }

    res.status(200).json(new ApiResponse(200, findWork.title, "Reminder Email Sent Successfully"));
});


const getAllWork = asyncHandler(async (req: Request, res: Response) => {
  const work = await Work.find({ createdBy: req.userId })
  if(!work) throw new ApiError(404,null,"No Work  Scheduled yet")
  
  res.status(200).json(new ApiResponse(200,work,"Users all work fetched"))
})


export {createWorkSchedule,updateWork,updateStatus,activateMailService,getAllWork}  