import { Router } from 'express'
import authMiddleware from '../Middleware/auth.js'
import { createComment } from '../Controllers/comments.controllers.js'
import { getPostComments } from '../Controllers/comments.controllers.js'

const commentRouter = Router()

commentRouter.post("/:id", authMiddleware, createComment)
commentRouter.get("/:id", getPostComments)

export default commentRouter
