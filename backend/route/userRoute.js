import express from 'express'
import { messageController, submitHireForm } from '../controller/userController.js'
import { handlePortfolioChat } from '../controller/chatController.js'

const userRoute = express.Router()

userRoute.post("/message",messageController)
userRoute.post("/hire",submitHireForm)
userRoute.post('/chat', handlePortfolioChat)

export default userRoute