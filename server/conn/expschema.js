const mongo = require('mongoose');

const expe = new mongo.Schema({
    userid:{
        type:String
    },
    ledger:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    narration:{
        type:String,
        required:true
    }
})
const model = new mongo.model("expense",expe);
module.exports=model;