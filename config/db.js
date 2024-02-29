const mongoose = require('mongoose')

const connectDb = async ()=>{
   try{
    await mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log('database connected ' , conn.connection.host)})}
    catch{
        console.error('connection failed', err)
    }
}

module.exports = connectDb ; 