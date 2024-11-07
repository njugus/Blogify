import { Router } from "express"
import { getAllTags } from "../Controllers/tags.controllers.js"
const tagRouter = Router()

tagRouter.get("/", getAllTags)

export default tagRouter