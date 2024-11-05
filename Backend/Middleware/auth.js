import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async(req, res, next) => {
    //access the token
    const token = req.cookies.access_token

    //check if the token exists
    if(!token){
        return res.status(401).json({
            message : 'Unauthorized User'
        })
    }

    //if the token is available decode the token
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        //set the user attribute of the req object to the decoded token
        req.user = decoded
        
        //proceed to the next middleware
        next()
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message || "Invalid Token"
        })
    }
}

export default authMiddleware