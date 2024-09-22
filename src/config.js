const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb://localhost:27017/admin")


connect.then(()=>{
    console.log("Database connected successfully");
}).
catch(()=>{
    console.log("Database not connected ");
})

const loginschema= new mongoose.Schema({

    name:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    }

})

const collection=new mongoose.model("users",loginschema);
module.exports=collection;