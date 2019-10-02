const mongoose=require("mongoose");
const validator=require("validator")
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{useNewUrlParser:true},(error,res)=>{
    if(error){
        return console.log( "error");
    }
    else{
        console.log("connected ");
    }
})
// const User=mongoose.model("User",{name:{
//     type:String, 
//     required:true,
//     trim:true
// }
//   ,
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 console.log("error");
//             }
//         }
//     }, 
//     criteria:{
//         type:Boolean
// },
// Email:{
//     type:String,
//     required:true,
//     lowercase:true,
//     validate(value){
//         if(!validator.isEmail(value)){
//             throw new Error("Email is not valid")
//         }
//     }
// },
// password:{
//     type:String,
//     validate(value){
//       if(value.length<6)
//        throw new Error("Password must be greater than 6");
//     },
//     required:true
// }
// });
// const user=new User({
//     name:"      SHYAM    ",
//     age:89,
//     criteria:true,
//     Email:"SHYAM@GOOGLE.COM",
//     password:"aks"
// });
// user.save().then(()=>{
//     console.log(user);
// }).catch((error)=>{
//     console.log("error" + error);
// })
//     }
// })
    