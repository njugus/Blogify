import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()


//async function to register a user
export const registerUsers = async(req, res) => {
    const{ firstname, secondname, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    try{
        const result = await prisma.user.create({
            data : {
                firstname : firstname,
                secondname : secondname,
                email: email,
                password : hashedPassword
            }
        }
        )
        res.status(201).json({ success : true, message : "Record Created Successfully", data : result})
    }catch(error){
        if(error.code == "P2002" && error.meta.target.includes("email")){
            res.status(409).json({
                success : false,
                message : "Email arleady Exists. Use another email instead"
            })
        }
        res.status(500).json({ success : false,  message : error.message})
    }
}


//get all users
export const getAllUsers = async(req, res) => {
    try{
        const allUsers = await prisma.user.findMany()
        res.status(200).json({ success : true, data : allUsers})
    }catch(error){
        res.status(500).json({ success : false, message : error.message})
    }
}


//updating the user records
export const updateUserRecords = async(req, res) => {
    const { id } = req.params
    const{ username, firstname, secondname, email } = req.body

    //an object to store the fields provided by the user to be updated
    const updatedFields = {}

    if(username !== undefined) updatedFields.username = username
    if(firstname !== undefined) updatedFields.firstname = firstname
    if(secondname !== undefined) updatedFields.secondname = secondname
    if(email !== undefined) updatedFields.email = email

    //check that atleast one of the fields will be updated
    if(Object.keys(updatedFields).length === 0){
        return res.status(404).json({
            success : false,
            message : "No fields to be updated"
        })
    }
    try{
        const updates = await prisma.user.update({
            where : {
                id : id
            },
            data : updatedFields,
        })
        res.status(200).json({
            success : true,
            message : "Record Updated Successfully",
            data : updates
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "An error occured during the update"
        })
    }
}
