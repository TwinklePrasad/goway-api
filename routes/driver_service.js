const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  driver_service
router.get('/', (req, res) => {
    db.query('SELECT * FROM driver_service LEFT JOIN driver ON driver.id = driver_service.driver_id LEFT JOIN service ON service.id = driver_service.service_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an driver_service
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM driver_service WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an driver_service
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM driver_service WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an driver_service
// router.post('/', function (req, res, next) {
    
//     var score = req.body.score;
//     var review = req.body.review;
//     var review_timestamp = req.body.review_timestamp;
//     var sql = `INSERT INTO driver_service(score,review,review_timestamp) VALUES(${score},${review},${review_timestamp});`;

//     console.log(sql);
//     db.query(sql, function (err, rt) {
//         console.log(rt);
//         if (err) {
//             res.status(500).send({ error: 'Something failed!' })
//         }
//         res.json({ 'status': 'success', "result": rt })
//     })
// });

//Update an driver_service
// router.put('/:id', (req, res) => {
//     let rewi = req.body;
//     console.log("rewi = " + rewi);
//     console.log(req.params.id);
//     let sql = `UPDATE driver_service SET score=${rewi.score},review=${review},review_timestamp=${review_timestamp} WHERE id = ${req.params.id};`;

//     console.log("sql = " + sql);
//     db.query(sql, function (err, rt) {
//         console.log(rt);
//         if (err) {
//             res.status(500).send({ error: 'Something failed!' })
//         }
//         res.json({ 'status': 'success', "result": rt })
//     })

// });

module.exports = router;