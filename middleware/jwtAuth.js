const JWT = require('jsonwebtoken') ; 

const jwtAuth = (req , res , next )=>{
    const token = (req.cookies && req.cookies.token) || null ; 

    if(!token) {
        return res.status(400).json({
            success:false , 
            message : 'token does not exist '
        })
    }
        try {
            const payload = JWT.verify(token , process.env.SECRET)

            req.User =  {id : payload.id , email : payload.email}
        } catch (error) {
            return res.status(400).json({
                success: false  , 
                messaeg : error.message
            })
        }
        next()
    }




module.exports= jwtAuth ; 