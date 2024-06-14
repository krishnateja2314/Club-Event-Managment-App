const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const mongoose = require("mongoose")
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173",
};
router.use(cors(corsOptions));

mongoose.connect('mongodb+srv://cs23btech11028:CmOYL6IyOp7YJwy2@database.wecwqyi.mongodb.net/event_managment')
.then(()=>console.log("connected to mongo"))
.catch(err=>console.log(err))
const userSehema = mongoose.Schema({
    username: {
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type : String,
        required:true,
        hide:true,
    },

})
const users = mongoose.model("users",userSehema);

router.get("/auth",async (req,res)=>{
    const {Email,Password} = req.query;
    if (!Email || !Password) {
        return res.status(400).json({ status: "Email and password required" });
    }  try {
        const user = await users.findOne({ email:Email,password:Password });
        if (user) {
            res.status(200).json({ status: "User authenticated", user });
        } else {
            res.status(401).json({ status: "Invalid credentials or User does not exist" });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ status: "Error during authentication", error: error.message });
    }
})


router.use(express.json());
router.post("/new",async (req,res)=>{
    const body = req.body;
    if(!body || !body.Email || !body.Username || !body.Password){
        return res.status(400).json({status : "Error!!!   All feilds required"})
    }
    try {
        await users.create({
            username : body.Username,
            email:body.Email,
            password:body.Password,
        }).then(()=>res.status(200).json({status :"successfully signed up login with those credentials"}))
    } catch (error) {
        res.status(409).json({status : "Error!!!   Email already exists"})
    }

})

module.exports = router