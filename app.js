const express = require ('express') ; 
const app = express() ;
const authRouter = require('./router/authRoute');
const connectDb = require('./config/db');
const cookieParser = require ('cookie-parser')
connectDb() ; 
app.use(express.json()) ; 
app.use(express.Router())
app.use(cookieParser())

app.use('/' , authRouter)
app.use('/' , (req,res)=>{
    res.status(200).json({
        data : 'JWTauth server /'
    }) ; 
})

module.exports = app 