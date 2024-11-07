import { Router } from 'express'
import { createAnewPost } from '../Controllers/post.controllers.js'
import authMiddleware from '../Middleware/auth.js'
import { getAllPosts } from '../Controllers/post.controllers.js'

const postRouter = Router()

postRouter.post("/", authMiddleware, createAnewPost)
postRouter.get("/", getAllPosts)

export default postRouter