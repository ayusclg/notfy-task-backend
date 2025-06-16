import mongoose from "mongoose";

export const dbconnect = async() => {
    try {
        const mongoInstance = await mongoose.connect(process.env.MONGODB_URI as string)
                console.log("mongodb connectiopn successfully established",mongoInstance.connection.host)
    } catch (error) {
        console.log("MongodbConnection Error", error)
        process.exit(1)
    }
}