import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//CRUD
//create a Post
export const createAnewPost = async(req, res) => {
    const user_id = req.user.id
    const { title, content, post_category_id, tags} = req.body
    try{
        //check and create the tags if they do not exist
        const tagIds = await Promise.all(
            tags.map(async(tagName) => {
                let tag = await prisma.tag.findFirst({
                    where : { name : tagName.name}
                })
                if(!tag){
                    tag = await prisma.tag.create({
                        data : { name : tagName.name}
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
                author_id : user_id,
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

//get all the Posts
export const getAllPosts = async(req, res) => {
    try{
        const allPosts = await prisma.post.findMany()
        res.status(200).json({ success : true, data : allPosts})
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "Could Not get All Posts"
        })
    }
}



