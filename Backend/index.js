import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/user.routes.js'
import loginRoute from './Routes/login.routes.js'

const app = express()
const PORT = 5000
app.use(express.json())
app.use(cookieParser())

app.use("/auth/user/v1", userRouter)
app.use("/getusers/v1", userRouter)
app.use("/update/user/v1", userRouter)
app.use("/login/user/v1", loginRoute)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}....`);
})