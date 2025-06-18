import express, { NextFunction,Request,Response } from 'express'
import dotenv from 'dotenv'
import { dbconnect } from './db'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.send("Hello From Backend")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/auth",authRoutes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Server Failure",
        success:false
    })
})


dbconnect()
    .then(() => {
    app.listen(port, () => {
    console.log(`server running on ${port}`)
})
})
    .catch((err) => {
    console.log("ErrorIn MongodbServer Setup",err)
})