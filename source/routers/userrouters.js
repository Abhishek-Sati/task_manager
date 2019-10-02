const bcrypt=require("bcrypt");
const express=require("express");
const User =require("../models/user.js");
const router=new express.Router();
const authenticate=require("./../middleware/auth.js")
const multer=require("multer");
const sharp=require("sharp");
const {sendwelcomeemail,deleteemail}=require("./../emails/myacc")
router.post("/users",async (req,res)=>{
   const user=new User(req.body);
  try{
      const token =await user.generateauthtoken();
      await user.save();
      sendwelcomeemail(user.Email,user.name);
      res.status(200).send({user,token});
  }catch(e){
      res.status(400).send(e);
  }
})
router.get("/users/me",authenticate,async(req,res)=>{
    try{
    res.status(201).send(req.user)
    }catch(e){
        res.status(201).send(e)
    }
})
router.get("/users/:id",async(req,res)=>{
    try{
    const _id=req.params.id;
     const users=await User.findById(_id)
        if(!users){
            return res.status(400).send();
        }
        res.status(200).send(users)
    }catch(error){
        res.status(500).send("error" +error)
    }
})
router.patch("/users/me",authenticate,async(req,res)=>{
    const updaters=Object.keys(req.body);
    console.log(updaters);
    const checkupdate=["name","age","criteria","Email","password"];
    const check=updaters.every((update)=>{
        return checkupdate.includes(update);
    })
    if(!check){
        res.status(400).send("not a valid key to be updated");
    }
    try{
        // const user=await User.findById(req.user._id);
        updaters.forEach(element => {
            req.user[element]=req.body[element]
        });
    // const user1=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    // if(!user){
    //    return res.status(400).send();
    // }
    await req.user.save();
    res.status(201).send(req.user);
}catch(e){
    res.status(200).send(e);
}
})
router.delete("/users/me",authenticate,async (req,res)=>{
    try{
    // const del=await User.findByIdAndDelete(req.user._id);
    // if(!del){
    //     res.status(400).send("user not found");
    // }
    await req.user.remove();
    deleteemail(req.user.Email,req.user.name);
    res.status(201).send(req.user);
    }catch(e){
        res.status(400).send("error"+e);

    }
})
router.post("/users/login",async(req,res)=>{
    try{
const user=await User.findByCredentials(req.body.Email,req.body.password);
const token=await user.generateauthtoken();

res.status(200).send({user,token});
}catch(e){
    res.status(400).send(e);
}
})
router.post("/users/logout",authenticate,async(req,res)=>{
   try{ 
    req.user.tokens=req.user.tokens.filter((token)=>{
     return token.token !== req.token;
    })
    await req.user.save();
    res.status(201).send("You have been logged out");
}
    catch(e){
        res.status(500).send("Sorry ! Can't log you out");
    }
})
router.post("/users/logoutall",authenticate,async(req,res)=>{
    try{
        req.user.tokens=[];
    await req.user.save();
    res.status(201).send("You have been logged out of all sessions");
}catch(e){
    res.status(500).send("Sorry ! Something wemt wrong")
}
})
const upload=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        // if(file.originalname.endsWith(".jpg")){    //it can also be done by using regular expressions :-
        if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb(undefined,true);
           
        }
       
        cb(new Error("Please provide an image"));  
    }
})
router.post("/users/me/pic",authenticate,upload.single("mypic"),async(req,res)=>{
    const bufferdata=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    req.user.avatar=bufferdata;
    await req.user.save();
    res.send("Profile Picture Uploaded")
},(err,req,res,next)=>{
    res.status(400).send({error:err.message})
})
router.delete("/users/me/pic",authenticate,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save();

    res.send("Profile Pic Removed");
})
router.get("users/avatar/:id",async(req,res)=>{
   try{
    const user=await User.findById(req.params.id);
    if(!user||!user.avatar){
       throw new Error("user not found")
    }
    res.set("Content-Type","image/png")
    res.send(user.avatar)
}
catch(e){
    res.send(e.message)

}
})
module.exports=router;