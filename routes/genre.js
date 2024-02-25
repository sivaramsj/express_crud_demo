const express=require('express');
const router = express.Router();
const Joi =require('joi');
const mongoose = require('mongoose');



const genreSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 5,
        maxlength:30
    }
});

const Genre = mongoose.model('Genre',genreSchema);

router.get('/',async (req,res)=>{
    const genres = await Genre.find()
    res.send(genres);
});



router.get('/:id',async (req,res)=>{

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
});



router.post('/',async(req,res)=>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
   
    console.log(req.body.name);
    const genre =await new Genre({name:req.body.name});
    await genre.save()
    
    res.send(genre);
});


router.put('/:id',async (req,res)=>{    
    let genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("The genre with given id is not found");

    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name=req.body.name
    await genre.save()
    res.send(genre);
});



router.delete('/:id',async (req,res)=>{
    let genre= await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
});


function validateGenre(req){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
    });

    return schema.validate(req);
}


module.exports=router