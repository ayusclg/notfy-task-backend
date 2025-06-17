import { ObjectId } from "mongodb";
import mongoose from "mongoose"

type Status = "marked" | "completed" | "canceled";
type day = "sunday"|"monday"|"tuesday"|"wenesday"|"thrusday"|"friday" |"saturday"

export interface IWork extends Document {
  title: string;
  description: string;
  taskTime: Date;
    status: Status;
    createdBy: ObjectId;
    taskDay:day
}


const workSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    taskTime: {
        type: Date,
        required:true,
    },
    status: {
        type:String,
        enum: ["marked", "completed", "canceled"],
        default:"marked"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:"Consumer"
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
})

export const Work = mongoose.model<IWork>("Work",workSchema)