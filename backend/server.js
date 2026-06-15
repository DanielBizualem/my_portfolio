import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import userRoute from './route/userRoute.js'


const app = express()
const PORT = process.env.PORT || 4000;



app.use(express.json())
const allowedOrigins = [
  'https://danielbizualem.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Strictly allow ONLY origins inside the allowedOrigins array
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Access Denied for this origin.'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'], // Restrict to only the methods your portfolio uses
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Strictly handle preflight options for your routes
app.options('*', cors());

app.use(cookieParser())
app.use('/api/portfolio',userRoute)


connectDB()



app.listen(PORT,()=>{console.log(`The server is running on http://localhost:${PORT}`)})