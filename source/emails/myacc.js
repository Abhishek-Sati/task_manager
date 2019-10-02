const sgmail=require("@sendgrid/mail");
sgmail.setApiKey(process.env.sendgridAPIKEY);
const sendwelcomeemail=(Email,name)=>{
    const msg={
        to:Email,
        from:"abhishek01sati@gmail.com",
        subject:`hey ${name} ! welcome to send grid`,
        text:"for registration you have to do several steps"
    }
    sgmail.send(msg).then().catch((e)=>{
        console.log(e);
    });
}
const deleteemail=(Email,name)=>{
     const message={
         to:Email,
         from:"abhishek01sati@gmail.com",
         subject:`Feel bad to see you go ${name}`,
         text:"have a great day"
     }
     sgmail.send(message).then().catch((e)=>{
        console.log(e);
    });;
}
module.exports={
    sendwelcomeemail,
    deleteemail
}