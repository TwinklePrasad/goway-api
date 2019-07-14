var express = require('express');
var router = express.Router();
var db = require('../db');
//Get all user
router.get('/', (req, res) => {
  db.query('SELECT * FROM operator',(err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

//Get an user
router.get('/:id', (req, res) => {
db.query('SELECT * FROM operator WHERE id = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
      res.send(rows);
  else
      console.log(err);
})
});

//Delete an user
router.delete('/:id', (req, res) => {
db.query('DELETE FROM operator WHERE id = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
      res.send('Deleted successfully.');
  else
      console.log(err);
})
});

//Insert an user
router.post('/', function(req, res, next) {
var id = '';
var first_name= req.body.first_name;
var  last_name = req.body.last_name;
var  mobile_number = req.body.mobile_number;
var  phone_number = req.body.phone_number;
var  user_name = req.body.user_name;
var address = req.body.address;

console.log(id + ", " + first_name + ", " + last_name + ", " + mobile_number + ", " + phone_number + ", " + user_name + ", " + address);

var sql = `INSERT INTO operator(first_name, last_name, mobile_number,  phone_number, user_name, address) VALUES ("${first_name}", "${last_name}", "${mobile_number}","${phone_number}", "${user_name}", "${address}");`;
console.log(sql);
db.query(sql, function(err, rt) {
  console.log(rt);
if(err) {
  res.status(500).send({ error: 'Something failed!' })
}
res.json({'status': 'success', "result": rt})
})
});

//Update an user
router.put('/:id', (req, res) => {
let emp = req.body;
console.log("emp = "+emp);
console.log(req.params.id);
let sql = `UPDATE operator SET first_name="${emp.first_name}", last_name="${emp.last_name}",mobile_number="${emp.mobile_number}", phone_number="${emp.phone_number}", user_name="${emp.user_name}", address="${emp.address} "WHERE id = ${req.params.id};`;
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
