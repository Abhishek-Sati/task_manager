const express=require("express");
const Task=require("../models/task.js");
const auth=require("./../middleware/auth.js")
const router=new express.Router();
router.post("/tasks",auth,async (req,res)=>{
  //  const task=new Task(req.body)
  const task=new Task({
    ...req.body,
    owner:req.user._id
})
    try{
    await task.save();
    res.status(201).send(task)
    
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/tasks",auth,async (req,res)=>{
    const match={}
    if(req.query.completed){
        match.completed=req.query.completed==="true";
    }
        const sort={}
        if(req.query.sortBy){
            const arr=req.query.sortBy.split(":");
            sort[arr[0]]=arr[1]==="desc"?-1:1;
        }
    
    try{
        // const task=await Task.find({owner:req.user._id})
        // await task[0].populate("owner").execPopulate();
        // const user=task[0].owner;
        // res.status(200).send({task,user})
        await req.user.populate({
            path:"tasks",
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks);
    }catch(error){
        res.status(500).send(error)
    }
})

router.get("/tasks/:id",auth,async(req,res)=>{
    const _id=req.params.id;
    try{
    const task=await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(400).send();
        }
        await task.populate("owner").execPopulate();
        const user=task.owner;
        res.status(200).send({task,user})
    }catch(error){
        res.status(500).send("error" +error)
    }
})

router.patch("/tasks/:id",auth,async (req,res)=>{
    const accessed=Object.keys(req.body);
    const updates=["completed","description","ready"];
    const isvalid=accessed.every((update)=>updates.includes(update));
    if(!isvalid){
        res.status(400).send("not a valid property to update");
    }
    try{
        const task =await Task.findOne({_id:req.params.id,owner:req.user._id})
    // const task1=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if(!task){
        res.status(404).res("Task not available for that id")
    }
    accessed.forEach((update)=> task[update]=req.body[update])
    await task.save();
    res.status(200).send(task);
}catch(e){
    res.status(400).send("cant update");
}
})

router.delete("/tasks/:id",auth,async(req,res)=>{
    try{
const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
if(!task){
    res.status(400).send("nothing to delete");
}
res.status(200).send(task);
    }catch(e){
        res.status(400).send(e);
    }
})
module.exports=router;