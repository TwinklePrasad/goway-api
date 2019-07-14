const express = require('express');
var router = express.Router();
var db = require('../db');
 
//Get all  travel
router.get('/', (req, res) => {
    db.query('SELECT * from travel',(err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an travel
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM travel WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an travel
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM travel WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an travel
router.post('/', function(req, res, next) {
    var id = '';
    var status= req.body.status;
    var  pickup_address = req.body.pickup_address;
    var  destination_address = req.body.destination_address;
    var  rating = req.body.rating;
    var  request_time = req.body.request_time;
     
    
    // console.log(id + ", " + first_name + ", " + last_name + ", " + mobile_number + ", " + phone_number + ", " + user_name + ", " + address);
    
    var sql = `INSERT INTO travel(status, pickup_address, destination_address,  rating, request_time) VALUES (${status}, "${pickup_address}", "${destination_address}",${rating}, ${request_time});`;
    console.log(sql);
    db.query(sql, function(err, rt) {
      console.log(rt);
    if(err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({'status': 'success', "result": rt})
    })
    });

//Update an travel
router.put('/:id', (req, res) => {
    let tra = req.body;
    console.log("tra = " + tra);
    console.log(req.params.id);
    let sql = `UPDATE travel SET status="${tra.status}", pickup_address="${tra.pickup_address}",destination_address="${tra.destination_address}", rating=${tra.rating},request_time="${tra.request_time}" WHERE id = ${req.params.id};`;

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