import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import userRoute from './route/userRoute.js'


const app = express()
const PORT = process.env.PORT || 4000;



app.use(express.json())
app.use(cors({
    origin: [
        'https://danielbizualem.vercel.app',
        'http://localhost:3000'
      ], // Explicitly allow your frontend URL
    credentials: true                // Allow cookies/headers to be sent
}))

app.use(cookieParser())
app.use('/api/portfolio',userRoute)


connectDB()



app.listen(PORT,()=>{console.log(`The server is running on http://localhost:${PORT}`)})