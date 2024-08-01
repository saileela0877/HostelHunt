const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const JWT_SECRET = "GaneshCBIT$@"
var jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

router.post('/createuser',[
    body("username").isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:5}),
    body("role").isString()
],
    async (req,res)=>{
        try{
        success = false;
        const errors=validationResult(req);
        console.log(errors.length);
        console.log(req.body);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)
        let user = await User.findOne({email : req.body.email})
        if(user){
            
            return res.status(500).json({success,message:"User with this email already exists"})
        }
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            role: req.body.role
        });
        // console.log(user);

        const data={
            user:{
                id:user.id
            }
        }
        success = true
        const authtoken = jwt.sign(data,JWT_SECRET);
        res.json({success, authtoken})
        
    }
        catch(err){
            console.log(err);
            return res.status(500).json("internal server error")
        }
    }
    );

router.post(
    '/login',
    [
        body("email").isEmail(),
        body("password").exists(),
    ],
    async(req, res)=>{
        try{
            var success = false
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            const {email, password} = req.body;
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error: "login with correct credentials"})
            }
            const passwordCompare = await bcrypt.compare(password, user.password)
            if(!passwordCompare){
                success = false;
                return res.status(400).json({success, error:"login with correct credentials"});
            }
            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data,JWT_SECRET)
            success = true;

            // localStorage.setItem("user",JSON.stringify(user));

            return res.json({success, authtoken})
        }catch(err){
            console.log(err)
            return res.status(500).json("Internal server error")
        }   
    }
);

router.get('/getuser',fetchUser, async(req, res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        return res.send(user)
    }catch(err){
        console.log(err);
        return res.status(500).json("internal server error")
    }
})

module.exports = router;