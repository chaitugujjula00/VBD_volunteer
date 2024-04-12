
const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose')

const Caseschema = new mongoose.model('Case',{
        District:{
            type:String,
        },
        Year:{
            type:Number
        },
        Month:{
            type:Number
        },
        Avg_Temp: {
            type:Decimal128
        },
        Avg_Feelslike: {
            type:Decimal128
        },
        Avg_Dew: {
            type:Decimal128
        },
        Avg_Humidity: {
            type:Decimal128
        },
        Avg_Precipitation: {
            type:Decimal128
        },
        Avg_Precipitation_Probability: {
            type:Decimal128
        },
        Avg_Precipitation_Coverage: {
            type:Decimal128
        },
        Avg_Snowfall: {
            type:Decimal128
        },
        Avg_Snow_Depth: {
            type:Decimal128
        },
        Avg_Wind_Gust: {
            type:Decimal128
        },
        Avg_Wind_Speed: {
            type:Decimal128
        },
        Avg_Wind_Direction: {
            type:Decimal128
        },
        Avg_Pressure: {
            type:Decimal128
        },
        Avg_Cloud_Cover: {
            type:Decimal128
        },
        Avg_Visibility: {
            type:Decimal128
        },
        Avg_Solar_Radiation: {
            type:Decimal128
        },
        Avg_Solar_Energy: {
            type:Decimal128
        },
        Avg_UV_Index:{
            type:Decimal128
        },
        Cases:{
            type:Number
        },
})

module.exports = Caseschema;