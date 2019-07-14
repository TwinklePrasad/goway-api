const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  coupon
router.get('/', (req, res) => {
    db.query('SELECT * FROM coupon', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an coupon
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM coupon WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an coupon
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM coupon WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an coupon
router.post('/', function (req, res, next) {
    
    var title = req.body.title;
    var code = req.body.code;
    var description = req.body.description;
    var discount_percent = req.body.discount_percent;
    var discount_flat = req.body.discount_flat;
    var start_at = req.body.start_at;
    var expiration_at = req.body.expiration_at;

    var sql = `INSERT INTO coupon(title, code,description,discount_percent,discount_flat,start_at,expiration_at) VALUES("${title}", "${code}","${description}",${discount_percent},${discount_flat},${start_at},${expiration_at});`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an coupon
router.put('/:id', (req, res) => {
    let coup = req.body;
    console.log("coup = " + coup);
    console.log(req.params.id);
    let sql = `UPDATE coupon SET title="${coup.title}", code="${coup.code}",description="${coup.description}", discount_percent=${coup.discount_percent},discount_flat=${coup.discount_flat},start_at=${coup.start_at},expiration_at=${coup.expiration_at} WHERE id = ${req.params.id};`;

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