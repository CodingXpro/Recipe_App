import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../models/Users.js';
const router=express.Router();


router.post('/register',async(req,res)=>{
    
    const {username,password}=req.body;
    const user=await UserModel.findOne({username});
    if(user){
        return res.json({message:"User already exist"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new UserModel({username,password:hashedPassword});
    await newUser.save();
    res.json({message:"User Registered SuccessFully!"});
    
});
router.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const user=await UserModel.findOne({username});
    if(!user){
        return res.json({message:"User does not exist"});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        res.json({
            message:"Username or Password is incorrect"
        })
    }
    const token=jwt.sign({id:user._id},"HDGSGYDDUBU132423");
    res.send({token,userID:user._id});
    // res.json({userID:user._id,token});
});

export default router;