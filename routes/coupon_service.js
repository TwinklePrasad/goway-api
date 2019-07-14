const express = require('express');
var router = express.Router();
var db = require('../db');
var router = express.Router();
//Get all  coupon_service
router.get('/', (req, res) => {
    db.query('SELECT * FROM coupon_service LEFT JOIN coupon ON coupon.id = coupon_service.coupon_id LEFT JOIN service ON service.id = coupon_service.service_id', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an coupon_service
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM coupon_service WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an coupon_service
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM coupon_service WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

 

 

module.exports = router;