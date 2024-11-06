import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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



