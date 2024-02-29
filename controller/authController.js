const User = require("../model/userSchema");
const emailValidator = require('email-validator') 

const bcrypt = require('bcrypt')

const signup = async (req ,res , next) =>{
    const {name , email , password , confirmPassword} = req.body

    const validEmail = emailValidator.validate(email) 

if(!validEmail){
    return res.status(400).json({
        success : false , 
        message :'invalid email id '
    })
}

if(password !== confirmPassword){
    return res.status(400).json({
        success : false , 
        message :'password not match with confirm password '}
)}

    try{
        const userInfo = User(req.body)
        const result = await  userInfo.save() ; 
        return res.status(200).json({
            success : true ,
            data : {} ,
            result
        })
    } catch(err){
        if(err.code == 1100){
            return res.json({
                success:false ,
                message : 'user already exists '
            })
        }
        
    }

   
}

const getUser = async (req , res) =>{
    try {
        const user = await  User.find({})
        res.status(200).json({
            success : true , 
            message : 'user fetched successfully' , 
            user 
        })
    } catch (error) {
        res.status(400).json({
            success:false , 
            message : error.message
        })
    }
}

 const signin =async (req ,res)=>{
    const {email , password } = req.body ;

    if(!email || !password){
        res.status(400).json({
            success:false , 
            message : 'every field is mandatory'        })
    }
    try {
        const user = await User.findOne({
            email ,
             
        })
        .select('+password')
    
        if(!user || !user.password=== password){
            res.status(400).json({
                success:false , 
                message : 'wrong credentials '      
              })
        }
        const token = user.jwtToken()
        user.password = undefined ; 
    
        const cookieOption = {
            maxAge : 24*60*60*1000 , 
            httpOnly : true
        }
        res.cookie("token" , token , cookieOption) 
        res.status(200).json({
            success:true , 
            data : user
        })
     }
     catch(e){
        res.status(400).json({
            success:true , 
            message : e.message
        })
     }

     
    }
    
    const logOut = (req , res) => {
        try {
            const cookieOption = {
                expires: new Date() , 
                httpOnly : true 
            }
            res.cookie("token" , null , cookieOption) ; 
            res.status(200).json({
                success:true , 
                message : 'user logout successfully '
            })

        } catch (error) {
            res.status(200).json({
                success:true , 
                message : error.message
            })
        }
    }


module.exports = {
    signup ,
    getUser , 
    signin , 
    logOut
}