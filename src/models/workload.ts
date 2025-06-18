import { ObjectId } from "mongodb";
import mongoose from "mongoose"

type Status = "marked" | "completed" | "canceled";
type day = "sunday"|"monday"|"tuesday"|"wenesday"|"thrusday"|"friday" |"saturday"

export interface IWork extends Document {
  title: string;
  description: string;
  reminderTime: Date;
    status: Status;
    createdBy: ObjectId;
    taskDay: day;
    reminderSent: boolean;
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
    reminderTime: {
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
    },
    reminderSent: {
        type:Boolean,
    }
})

export const Work = mongoose.model<IWork>("Work",workSchema)