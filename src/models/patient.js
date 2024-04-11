const mongoose = require('mongoose')

const Patientschema = new mongoose.model('Patient',{
    name :{
        type:String,
        required:true,
    },
    age :{
        type:Number,
        required:true,
    },
    aadhar :{
        type:String,
        required:true,
    },
    district :{
        type:String,
        required:true,
    },
    gender :{
        type:String,
        required:true,
    },
    test :{
        type:String,
        required:true,
    },
    report:{
        type:String,
    },
    Symptoms :{
        type:String,
    },
    date :{
        type:Date,
        required:true,
    },
    volunteer_id :{
        type :String,
        required:true,
    }
})

module.exports = Patientschema;