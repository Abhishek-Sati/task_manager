//this is by async await method :- 
const express=require("express");
const bcrypt=require("bcrypt");
const User =require("./models/user.js");
const Task=require("./models/task.js");
const userrouter=require("./routers/userrouters");
const taskrouter=require("./routers/taskrouter");
const mongoose=require("mongoose");
const multer=require("multer");
mongoose.connect(process.env.connectionurl,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true },(error,res)=>{
    if(error){
        return console.log( "error");
    }
    else{
        console.log("connected ");
    }
})
const app=express();
const port=process.env.PORT;
app.use(express.json());
app.use(userrouter);
app.use(taskrouter);
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})

