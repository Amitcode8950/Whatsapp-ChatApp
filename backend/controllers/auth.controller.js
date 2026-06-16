import User from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import generatetokenandSavecookie from "../JWT/genertatetoken.js"
export async function signup(req,res){
    try{
        const {name,email,password,confirmpassword}=req.body;
        if(!name || !email || !password || !confirmpassword ){
            return res.status(400).json({message:"all fields are required"});
        }
        if(password !== confirmpassword){
            return res.status(400).json({message:"passwords do not match"});
       }
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message:"user already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({name,email,password:hashedPassword,confirmpassword:hashedPassword});
        await newUser.save();
        if(newUser){
            generatetokenandSavecookie(newUser._id,res)
            res.status(201).json({message:"user created successfully",
            newUser
        });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}


export const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password ){
            return res.status(400).json({message:"all fields are required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            return res.status(400).json({message:"invalid password"});
        }
      

      generatetokenandSavecookie(user._id,res);
        res.status(200).json({message:"user logged in successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email
            }
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}

export const logout=async (req,res)=>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({message:"user logged out successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}