const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:6
        // message:'password must be minimum of 6 length'
    },
    lastname:{
        type:String,
        maxlength:50
    },
    token:{
        type:Number
    },
    tokenExp:{
        type:Number
    }
})

const User=mongoose.model('user',userSchema);
module.exports= { User }