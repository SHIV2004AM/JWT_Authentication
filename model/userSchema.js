const mongoose = require('mongoose')

const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name :{
        type : String , 
        required : [true , 'name is required '] ,
        minLength : [5 , 'must be 5 character'] , 
        maxLength : [50 , 'can not be more than 50 char ']
    } , 
    email:{
        type: String ,
        required : [true , 'name is required '] ,
        unique : true , 
        lowercase : true , 
        unique : [true , 'already registered ']
    } , 
    password:{
        type: String , 
        select : false 

    }, 
    confirmPassword:{
        type: String , 
        select : false 

    }, 
    forgotPasswordToken:{
        type:String 
    } , 
    forPasswordExpiryDates :{
        type : String 
    }
}, {
    timestamps : true 
})

userSchema.pre('save' , async function(){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password , 10)
    return next () ; 
})

userSchema.methods= {
    jwtToken(){
        return JWT.sign({
            id : this._id , 
            email : this.email  
        } , 
        process.env.SECRET , 
        {expiresIn : '24h'}
        )
    }
}

const User = mongoose.model('User' , userSchema)

module.exports = User ;