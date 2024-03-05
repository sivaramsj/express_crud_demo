const mongoose = require('mongoose');
const Joi =require('joi');


const genreSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 5,
        maxlength:30
    }
});

const Genre = mongoose.model('Genre',genreSchema);



function validateGenre(req){
    const schema=Joi.object({
        name:Joi.string().min(5).required(),
    });

    return schema.validate(req);
}

exports.Genre=Genre
exports.validateGenre=validateGenre