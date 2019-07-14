const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all   rider_address
router.get('/', (req, res) => {
    db.query('SELECT * FROM  rider_address LEFT JOIN rider ON rider.id = rider_address.rider_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an  rider_address
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM  rider_address WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an  rider_address
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM  rider_address WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an  rider_address
router.post('/', function (req, res, next) {
    var title = req.body.title;
    var address = req.body.address;
    var location = req.body.location;
    
    var sql = `INSERT INTO  rider_address(title, address,location) VALUES("${title}","${address}",${location});`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an  rider_address
router.put('/:id', (req, res) => {
    let rid_add = req.body;
    console.log("rid_add = " + rid_add);
    console.log(req.params.id);
    let sql = `UPDATE  rider_address SET title="${rid_add.title}",address="${rid_add.address}",location=${rid_add.location} WHERE id = ${req.params.id};`;
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