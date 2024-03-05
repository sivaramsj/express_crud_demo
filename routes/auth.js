// login routes
const express=require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const Joi = require('joi');
const _ =require('lodash')
const {User}=require('../models/User') 



router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send("Invalid email or password");

    const validatePassword=await bcrypt.compare(req.body.password,user.password);
    if (!validatePassword) return res.status(400).send("Invalid username or password");

    const token =user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

function validate(req){

    const Schema=Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required(),
    });
   
    return Schema.validate(req);
}


module.exports=router