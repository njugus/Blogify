import { PrismaClient } from "@prisma/client";
import authMiddleware from "../Middleware/auth.js";

const prisma = new PrismaClient()

//create a Post
export const createAnewPost = async(req, res) => {
    const user_id = req.user.id
    const { title, content, author_id, post_category_id, tags} = req.body
    try{
        //check and create the tags if they do not exist
        const tagIds = await Promise.all(
            tags.map(async(tagName) => {
                let tag = await prisma.tag.findUnique({
                    where : { name : tagName}
                })
                if(!tag){
                    tag = await prisma.tag.create({
                        data : { name : tagName}
                    })
                }
                return { id : tag.id}
            })
        )

        // step 2 create a post 
        const newPost = await prisma.post.create({
            data : {
                title : title,
                content : content,
                author_id : author_id,
                post_category_id : post_category_id,
                tags : {
                    connect : tagIds
                }
            }
        })

        res.status(201).json({ success : true, data : newPost})
    }catch(error){
        res.status(500).json({ success : false, message : error.message || "Error Creating Post"})
    }
}



