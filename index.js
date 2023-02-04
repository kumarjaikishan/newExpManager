const express = require('express');
const app = express();
const model = require('./conn/expschema')
const user = require('./conn/loginschema')
const port = process.env.PORT || 5000;
const fileupload = require('express-fileupload')
const fs = require('fs');

app.use(express.json());
require('./conn/conn')
require('./test');

// if(process.env.NODE_ENV=='production'){
//     const path = require('path')

//     app.get('/',(req,res)=>{
//         app.use(express.static(path.resolve(__dirname,'client','build')))
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }else{
const path = require('path')

app.use(fileupload({
    useTempFiles: true
}))
app.post('/photo', async (req, res) => {
   
    let file = req.files.file
    let filename = file.name
    // console.log(req.body);
    // console.log("file added" + filename);
    file.mv('./client/build/img/' + filename, async function  (err)  {
        if (err) {
            console.log(err);
        } else {
            const toremove = await user.findById({ _id: req.body.user });
            var filePath = './client/build/img/' + toremove.imgsrc; 
           
            // console.log("success uploaded")
            const result = await user.findByIdAndUpdate({ _id: req.body.user }, { imgsrc: filename });
            // console.log(result);
            if (result) {
                res.status(201).json({
                    msg: "photo uploaded",
                    data: result
                })
            } else {
                res.status(201).json({
                    msg: "something wrong",
                    data: result
                })
            }
            console.log("file moved : "+toremove.imgsrc);
            if(filePath){
                try {
                    fs.unlinkSync(filePath);
                } catch (error) {
                    
                }
            }
        }
    })
})

app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})
// }


//    for adding expense data into database
app.post('/addexpense', async (req, res) => {
    const { userid, ledger, date, amount, narration } = req.body;
    if (!userid || !ledger || !date || !amount || !narration) {
        res.json({
            msg: "all fields are required"
        })
    } else {
        const query = new model({ userid, ledger, date, amount, narration });
        const result = await query.save();
        if (result) {
            res.json({
                msg: "data inserted successfully"
            })
        } else {
            res.json({
                msg: "something went wrong in db"
            })
        }
    }

})
//    for adding expense data into database ends here


//    for fetching all expense data from database
app.post('/explist', async (req, res) => {
    const userid = req.body.userid;
    try {
        const result = await model.find({ userid }).sort({ date: -1 });
        if (result) {
            res.json({
                msg: "data found",
                data: result
            })
        } else {
            res.json({
                msg: "something went wrong in db"
            })
        }
    } catch (error) {
        res.json({
            msg: "wrong",
            data: error
        })
    }

})
//    for fetching all expense data from database ends here


//    for fetching ledger  data from database
app.post('/ledger', async (req, res) => {
    const { userid, ledger } = req.body;
    // console.log(userid,ledger)
    const result = await model.find({ userid, ledger });
    // console.log(result)
    if (result) {
        res.json({
            msg: "data found",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong in db"
        })
    }
})
//    for fetching ledger  data from database



//    for deleting exp data from database
app.delete('/addexpense', async (req, res) => {
    const _id = req.body.id;
    const result = await model.findByIdAndDelete({ _id });
    if (result) {
        res.json({
            msg: "data deleted",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong in db"
        })
    }
})
//    for deleting exp data from database ends here

//    for deletingMany exp data from database
app.delete('/delmany', async (req, res) => {
    const id = req.body.id;
    if (!id) {
        res.json({
            msg: "Send some id",
        })
    }
    const result = await model.deleteMany({
        _id: { $in: id }
    });
    if (result) {
        res.json({
            msg: "data deleted",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong in db"
        })
    }
})
//    for deletingMany exp data from database ends here


//    for updateing exp data into database
app.patch('/addexpense', async (req, res) => {
    const { _id, ledger, date, amount, narration } = req.body;
    // console.log(_id,ledger, date, amount, narration);
    const result = await model.findByIdAndUpdate({ _id }, { ledger, date, amount, narration });
    if (result) {
        res.json({
            msg: "data deleted",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong in db"
        })
    }
})
//    for updateing exp data into database ends here

//    for fetching exp data from database
app.post('/data', async (req, res) => {
    const _id = req.body.id;
    // console.log(_id)
    const result = await model.find({ _id });
    if (result) {
        res.json({
            msg: "data found",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong"
        })
    }
})
//    for fetching exp data from database ends here



//    for update expense legere data into database
app.post('/updateexpledger', async (req, res) => {
    const action = req.body.action;
    const userid = req.body.userid;
    const oldledger = req.body.oldledger;
    const newledger = req.body.newledger;
    console.log(userid + " " + action + "  " + oldledger + " " + newledger);
    if (action == "update") {
        const result = await model.updateMany({ userid, ledger: oldledger }, { ledger: newledger })
        // console.log(result);
        if (result) {
            res.json({
                msg: "ledger Updated in expense",
                data: result
            })
        } else {
            res.json({
                msg: "something went wrong"
            })
        }
    }
    if (action == "delete") {
        try {
            const result = await model.deleteMany({ userid, ledger: oldledger })
            // console.log(result);
            if (result) {
                res.json({
                    msg: "ledger Updated",
                    data: result
                })
            } else {
                res.json({
                    msg: "something went wrong"
                })
            }
        } catch (error) {
            res.send(error);
        }

    }

})
//    for update expense legere data into database ends here


//    for login user data from database
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await user.find({ email, password });
        if (result.length) {
            const userid = result[0]._id;
            const query = await model.find({ userid }).sort({ date: -1 });
            if (query) {
                res.status(200).json({
                    login: true,
                    data: result,
                    explist: query
                })
            }
        } else {
            res.status(200).json({
                login: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "NO USER FOUND",
        })
    }

})
//    for login user data from database end here




//    for signup user data into database
app.post('/signup', async (req, res) => {
    const { name, email, phone, password, date, ledger,imgsrc } = req.body;
    // console.log(email + " " + password)
    if (!name || !email || !phone || !password || !date || !ledger) {
        res.json({
            msg: "all fields are required"
        })
    }
    try {
        const query = new user({ name, email, phone, password, date, ledger,imgsrc });
        const result = await query.save();
        if (result) {
            res.status(201).json({
                msg: "SignUp successfully",
                data: result
            })
        } else {
            res.status(500).json({
                msg: "something went wrong in db"
            })
        }
    } catch (error) {
        res.send(error);
    }


})
//    for signup user data into database ends here

//    for ledger detail from database
app.post('/leg', async (req, res) => {
    const { _id, leddetail } = req.body;
    //    console.log(leddetail.length)
    if (leddetail.length < 1) {
        res.json({
            msg: "ledger can't be empty",
        })
    }
    const result = await user.findByIdAndUpdate({ _id }, { ledger: leddetail });
    if (result) {
        res.json({
            msg: "ledger sync",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong in db"
        })
    }
})
//     for ledger detail from database end here


app.listen(port, () => {
    console.log(`server listening at ${port}`);
})