import { Router } from "express";
import { loginUser } from "../Controllers/login.controllers.js";
const loginRoute = Router()

loginRoute.post("/", loginUser)

export default loginRoute