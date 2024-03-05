const express=require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre,validateGenre} =require('../models/genre')




router.get('/',async (req,res)=>{
    const genres = await Genre.find()
    res.send(genres);
});



router.get('/:id',async (req,res)=>{

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
});



router.post('/',auth,async(req,res)=>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
   
    const genre =await new Genre({name:req.body.name});
    await genre.save()
    
    res.send(genre);
});


router.put('/:id',auth,async (req,res)=>{    
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    
    let genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre with given id is not found");


    genre.name=req.body.name
    await genre.save()
    res.send(genre);
});



router.delete('/:id',[auth,admin],async (req,res)=>{
    let genre= await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
});




module.exports=router