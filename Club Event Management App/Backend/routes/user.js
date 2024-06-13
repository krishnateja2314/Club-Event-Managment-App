const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const mongoose = require("mongoose")
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
        type:String,
        required:true,
        hide:true,
    },

})

const users = mongoose.model("users",userSehema);

module.exports = router