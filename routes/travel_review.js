const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  travel_review
router.get('/', (req, res) => {
    db.query('SELECT * FROM travel_review LEFT JOIN driver ON driver.id = travel_review.driver_id LEFT JOIN travel ON travel.id = travel_review.travel_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an travel_review
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM travel_review WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an travel_review
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM travel_review WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an travel_review
router.post('/', function (req, res, next) {
    
    var score = req.body.score;
    var review = req.body.review;
    var review_timestamp = req.body.review_timestamp;
    var sql = `INSERT INTO travel_review(score,review,review_timestamp) VALUES(${score},${review},${review_timestamp});`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an travel_review
router.put('/:id', (req, res) => {
    let rewi = req.body;
    console.log("rewi = " + rewi);
    console.log(req.params.id);
    let sql = `UPDATE travel_review SET score=${rewi.score},review=${rewi.review},review_timestamp=${rewi.review_timestamp} WHERE id = ${req.params.id};`;

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