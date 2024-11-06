import { Router } from 'express'
import { createAnewPost } from '../Controllers/post.controllers.js'
import authMiddleware from '../Middleware/auth.js'

const postRouter = Router()

postRouter.post("/", authMiddleware, createAnewPost)

export default postRouter