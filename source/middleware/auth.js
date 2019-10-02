const jwt=require("jsonwebtoken");
const User=require("./../models/user.js")
const authenticate=async (req,res,next)=>{
    try{
        const token=req.header("authorization").replace("Bearer ","");
    const decode=jwt.verify(token,"this is my new course");
    const user=await User.findOne({_id:decode._id,"tokens.token":token})
    if(!user){
        throw new Error();
    }
    req.token=token;
    req.user=user;
    next();
}catch(e){
    res.status(503).send({e:"no user found"})
}
}
module.exports=authenticate;