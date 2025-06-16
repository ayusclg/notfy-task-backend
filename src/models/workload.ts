import mongoose from "mongoose"

type Status = "marked" | "completed" | "canceled";
interface IWork extends Document {
  title: string;
  description: string;
  taskTime: Date;
  status: Status;
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
        enum:["marked","completed","canceled"],
    }
})

export const Work = mongoose.model<IWork>("Work",workSchema)