import {JobScheduler} from "bullmq"
import{connection} from '../Utils/redis'

const mySchedule = new JobScheduler("email-queue", { connection })

mySchedule.on("failed", (error:any) => {
    console.log("failed ",error)
})

console.log("JobScheduler is  Running")