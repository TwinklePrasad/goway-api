const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  complaint
router.get('/', (req, res) => {
    db.query('SELECT c.id,sender_type,subject,content ,inscription_timestamp, title FROM complaint as c LEFT JOIN complaint_type as ct ON ct.id = c.complaint_type_id ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an complaint
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM complaint WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an complaint
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM complaint WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an complaint
// router.post('/', function (req, res, next) {
    
//     var requested_by = req.body.requested_by;
//     var subject = req.body.subject;
//     var content = req.body.content;
//     var is_reviewed = req.body.is_reviewed;
//     var inscription_timestamp = req.body.inscription_timestamp;
//     var review_timestamp = req.body.review_timestamp;
    
//     var sql = `INSERT INTO complaint(requested_by, subject,content,is_reviewed,inscription_timestamp,review_timestamp) VALUES(${requested_by}, "${subject}","${content}",${is_reviewed},${inscription_timestamp},${review_timestamp});`;

//     console.log(sql);
//     db.query(sql, function (err, rt) {
//         console.log(rt);
//         if (err) {
//             res.status(500).send({ error: 'Something failed!' })
//         }
//         res.json({ 'status': 'success', "result": rt })
//     })
// });

//Update an complaint
// router.put('/:id', (req, res) => {
//     let compla = req.body;
//     console.log("compla = " + compla);
//     console.log(req.params.id);
//     let sql = `UPDATE complaint SET requested_by="${compla.requested_by}", subject="${compla.subject}",content="${compla.content}", is_reviewed=${compla.is_reviewed},inscription_timestamp=${compla.inscription_timestamp},review_timestamp=${compla.review_timestamp} WHERE id = ${req.params.id};`;

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