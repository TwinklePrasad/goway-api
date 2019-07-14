const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  operator_todo
router.get('/', (req, res) => {
    db.query('SELECT * FROM operator_todo LEFT JOIN operator ON operator.id = operator_todo.operator_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an operator_todo
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM operator_todo WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an operator_todo
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM operator_todo WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an operator_todo
router.post('/', function (req, res, next) {
    var title = req.body.title;
    var is_done = req.body.is_done;
    
    var sql = `INSERT INTO operator_todo(title, is_done) VALUES("${title}", ${is_done});`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an operator_todo
router.put('/:id', (req, res) => {
    let trans = req.body;
    console.log("trans = " + trans);
    console.log(req.params.id);
    let sql = `UPDATE operator_todo SET title="${trans.title}",is_done=${trans.is_done} WHERE id = ${req.params.id};`;
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