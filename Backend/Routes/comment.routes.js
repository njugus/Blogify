import { Router } from 'express'
import authMiddleware from '../Middleware/auth.js'
import { createComment } from '../Controllers/comments.controllers.js'

const commentRouter = Router()

commentRouter.post("/:id", authMiddleware, createComment)

export default commentRouter
