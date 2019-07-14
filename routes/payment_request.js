const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  payment_request
router.get('/', (req, res) => {
    db.query('SELECT p.id,request_timestamp,payment_timestamp,amount,p.account_number,comment, first_name, last_name, mobile_number FROM payment_request as p LEFT JOIN driver as d ON d.id = p.driver_id ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an payment_request
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM payment_request WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an payment_request
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM payment_request WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an payment_request
router.post('/', function (req, res, next) {
    
    var request_timestamp = req.body.request_timestamp;
    var payment_timestamp = req.body.payment_timestamp;
    var amount = req.body.amount;
    var account_number = req.body.account_number;
    var status = req.body.status;
    var comment = req.body.comment;
    var sql = `INSERT INTO payment_request(request_timestamp,payment_timestamp,amount,account_number,status,comment) VALUES(${request_timestamp},${payment_timestamp},${amount},"${account_number}",${status},"${comment}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an payment_request
router.put('/:id', (req, res) => {
    let paym = req.body;
    console.log("paym = " + paym);
    console.log(req.params.id);
    let sql = `UPDATE payment_request SET request_timestamp=${paym.request_timestamp},payment_timestamp=${paym.payment_timestamp},amount=${paym.amount},account_number="${paym.account_number}",status=${paym.status},comment="${paym.comment}" WHERE id = ${req.params.id};`;

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