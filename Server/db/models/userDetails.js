const mongoose = require("mongoose")
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        // unique:[true,"Email ID already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
        
        required:true,
    },
   password:{
    type:String,
    required:true
   }
    
})

//Create new collection
const User = mongoose.model('User',userSchema);

module.exports = User