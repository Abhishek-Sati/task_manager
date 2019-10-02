const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;
const ObjectID=mongodb.ObjectID;
// const {MongoClient,ObjectID}=require("mongodb");// we can also write these as destructuring instead of upper 3 lines :-
const connectionURL="mongodb://127.0.0.1:27017";
const dbName="taskmanager";
MongoClient.connect(connectionURL,{useNewUrlParser:true, useUnifiedTopology: true },(error,client)=>{
    if(error){
        return console.log("error");
    }
console.log("connected");
const db=client.db(dbName);
db.collection("users").findOne({id:new ObjectID("5d7fc48d8e8e940d20824b23")},(error,res)=>{
    if(error){
        return console.log("error");
    }
    else{
        console.log(res);
    }
})
db.collection("users").find({age:78}).toArray((error,result)=>{
    if(error){
        console.log("error");
    }
    else{
        console.log(result);
    }
})
// db.collection("users").insertOne({
//     id:id,
//     name:"Karan",
//     age:31
// },(error,result)=>{
//     if(error){
//         console.log("error");
//     }
//     else{
//         console.log(result.ops);
//     }
// })
// db.collection("users").insertMany([{
//    name:"johny",
//    age:78 
// },{
//     name:"Aron",
//     age:43
// }],(error,result)=>{
//     if(error)
//     {
//         return console.log("unable to insert");
//     }
//     else{
//         console.log("inserted");
//         console.log(result.ops);
//     }
// })
// db.collection("task").insertMany([{
//     first_name:"Abhishek",
//     last_name:"Sati"
// },{
//     first_name:"Dheeraj",
//     last_name:"negi"
// },{
//     first_name:"Rahul",
//     last_name:"joshi"
// }],(error,result)=>{
//     if(error){
//         return console.log("error");
//     }
//     else{
//         console.log(result.ops);
//     }
// })
})