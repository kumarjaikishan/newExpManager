const mongo = require('mongoose');
const urie = require('./middle');
const db =urie.uri;
// console.log(urie.uri);
mongo.set('strictQuery', false);
mongo.connect(db).then(()=>{
 console.log("connection to Mongodb successful");
}).catch((e)=>{
    console.log(e)
})