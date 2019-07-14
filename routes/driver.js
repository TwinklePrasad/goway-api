const express = require('express');
var router = express.Router();
var db = require('../db');

//Get all driver
router.get('/', (req, res) => {
    db.query('SELECT d.id ,d.status, d.first_name,d.last_name,d.car_id,p.user_name, d.certificate_number,d.mobile_number, d.rating, d.car_plate,c.title, d.balance, d.operator_id FROM driver as d LEFT JOIN car as c ON c.id = d.car_id LEFT JOIN operator as p ON p.id = d.operator_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an driver
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM driver WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an driver
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM driver WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an driver
router.post('/', function (req, res, next) {
    var id="";
  
    var status = req.body.status;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var certificate_number = req.body.certificate_number;
    var mobile_number = req.body.mobile_number;
    var rating = req.body.rating;
    var car_plate = req.body.car_plate;
     var balance = req.body.balance;
     var car_id = req.body.car_id;
     var operator_id = req.body.operator_id;
     var sql = `INSERT INTO driver(status,first_name, last_name,certificate_number, mobile_number,  rating, car_plate,balance,car_id,operator_id)  VALUES ("${status}","${first_name}", "${last_name}",${certificate_number}, ${mobile_number}, ${rating}, "${car_plate}",${balance}, ${car_id},${operator_id});`;
     console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});
 
//Update an driver
router.put('/:id', (req, res) => {
    let dri = req.body;
    console.log("dri = " + dri);
    console.log(req.params.id);
    let sql = `UPDATE driver SET status="${dri.status}", first_name="${dri.first_name}", last_name="${dri.last_name}", certificate_number="${dri.certificate_number}", mobile_number=${dri.mobile_number}, rating=${dri.rating}, car_plate="${dri.car_plate}", balance=${dri.balance},  car_id="${dri.car_id}", operator_id="${dri.operator_id}" WHERE id = ${req.params.id};`;
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