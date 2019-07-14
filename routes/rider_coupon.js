const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  rider_coupon
router.get('/', (req, res) => {
    db.query('SELECT * FROM rider_coupon LEFT JOIN rider ON rider.id = rider_coupon.rider_id LEFT JOIN coupon ON coupon.id = rider_coupon.coupon_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an rider_coupon
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM rider_coupon WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an rider_coupon
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM rider_coupon WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an rider_coupon
router.post('/', function (req, res, next) {
    
    var times_used = req.body.title;
   
    var sql = `INSERT INTO rider_coupon(times_used) VALUES("${times_used}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an rider_coupon
router.put('/:id', (req, res) => {
    let rico = req.body;
    console.log("rico = " + rico);
    console.log(req.params.id);
    let sql = `UPDATE rider_coupon SET times_used="${rico.times_used}" WHERE id = ${req.params.id};`;

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