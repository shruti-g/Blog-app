const express=require('express')
const app=express();
const mongoose=require('mongoose')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const {User}=require('./models/user')

const config=require('./config/key')


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
app.listen(5000,()=>{
    console.log("server is up and running on port 5000");
})