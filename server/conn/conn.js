const mongo = require('mongoose');
const db ='mongodb+srv://jai:Jai%404880@cluster0.4ntduoo.mongodb.net/exp?retryWrites=true&w=majority';

mongo.set('strictQuery', false);
mongo.connect(db).then(()=>{
 console.log("connection to Mongodb successful");
}).catch((e)=>{
    console.log(e)
})