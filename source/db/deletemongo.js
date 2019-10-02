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
db.collection("users").deleteOne({
    _id:new ObjectID("5d7fb21c6096db22f0fccfc3")
}).then((result)=>{
    console.log("deleted");
}).catch((error)=>{
    console.log("error");
})
})