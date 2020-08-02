const {User} =require('../models/user');

let auth = (req,res,next)=>{
     let token=req.cookies.user_auth;
     //how the data is in User variable with which we are calling the find one function
     User.findByToken(token, (err, user)=>{
         if(err) throw err;
         if(!user)//?? matching with which user i.e what !user means
         {
             return res.json({
                 auth:false,
                 err:true
             })
         }

         req.token=token;
         req.user=user;
         next();
     })
}

module.exports={auth}