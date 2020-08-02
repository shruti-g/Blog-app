const express=require('express')
const app=express();
const mongoose=require('mongoose')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const {User}=require('./models/user')
const {auth}=require('./middleware/auth')
const config=require('./server/config/key')


mongoose.connect(config.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Db connected"))
                                            .catch((err)=>console.error("hello",err))

app.get('/',(req,res) =>{
    res.send("hello world");
})

app.use(
    bodyParser.urlencoded({
      extended: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser())

//middle ware only the loged in user can acess to some particular data 
app.get('/api/users/auth', auth, (req,res)=>{

    res.status(200).json({
        _id:req._id,
        auth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})

app.post('/api/users/register',(req,res)=>{
    const user=new User(req.body);
    //user.pre('save', function)//it means before saving the data in databse run the fuction in 2nd parameter
    user.save((err,userData)=>{
        if(err)
        {
            return res.json({sucess:false,err})
        }
        else{
            return res.status(200).json(
                {
                    sucess:true
                })
        }
    })

})

app.post('/api/users/login',(req,res)=>{
    //matching user email or finding the user
    //how data entered by us as input for login is stored in this User variable with which we are calling the find one function
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                err:err,
                message:"email not found"
            })
        }


        //comparing the password //else part
        //data entered by the person is stored in user by call back function above 
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch)
            {
                return res.json({
                    loginSucess:false,
                    message:"password not matched",
                    err:err
                })
            }

            //generating Token
            user.generateToken((err,user)=>{
                if(err)
                return res.status(400).json({
                    message:"token not created",
                    err
                })
                else
                res.cookie("user_auth",user.token)
                    .status(200)
                    .json({
                        loginSucess:true,
                        message:"token generated"
                    })
            })
        })
    })

})


app.get('/api/user/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token:" "},(err,doc)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send({
            success:true
        })
    })
})

app.listen(5000,()=>{
    console.log("server is up and running on port 5000");
})