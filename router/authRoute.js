const express = require('express') ; 
const { signup, getUser, signin, logOut } = require('../controller/authController');

const jwtAuth = require('../middleware/jwtAuth')

const authRouter = express.Router() ; 

authRouter.post('/signup' , signup) ; 

authRouter.get('/getusers' ,jwtAuth, getUser)

authRouter.post('/signin' , signin) ; 

authRouter.get('/logout', jwtAuth , logOut ) ; 

module.exports = authRouter