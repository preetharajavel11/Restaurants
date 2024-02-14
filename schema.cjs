const mongoose=require('mongoose')

const restaurantsSchema=new mongoose.Schema({
    areaName:{
        type:String
    },
    avgRating:{
        type:Number
    },
    costForTwo:{
        type:String
    },
    cuisins:{
        type:Array
    },
    name:{
        type:String
    },

})

const Restaurant=mongoose.model('restaurantsList',restaurantsSchema)


// defining the schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    userName:{
        type:String
    },
    contact:{
        type:String
    },
}, {versionKey:false})

//model
const Users=mongoose.model('userDetail',userSchema)
module.exports={Restaurant,Users}