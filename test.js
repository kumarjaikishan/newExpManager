// console.log("this is from test")

// setInterval(() => {
//     const timee = new Date();
//     console.log(timee.getUTCSeconds());
//     if(timee.getUTCSeconds()==5){
//         console.log("hai working hai")
//     }
// }, 1000);
var cron = require('node-cron');

cron.schedule("5 * * * * *",async ()=> {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    // console.log(new Date().toLocaleString());
    // const res = await fetch('https://kishanblogg.000webhostapp.com/auto/index.php')
    //     const datae = await res.json();
        // console.log(datae);
  });