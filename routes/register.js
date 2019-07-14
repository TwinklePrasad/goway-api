var mysqlConnection = require('../db');
const jwt = require('jsonwebtoken')
var express = require('express');
var router=express.Router();
const bodyparser = require('body-parser');
var app = express();
app.use(express.json());
module.exports.register=function(req,res){
    var today = new Date();
    var operator={
        "user_name":req.body.user_name,
        "email":req.body.email,
        "password":req.body.password,
        // "created_at":today,
        // "updated_at":today
        // "mobile_number":req.body.mobile_number
    }

    mysqlConnection.query('INSERT INTO operator SET ?',operator, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
        // let payload = {subject: operator.id}
        // let token = jwt.sign(payload, 'secretKey')
        // res.status(200).send({token})
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}






process.env.SECRET_KEY="thisismysecretkey";
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
 
app.use('/',router);
// validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})
router.get('/',function(req,res){
    res.send('Token Verified')
})

