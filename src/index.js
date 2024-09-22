const express=require('express');
const bcrypt=require('bcrypt')
const path=require('path');

const collection=require('./config.js');



const app=express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render('login');
})

app.get("/signup",(req,res)=>{
    res.render('signup');
})

app.post("/signup",async (req,res)=>{

    try{
    const data={
        name:req.body.username,
        password: req.body.password
    }

    const existinguser=await collection.findOne({name:data.name});
    if(existinguser)
        res.send('user already exists, try a different name');

    else
    {
        const saltrounds=10;
        const hashedpassword= await bcrypt.hash(data.password,saltrounds);
        data.password=hashedpassword;
    const userdata=await collection.insertMany([data]);
    console.log(data);
    }
     } catch(error){
        console.log("Sign up failed");

     }

    res.redirect('/');

})


app.post("/login",async(req,res)=>{


    try{

        const check= await collection.findOne({name: req.body.username});
        if(!check){
            return res.send("user not found");
        }

        const ispasswordmatch= await bcrypt.compare(req.body.password,check.password);
        if(!ispasswordmatch)
        {
            res.send("Incorrect password")

        }
        else
        {
            console.log("password matched");
            res.render("home");
        }
    }
    catch
    {
        res.send("wrong details");
        console.log("login failed");
    }
})







app.listen(5000,()=>{
    console.log("Server listening on port 5000");
})