import express from 'express'
import dotenv from 'dotenv'
import { dbconnect } from './db'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.send("Hello From Backend")
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