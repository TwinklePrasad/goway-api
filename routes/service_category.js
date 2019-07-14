const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  service_category
router.get('/', (req, res) => {
    db.query('SELECT * FROM service_category', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an service_category
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM service_category WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an service_category
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM service_category WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an service_category
router.post('/', function (req, res, next) {
    
    var title = req.body.title;
   
    var sql = `INSERT INTO service_category(title) VALUES("${title}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an service_category
router.put('/:id', (req, res) => {
    let catego = req.body;
    console.log("catego = " + catego);
    console.log(req.params.id);
    let sql = `UPDATE service_category SET title="${catego.title}";`;

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