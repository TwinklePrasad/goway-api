const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
 
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
const upload = multer({ storage: storage });
 
//Get all  car
router.get('/', (req, res) => {
    db.query('SELECT * FROM car', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an car
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM car WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an car
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM CAR WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an car
router.post('/',upload.single('myFile'),  function (req, res, next) {
    
    var title = req.body.title;
    var address = req.file.filename;
    var sql = `INSERT INTO car(title,address ) VALUES("${title}","${address}");`;

    console.log(sql);
    db.query(sql, function (err, rt) {
        console.log(rt);
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ 'status': 'success', "result": rt })
    })
});

//Update an car
router.put('/:id', (req, res) => {
    let coup = req.body;
    console.log("coup = " + coup);
    console.log(req.params.id);
    let sql = `UPDATE car SET title="${coup.title}", address="${coup.address}" WHERE id = ${req.params.id};`;

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