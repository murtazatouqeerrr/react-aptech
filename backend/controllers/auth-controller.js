const { request } = require("express");
const User = require("../models/auth-model");

const bcrypt = require("bcryptjs")


const home = async (req,res)=>{
    try {
        res.status(200).send("welcome to home page")
        
    } catch (error) {
        console.log(error);
        
        
    }
}
const register = async (req,res)=>{
    try {

        const {username,email,password,phone} = req.body;

        const UserExist  = await User.findOne({email})
        if (UserExist) {
            return res.status(400).send("Bad request, Email already registered")
        }

        else {
            const saltRound = 10;
            const hash_pass = await bcrypt.hash(password, saltRound)

            const userCreated = await User.create ({username,email,password:hash_pass,phone})
            return res.status(201).json ({msg: "user created succesfully", userCreated})
        }

        // res.status(200).send("welcome to Register page")
        
    } catch (error) {
        console.log(error);
        
        
    }
}
const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const UserExist  = await User.findOne({email});
        if (!UserExist){
            res.status(400).json({msg : "invalid credentials.."})
        }
        const user = await bcrypt.compare(password,UserExist.password)
       
       if (user){
        res.status(200).json({msg : "Login Succesfull",
            token: await UserExist.generateToken()
        })
       }
        else{

res.status(400).json({msg : "invalid credentials.."})
        }
        // res.status(200).send("welcome to Login page")
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = {home,register,login}