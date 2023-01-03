const mongo = require('mongoose');
const urie = require('./middle');
const db =urie;
// const db ='mongodb+srv://jai:Jai%404880@cluster0.4ntduoo.mongodb.net/exp?retryWrites=true&w=majority';
// console.log(urie.uri);
mongo.set('strictQuery', false);
mongo.connect(db).then(()=>{
 console.log("connection to Mongodb successful");
}).catch((e)=>{
    console.log(e)
})