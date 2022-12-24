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
    const { ledger, date, amount, narration } = req.body;
    if (!ledger || !date || !amount || !narration) {
        res.json({
            msg: "all fields are required"
        })
    } else {
        const query = new model({ ledger, date, amount, narration });
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
app.get('/addexpense', async (req, res) => {
    const result = await model.find();
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
    const ledger = req.body.ledger;
    // console.log(ledger)
    const result = await model.find({ ledger });
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


//    for login user data from database
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email + " " + password)
    const result = await user.find({ email, password });
    console.log(result.length);
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


//    for signup user data into database
app.post('/signup', async (req, res) => {
    const { name, email, phone, password, date, ledger } = req.body;
    // console.log(email + " " + password)
    if (!name || !email || !phone || !password || !date || !ledger) {
        res.json({
            msg: "all fields are required"
        })
    } else {
        const query = new user({ name, email, phone, password, date,ledger });
        const result = await query.save();
        if (result) {
            res.status(201).json({
                msg: "data inserted successfully",
                data: result
            })
        } else {
            res.status(500).json({
                msg: "something went wrong in db"
            })
        }
    }
})
//    for signup user data into database ends here


app.listen(port, () => {
    console.log(`server listening at ${port}`);
})