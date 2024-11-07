import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//get all tags
export const getAllTags = async(req, res) => {
    try{
        const tags = await prisma.tag.findMany()
        res.status(200).json({
            success : true,
            data : tags
        })
    }catch(error){
        res.status(500).json({ success : false, message : error.message || "Could not get the Tags"})
    }
}




