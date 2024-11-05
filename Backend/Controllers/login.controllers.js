import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//load the .env variables to your application
dotenv.config()
const prisma = new PrismaClient()

///function to login the user
export const loginUser = async(req, res) => {
    const{ email, password } = req.body
    try{
        const registeredUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(!registeredUser){
            res.status(401).json({success : false, message : "Invalid email or password"})
        }
        const passwordMatch = await bcrypt.compare(password, registeredUser.password)
        if(passwordMatch){
            const payload =  {
                id : registeredUser.id,
                email : registeredUser.email,
                username : registeredUser.username,
                firstname : registeredUser.firstname,
                secondname : registeredUser.secondname,
                role : registeredUser.role
            }
            //specify the expiry time later
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn : "1hr"})

            //store the token in the cookie  
            res.cookie("access_token", token).json({ success : true, data : payload})
        }
        else{
            res.status(401).json({success : false, message : "Invalid Email or Password"})
        }
    }catch(error){
        res.status(500).json({success : false, message : error.message})
    }
}