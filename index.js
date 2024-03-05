// 3rd party modules
const config=require('config');

// custom modules
const logger= require('./middleware/logger');
const genre =require('./routes/genre');
const user=require('./routes/User');
const auth=require('./routes/auth');

const mongoose= require('mongoose');
const express = require('express');
const app =express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey is not defined');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/movie_list')
    .then(()=> console.log('Connected to mongodb ....'))
    .catch(() => console.log('could not connect to mongodb'));

app.use(express.json());
// app.use(logger);
app.use('/api/genre',genre);
app.use('/api/user',user);
app.use('/api/auth',auth)





app.listen(5000,()=>console.log('App listening in port 5000....'));