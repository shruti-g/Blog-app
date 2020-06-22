const express=require('express')
const app=express();
const mongoose=require('mongoose')
// const MongoClient = require('mongodb').MongoClient;

const uri ='mongodb+srv://shruti:abc@123@blog-app-uyjq4.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Db connected"))
                                            .catch((err)=>console.error("hello",err))

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
// client.connect(err => {
//     // const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     console.log("connectced")
//     client.close();
// });

app.get('/',(req,res) =>{
    res.send("hello world");
})


app.listen(5000,()=>{
    console.log("server is up and running on port 5000");
})