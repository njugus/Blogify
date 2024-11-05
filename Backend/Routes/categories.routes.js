import { Router } from "express";
import { createNewCategory } from "../Controllers/categories.controllers.js";
import { getAllCategories } from "../Controllers/categories.controllers.js";

const categoryRouter = Router()

categoryRouter.post("/", createNewCategory)
categoryRouter.get("/", getAllCategories)

export default categoryRouter

