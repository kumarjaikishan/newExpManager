if(process.env.NODE_ENV=='production'){
       module.exports=process.env.db;
}else{
    module.exports=require('./mongouri')
}