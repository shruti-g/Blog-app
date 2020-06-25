const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const saltRounds = 10;

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

userSchema.pre('save',function(next){//next is next of middle ware functions
    var user=this;//this is userSchema used to call pre function just line above

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            else{
            bcrypt.hash(user.password,salt, (err,hash)=>{
                if(err) return next(err);
                else{
                user.password=hash;
                next ();
                }
            })
        }
        })
    }else{
        next ();
    }
})

const User=mongoose.model('user',userSchema);
module.exports= { User }