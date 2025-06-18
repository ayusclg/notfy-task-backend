import mongoose, { ObjectId } from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

type  role = "admin"|"user"
export interface Consumers extends Document{
    authOid: string,
    username: string,
    email: string,
    password: string,
    avatart: string,
    role: role,
    works: ObjectId,
    generateRefreshToken(): string,
    generateAccessToken(): string,
    refreshToken:string,
}

const consumerSchema = new mongoose.Schema({
    authOid: {
        type:String,
        
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
    }],
    refreshToken: {
        type:String,
    }
    
})

consumerSchema.methods.generateRefreshToken = function ():string {
    if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_EXPIRY) {
        console.log("No credentials Found")
    }
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY as any
    })
}
consumerSchema.methods.generateAccessToken = function ():string {
    if (!process.env.ACCESS_TOKEN_SECRET  || !process.env.ACCESS_TOKEN_EXPIRY) {
        console.log("No credentials Found")
    }
    return jwt.sign({
        _id: this._id,
        email:this.email,
    }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY as any
    })
}


export const Consumer = mongoose.model<Consumers>("Consumer",consumerSchema)