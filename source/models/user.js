const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Task=require("./task")
// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{useNewUrlParser:true},(error,res)=>{
//     if(error){
//         return console.log( "error");
//     }
//     else{
//         console.log("connected ");
const userschema=new mongoose.Schema({name:{
    type:String, 
    required:true,
    trim:true
}
  ,
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                console.log("error");
            }
        }
    }, 
    criteria:{
        type:Boolean
},
Email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is not valid")
        }
    }
},
password:{
    type:String,
    validate(value){
      if(value.length<6)
       throw new Error("Password must be greater than 6");
    },
    required:true
},
avatar:{
      type:Buffer
},
tokens:[{
  token:{
    required:true,
    type:String
}
}]
},{timestamps:true});
userschema.virtual("tasks",{
    ref:"Task",
    localField:"_id",
    foreignField:"owner"
})
userschema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}
userschema.methods.generateauthtoken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save();
    return token;
}
userschema.statics.findByCredentials=async (Email,password)=>{
    const user=await User.findOne({Email});
    if(!user){
        throw new Error("NO user available");
    }
    const passmatch=await bcrypt.compare(password,user.password);
    if(!passmatch){
        throw new Error("No user available");
    }
    return user;
}
userschema.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
    user.password=await bcrypt.hash(user.password,8);
    }
    next();
})
userschema.pre("remove",async function(next){
    const user=this;
    await Task.deleteMany({owner:user._id})
    next();
})

const User=mongoose.model("User",userschema);
module.exports=User