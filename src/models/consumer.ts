import mongoose, { ObjectId } from "mongoose";

type  role = "admin"|"user"
export interface Consumers extends Document{
    authOid: string,
    username: string,
    email: string,
    password: string,
    avatart: string,
    role: role,
    works:ObjectId,
}

const consumerSchema = new mongoose.Schema({
    authOid: {
        type:String,
        required: true,
    },
    username: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    avatar: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        enum:["admin","user"]
    },
    works: [{
        type: mongoose.Types.ObjectId,
        ref:"Work"
    }]
    
})

export const Consumer = mongoose.model<Consumers>("Consumer",consumerSchema)