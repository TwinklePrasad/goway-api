const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  rider
router.get('/', (req, res) => {
    db.query('SELECT * FROM rider', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an rider
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM rider WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an rider
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM rider WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an rider
router.post('/', function (req, res, next) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var mobile_number = req.body.mobile_number;
    var balance = req.body.balance;
    var address = req.body.address;
    var sql = `INSERT INTO rider(first_name, last_name,mobile_number,balance,address) VALUES("${first_name}", "${last_name}",${mobile_number},"${balance}","${address}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an rider
router.put('/:id', (req, res) => {
    let rid = req.body;
    console.log("rid = " + rid);
    console.log(req.params.id);
    let sql = `UPDATE rider SET first_name="${rid.first_name}", last_name="${rid.last_name}",mobile_number=${rid.mobile_number}, balance=${rid.balance},address="${rid.address}" WHERE id = ${req.params.id};`;

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