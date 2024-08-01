const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator");
const Hostel = require("../models/Hostel")
const fetchUser=require('../middleware/fetchUser')
const User = require('../models/User')
const JWT_SECRET = "GaneshCBIT$@";
const jwt = require('jsonwebtoken');

// route 1 : to create hostel by hosel owner ( role of user : owner )
router.post(
    '/createhostel',([
        body("hostelName").isLength({min:3}),
        body("location").isLength({min:3}),
        body("fees").isObject().notEmpty(),
        body("weeklyMenu").isArray({min:7, max:7}),
        body("facilities").isArray({min:5}),
        body("DisplayPic").isURL(),
        body("photos").isArray(),
        body("description").isString(),
        body("contact").isNumeric().isLength({min:10, max:10}),
        body("reviews").isString()
    ],fetchUser,
    async(req, res)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }

            

            // const userId = "655673fbc83aa45a20cf362a";
            // // const userId = req.user._id;
            // const user = await User.findById(userId);
            // if(!user){
            //     return res.status(403).json({error:"Permission denied. Only owners can create hostels"});
            // }
            const hostel = await Hostel.create({
                hostelName:req.body.hostelName,
                location:req.body.location,
                fees:req.body.fees,
                weeklyMenu:req.body.weeklyMenu,
                facilities:req.body.facilities,
                DisplayPic:req.body.DisplayPic,
                photos:req.body.photos,
                description:req.body.description,
                contact:req.body.contact,
                reviews:req.body.reviews,
                createdBy:req.body.createdBy
                // createdBy:userId

                
            });
            return res.status(200).json({success:true, hostel});
        }catch(err){
            console.error(err);
            return res.status(500).json("Internal server error in hostel.js", err.response.data)
        }
    }
    )
)

// route 2 :(for hostel owner) to get detials of the hostel to the owner using the id of user
router.get('/getmyhostel/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const hostels = await Hostel.find({ createdBy: userId });

        return res.status(200).json({ success: true, hostels });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal server error in getmyhostel");
    }
});

// route 3 : to get details of all hostels
router.get('/gethostels', async(req, res)=>{
    try{
        const hostels = await Hostel.find();
        return res.status(200).json({success: true, hostels});
    }catch(err){
        console.error(err);
        return res.status(500).json("Internal server error in gethostels");
    }
});

//route 4 : to get details of a single hostel

router.get('/hosteldetails/:id' , async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        const hostel = await Hostel.findById(id);
        return res.status(200).json({success:true, hostel});
    }catch(err){
        console.log(err)
        return res.status(500).json("Internal server error in hosteldetails");
    }
});

router.get('/hosteldetails/:createdBy', async (req, res) => {
    try {
        const { createdBy } = req.params;
        console.log(createdBy);
        const hostel = await Hostel.findOne({ createdBy: createdBy });
        
        if (!hostel) {
            return res.status(404).json({ success: false, message: 'Hostel not found' });
        }

        return res.status(200).json({ success: true, hostel });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error in hosteldetails' });
    }
});


// route 4 : to get details of hostels with location
router.get('/gethostelat/:location', async(req, res)=>{
    try{
    const location = req.params.location;
    const hostels = await Hostel.find({location:location});
    return res.status(200).json({success:true, hostels});
    }catch(err){
        console.error(err);
        return res.status(500).json("Internal server error in gethostelat");
    }
});


module.exports = router