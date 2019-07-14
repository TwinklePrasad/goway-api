var express = require('express');
var router = express.Router();
var db = require('../db');
//Get all promotion
router.get('/', (req, res) => {
  db.query('SELECT * FROM promotion',(err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

//Get an promotion
router.get('/:id', (req, res) => {
db.query('SELECT * FROM promotion WHERE id = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
      res.send(rows);
  else
      console.log(err);
})
});

//Delete an promotion
router.delete('/:id', (req, res) => {
db.query('DELETE FROM promotion WHERE id = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
      res.send('Deleted successfully.');
  else
      console.log(err);
})
});

//Insert an promotion
router.post('/', function(req, res, next) {
 
var title= req.body.title;
var  start_timestamp = req.body.start_timestamp;
var  expiration_timestamp = req.body.expiration_timestamp;
 
var sql = `INSERT INTO promotion(title, start_timestamp, expiration_timestamp) VALUES ("${title}", ${start_timestamp}, ${expiration_timestamp});`;
console.log(sql);
db.query(sql, function(err, rt) {
  console.log(rt);
if(err) {
  res.status(500).send({ error: 'Something failed!' })
}
res.json({'status': 'success', "result": rt})
})
});

//Update an promotion
router.put('/:id', (req, res) => {
let pro = req.body;
console.log("pro = "+pro);
console.log(req.params.id);
let sql = `UPDATE promotion SET title="${pro.title}", start_timestamp=${pro.start_timestamp},expiration_timestamp=${pro.expiration_timestamp} WHERE id = ${req.params.id};`;
console.log("sql = "+sql);    
db.query(sql, function(err, rt) {
  console.log(rt);
if(err) {
  res.status(500).send({ error: 'Something failed!' })
}
res.json({'status': 'success', "result": rt})
})

});

module.exports = router;
