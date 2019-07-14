const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  rider_transaction
router.get('/', (req, res) => {
    db.query('SELECT * FROM  rider_transaction LEFT JOIN rider ON rider.id = rider_transaction.rider_id LEFT JOIN operator ON operator.id = rider_transaction.operator_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an  rider_transaction
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM  rider_transaction WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an  rider_transaction
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM  rider_transaction WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an  rider_transaction
router.post('/', function (req, res, next) {
    var transaction_time = req.body.transaction_time;
    var transaction_type = req.body.transaction_type;
    var amount = req.body.amount;
    var document_number = req.body.document_number;
    var details = req.body.details;
    var sql = `INSERT INTO  rider_transaction(transaction_time, transaction_type,amount,document_number,details) VALUES(${transaction_time}, ${transaction_type},${amount},"${document_number}","${details}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an  rider_transaction
router.put('/:id', (req, res) => {
    let trans = req.body;
    console.log("trans = " + trans);
    console.log(req.params.id);
    let sql = `UPDATE  rider_transaction SET transaction_time="${trans.transaction_time}",transaction_type=${trans.transaction_type},amount=${trans.amount},document_number="${trans.document_number}",details="${trans.details} " WHERE id = ${req.params.id};`;
     console.log("sql = " + sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })

});

module.exports = router;