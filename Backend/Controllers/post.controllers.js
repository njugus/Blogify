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

//update a post
export const updateAPost = async(req, res) => {
    const { id } = req.params
    const { title, content, tags } = req.body

    const updatedFields = {}
    if( title !== undefined ){ updatedFields.title = title}
    if(content !== undefined ) { updatedFields.content = content}
    if(tags !== undefined ) { updatedFields.tags = tags}

    if(Object.keys(updatedFields).length === 0){
        return res.status(404).json({
            message : "No fields to be updated"
        })
    }
    try{
        const updates = await prisma.post.update({
            where : { id : id},
            data : updatedFields,
        })
        res.status(200).json({
            success : true,
            message : "Record Updated SuccessFully",
            data : updates
        })
        
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "An error occured during the update"
        })
    }

}

//delete a post
export const deleteAPost = async(req, res) => {
    const{ id } = req.params
    const user_id = req.user.id
    try{
        //check whether the post exists
        const postToBeDeleted = await prisma.post.findUnique({
            where : { id : parseInt(id)}
        })
        if (!postToBeDeleted || postToBeDeleted.author_id !== user_id){
            return res.status(404).json({
                success : false,
                message : "Unauthorized User"
            })
        }
        const response = await prisma.post.delete({
            where : { id : id}
        })
        res.status(200).json({ success : true, message : "Record deleted Successfully", data : response})
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "Error deleting Post"
        })
    }
}


