const express = require('express');
const app = express();
const model = require('./conn/expschema')
const user = require('./conn/loginschema')
const port = process.env.PORT || 5000;

app.use(express.json());
require('./conn/conn')
app.get('/', (req, res) => {
    res.json({
        msg: "this is server side"
    })
})

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
    const result = await model.find({ userid });
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

//    for fetching exp data from database
app.post('/homeload', async (req, res) => {
    const { userid } = req.body;
    const a = new Date();
    // const today = a.toDateString();
    // const today = 2022/12/27;
    const today = (a.getMonth() + 1) + "/" + a.getDate() + "/" + a.getFullYear();
    const yesterday = (a.getMonth() + 1) + "/" + (a.getDate() - 1) + "/" + a.getFullYear();
    const lastweek = (a.getMonth() + 1) + "/" + (a.getDate() - 7) + "/" + a.getFullYear();
    const lastmonth = (a.getMonth()) + "/" + a.getDate() + "/" + a.getFullYear();
    const lastyear = (a.getMonth() + 1) + "/" + a.getDate() + "/" + (a.getFullYear() - 1);

    // today calcumation
    const todaytotal = await model.find({
        userid, date: today
    });

    const todaytotalsum = todaytotal.reduce((accu, val, ind) => {
        return accu = accu + val.amount
    }, 0);
    // today calcumation

    //   yesterdat calcumation
    const yeaterdaytotal = await model.find({
        userid, date: {
            $gte: yesterday,
            $lte: today
        }
    });

    const yesterdaytotalsum = yeaterdaytotal.reduce((accu, val, ind) => {
        return accu = accu + val.amount
    }, 0);
    //   yesterdat calcumation

    // lastweek calculation
    const lastweektotal = await model.find({
        userid, date: {
            $gte: lastweek,
            $lte: today
        }
    });
    const lastweektotalsum = lastweektotal.reduce((accu, val, ind) => {
        return accu = accu + val.amount
    }, 0);
    // lastweek calculation

    // lastmonth calculation
    const monthtotal = await model.find({
        userid, date: {
            $gte: lastmonth,
            $lte: today
        }
    });
    const monthtotalsum = monthtotal.reduce((accu, val, ind) => {
        return accu = accu + val.amount
    }, 0);
     // lastmonth calculation

    // lastyear calculation
    const yeartotal = await model.find({
        userid, date: {
            $gte: lastyear,
            $lte: today
        }
    });
    const yeartotalsum = yeartotal.reduce((accu, val, ind) => {
        return accu = accu + val.amount
    }, 0);
     // lastyear calculation

    // total calculation
    const totale = await model.find({  userid  });
    const totalsum = totale.reduce((accu, val, ind) => {
        return accu = accu + val.amount
    }, 0);
     // total calculation

    // console.log(totaled)
   
   
        res.json({
            msg: "data found",
            data: [{
                Today:todaytotalsum,
                Yesterday:yesterdaytotalsum,
                LastWeek:lastweektotalsum,
                LastMonth:monthtotalsum,
                lastyear:yeartotalsum,
                total:totalsum
            }]
        })
   
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
                msg: "ledger Updated",
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
    // console.log(email + " " + password)
    const result = await user.find({ email, password });
    // console.log(result.length);
    if (result.length) {
        res.status(200).json({
            msg: "Login Successfully",
            data: result
        })
    } else {
        res.status(500).json({
            msg: "NO USER FOUND",
        })
    }
})
//    for login user data from database end here

//    for login user data from database
app.post('/leg', async (req, res) => {
    const { _id, leddetail } = req.body;
    // console.log(_id + " " + leddetail)
    const result = await user.findByIdAndUpdate({ _id }, { ledger: leddetail });
    if (result) {
        res.json({
            msg: "ledger updated",
            data: result
        })
    } else {
        res.json({
            msg: "something went wrong in db"
        })
    }
})
//    for login user data from database end here


//    for signup user data into database
app.post('/signup', async (req, res) => {
    const { name, email, phone, password, date, ledger } = req.body;
    // console.log(email + " " + password)
    if (!name || !email || !phone || !password || !date || !ledger) {
        res.json({
            msg: "all fields are required"
        })
    }
    try {
        const query = new user({ name, email, phone, password, date, ledger });
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


app.listen(port, () => {
    console.log(`server listening at ${port}`);
})