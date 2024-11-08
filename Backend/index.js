import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/user.routes.js'
import loginRoute from './Routes/login.routes.js'
import categoryRouter from './Routes/categories.routes.js'
import postRouter from './Routes/post.routes.js'
import tagRouter from './Routes/tags.routes.js'
import commentRouter from './Routes/comment.routes.js'

const app = express()
const PORT = 5000
app.use(express.json())
app.use(cookieParser())

app.use("/auth/user/v1", userRouter)
app.use("/getusers/v1", userRouter)
app.use("/update/user/v1", userRouter)
app.use("/login/user/v1", loginRoute)
app.use("/createcategory/v1", categoryRouter)
app.use("/getAllCategories/v1", categoryRouter)
app.use("/createPost/v1", postRouter)
app.use("/getAllPosts/v1", postRouter)
app.use("/updateAPost/v1", postRouter)
app.use("/getAllTags/v1", tagRouter)
app.use("/deletePost/v1", postRouter)
app.use("/comment/v1", commentRouter)
app.use("/getPostComments/v1", commentRouter)


app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}....`);
})