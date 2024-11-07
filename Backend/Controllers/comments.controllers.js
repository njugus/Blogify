import { PrismaClient } from 'express'

const prisma = new PrismaClient()

//create a comment for a post
export const createComment = async(req, res) => {
    const{ post_id } = req.params
    const user_id = req.user.id
    const { content } = req.body
    try{
        const newComment = await prisma.comment.create({
            data : {
                content : content,
                post_id : post_id,
                user_id : user_id
            }
        })

        res.status(200).json({ success : true, message : "Comment Posted Successfully", data : newComment})
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}