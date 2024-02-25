// 3rd party modules
const config=require('config');

// custom modules
const logger= require('./middleware/logger');
const genre =require('./routes/genre')

const mongoose= require('mongoose');
const express = require('express');
const app =express();


mongoose.connect('mongodb://localhost/movie_list')
    .then(()=> console.log('Connected to mongodb ....'))
    .catch(() => console.log('could not connect to mongodb'));

app.use(express.json());
// app.use(logger);
app.use('/api/genre',genre)





app.listen(5000,()=>console.log('App listening in port 5000....'));