import { Router } from "express";
const userRouter = Router()

import { registerUsers } from "../Controllers/users.controllers.js";
import { getAllUsers } from "../Controllers/users.controllers.js";
import { updateUserRecords } from "../Controllers/users.controllers.js";

userRouter.post("/", registerUsers)
userRouter.get("/", getAllUsers)
userRouter.put("/:id", updateUserRecords)

export default userRouter