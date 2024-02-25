function log(req,res,next){
    console.log('logging the middleware...')
    next();
};

module.exports=log