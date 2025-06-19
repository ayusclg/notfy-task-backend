import { Queue } from "bullmq"
import {connection}  from '../Utils/redis'


export const myQueue = new Queue("email-queue", { connection })
