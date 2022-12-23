const express = require('express');
const app = express();
const model = require('./conn/schema')
const port = process.env.PORT || 5000;

app.use(express.json());
require('./conn/conn')
app.get('/', (req, res) => {
    res.json({
        msg: "this is server side"
    })
})
app.post('/addexpense', async (req, res) => {
    const { ledger, date, amount, narration } = req.body;
    // console.log(req.body);
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
app.post('/ledger', async (req, res) => {
    const ledger = req.body.ledger;
    // console.log(ledger)
    const result = await model.find({ledger});
    console.log(result)
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
app.delete('/addexpense', async (req, res) => {
    const _id = req.body.id;
    const result = await model.findByIdAndDelete({_id});
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
app.patch('/addexpense', async (req, res) => {
    const { _id,ledger, date, amount, narration } = req.body;
    // console.log(_id,ledger, date, amount, narration);
    const result = await model.findByIdAndUpdate({_id},{ledger, date, amount, narration});
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
app.post('/data', async (req, res) => {
    const _id = req.body.id;
    console.log(_id)
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

app.listen(port, () => {
    console.log(`server listening at ${port}`);
})