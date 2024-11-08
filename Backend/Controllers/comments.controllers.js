import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// create a new comment
export const createComment = async (req, res) => {
    const { content } = req.body;       // Destructuring `content` from the request body
    const { id } = req.params;     // Destructuring `post_id` from the URL parameters
    const user_id = req.user.id;        // Assuming `req.user.id` provides the current user’s ID
  
    try {
      const newComment = await prisma.comment.create({
        data: {
          content: content,
          post_id: id,  // This is now retrieved from `req.params`
          user_id: user_id,  // Retrieved from the authenticated user
        },
      });
  
      res.status(201).json({ success: true, data: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create comment" });
    }
  };
  

// get the comments of a specific post
export const getPostComments = async(req, res) => {
    const { id  } = req.params
    try{
        const postComments = await prisma.comment.findMany({
            where : { post_id : id},
        })
        res.status(200).json({ success : true,  data : postComments})
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
