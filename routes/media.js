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
 

//-----uplode image ---------------
// router.get('/', (req, res) => {
//     res.render('index.html');
// });



// Get all  media
router.get('/', (req, res) => {
    db.query('SELECT * FROM media', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// Get an media
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM media WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an media
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM media WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});
 



router.post('/', upload.single('myFile'), (req, res, next) => {
    var address = req.file.filename;
    var title = req.body.title;
     var type = req.body.type;
    var sql = `INSERT INTO media(address, title, type) VALUES ("${address}", "${title}", "${type}");`;

        console.log(sql);
        
        db.query(sql, function (err, rt) {
            console.log(rt);
    
   if (err) {
       res.status(500).send({ error: 'Something failed!' })
   }
   res.json({
       success: true,
       message: 'Image uploaded!'
   })

   // Everything went fine
})
});




// router.post('/upload',upload.any(), function (req, res) {
//    // upload(req, res, function (err) {
//        console.log(req.files);
//        // console.log(req);
       
//          var address = req.files;
//          var title = req.body.tittle;
//          var type = req.body.type;
//          var sql = `INSERT INTO media(address, title, type) VALUES ("${address}","${title}" ,"${type}");`;

//              console.log(sql);
             
//              db.query(sql, function (err, rt) {
//                  console.log(rt);
         
//         if (err) {
//             res.status(500).send({ error: 'Something failed!' })
//         }
//         res.json({
//             success: true,
//             message: 'Image uploaded!'
//         })

//         // Everything went fine
//     })
// })



 
//Update an media
router.put('/:id',upload.single('myFile'), (req, res) => {
    let trans = req.body;
    console.log("trans = " + trans);
    console.log(req.params.id);
    let sql = `UPDATE media SET title="${trans.title}",address="${trans.file.filename}",type="${trans.type}" WHERE id = ${req.params.id};`;
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