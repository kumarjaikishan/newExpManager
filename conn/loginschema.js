const mongo = require('mongoose');

const log = new mongo.Schema({
    name:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    imgsrc:{
        type:String,
    },
    ledger:{
        type:Array
    }
})
const user = new mongo.model("user",log);
module.exports=user;