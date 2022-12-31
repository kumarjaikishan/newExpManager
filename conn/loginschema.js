const mongo = require('mongoose');

const log = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    ledger:{
        type:Array
    }
})
const user = new mongo.model("user",log);
module.exports=user;