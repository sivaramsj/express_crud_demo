const express=require('express');
const router = express.Router();
const Joi =require('joi');

const genres=[
    {'id':1,'name':'thriller'},
    {'id':2,'name':'action'},
    {'id':3,'name':'comedy'},
];




const Genre = mongoose.model('Genre',genreSchema);

router.get('/',async (req,res)=>{
    res.send(genres);
});



router.get('/:id',async (req,res)=>{
    const genre = genres.find( g => g.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send("The genre with given id is not found");

    res.send(genre);
});



router.post('/',async(req,res)=>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    
    const new_genre={
        'id':genres.length+1,
        'name':req.body.name,
    };
    
    genres.push(new_genre);
    res.send(new_genre);
});


router.put('/:id',(req,res)=>{    
    let genre =genres.find(g=> g.id ===parseInt(req.params.id))
    if (!genre) return res.status(404).send("The genre with given id is not found");

    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.name=req.body.name
    res.send(genre);
});



router.delete('/:id',(req,res)=>{
    let genre =genres.find(g=> g.id ===parseInt(req.params.id))
    if (!genre) return res.status(404).send("The genre with given id is not found");

    let index= genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});


function validateGenre(req){
    const schema=Joi.object({
        'name':Joi.string().min(3).required(),
    });

    return schema.validate(req);
}


module.exports=router