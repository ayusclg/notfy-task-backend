import {  Worker } from "bullmq";
import {connection} from '../Utils/redis'
import { sendMail } from "../Service/Nodemailer";


const myWorker = new Worker("email-queue", async (job) => {
    if (job.name === "reminderEmail") {
        const { to, subject, html, text } = job.data
    
        await sendMail({ to, subject, html, text })
    }
},{connection}
)



myWorker.on("completed", (job) => {
    console.log(`${job.id}`)
})
myWorker.on("failed", (job) => {
    console.log("Failed ",`${job?.id}`)
})