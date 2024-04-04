const mongoose = require('mongoose')

const Userschema = new mongoose.model('User',{
    name :{
        type:String,
        required:true,
        trim:true
    },email:{
        type:String,
        required:true,
        lowercase:true
    },password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

module.exports = Userschema;