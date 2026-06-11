import User from "../models/auth.models.js";
import bcrypt from "bcryptjs";
export async function signup(req,res){
    try{
    if(!req){
        return res.status(400).json({message:"Bad request"});
    }
        const {name,email,password,confirmPassword}=req.body;
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({message:"all fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"passwords do not match"});
        }
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message:"user already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();
        return res.status(201).json({message:"user created successfully"});
    }catch(error){ 
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}



