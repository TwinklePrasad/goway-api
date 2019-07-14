const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  service
router.get('/', (req, res) => {
    db.query('SELECT * FROM service LEFT JOIN service_category ON service_category.id = service.service_category_id LEFT JOIN media ON media.id = service.media_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an service
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM service WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an service
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM service WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an service
router.post('/', function (req, res, next) {
    
    var title = req.body.title;
    var base_fare = req.body.base_fare;
    var per_hundred_meters= req.body.per_hundred_meters;
    var per_minute_wait = req.body.per_minute_wait;
    var per_minute_passed = req.body.per_minute_passed;
    var available_time_from = req.body.available_time_from;
    var available_time_to = req.body.available_time_to;
    var sql = `INSERT INTO service(title, base_fare,per_hundred_meters,per_minute_wait,per_minute_passed,available_time_from,available_time_to) VALUES("${title}", ${base_fare},${per_hundred_meters},${per_minute_wait},${per_minute_passed},"${available_time_from}","${available_time_to}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an service
router.put('/:id', (req, res) => {
    let servi = req.body;
    console.log("servi = " + servi);
    console.log(req.params.id);
    let sql = `UPDATE service SET title="${servi.title}", base_fare=${servi.base_fare},per_hundred_meters=${servi.per_hundred_meters}, per_minute_wait=${servi.per_minute_wait},per_minute_passed=${servi.per_minute_passed},available_time_from="${servi.available_time_from}",available_time_to="${servi.available_time_to}" WHERE id = ${req.params.id};`;

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