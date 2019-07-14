const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  operator_reminder
router.get('/', (req, res) => {
    db.query('SELECT * FROM operator_reminder LEFT JOIN operator ON operator.id = operator_reminder.operator_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an operator_reminder
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM operator_reminder WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an operator_reminder
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM operator_reminder WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an operator_reminder
router.post('/', function (req, res, next) {
    var title = req.body.title;
    var due = req.body.due;
    var importance = req.body.importance;
     
    var sql = `INSERT INTO operator_reminder(title, due,importance) VALUES("${title}", ${due},${importance});`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an operator_reminder
router.put('/:id', (req, res) => {
    let trans = req.body;
    console.log("trans = " + trans);
    console.log(req.params.id);
    let sql = `UPDATE operator_reminder SET title="${trans.title}",due=${trans.due},importance=${trans.importance} WHERE id = ${req.params.id};`;
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