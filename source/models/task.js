const mongoose=require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{useNewUrlParser:true});
const taskschema=mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true

    },
    completed:{
        type:Boolean,
        default:false
    },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }
    
},{timestamps:true})
const Task=mongoose.model("Task",taskschema);
// const val=new task({
//    description:"     hey mongodb    "
// })
// val.save().then(()=>{
//     console.log(val)
// }).catch((error)=>{
//     console.log(error+ "error");
// })
module.exports=Task;