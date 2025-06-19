import {  Worker } from "bullmq";

import { sendMail } from "../Service/Nodemailer";


const myWorker = new Worker("email-queue", async (job) => {
    console.log("aayush")
    if (job.name = "reminderEmail") {
        const { to, subject, html, text } = job.data
    
        await sendMail({ to, subject, html, text })
    }
}
)



myWorker.on("completed", (job) => {
    console.log(`${job.id}`)
})
myWorker.on("failed", (job) => {
    console.log("Failed ",`${job?.id}`)
})