const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  complaint_type
router.get('/', (req, res) => {
    db.query('SELECT * FROM complaint_type', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an complaint_type
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM complaint_type WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an complaint_type
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM complaint_type WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an complaint_type
router.post('/', function (req, res, next) {
    
    var title = req.body.title;
    var importance = req.body.importance;
    var sender_type = req.body.sender_type;
    // var sender_type = req.body.sender_type;
    var sql = `INSERT INTO complaint_type(title, importance,sender_type) VALUES("${title}", "${importance}", "${sender_type}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an complaint_type
router.put('/:id', (req, res) => {
    let coup = req.body;
    console.log("coup = " + coup);
    console.log(req.params.id);
    let sql = `UPDATE complaint_type SET title="${coup.title}", importance="${coup.importance}", sender_type="${coup.sender_type}"  WHERE id = ${req.params.id};`;

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