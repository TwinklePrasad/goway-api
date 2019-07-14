

var jwt=require('jsonwebtoken');
var mysqlConnection = require('../db');
module.exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    mysqlConnection.query('SELECT * FROM operator WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                var token=jwt.sign(results[0],process.env.SECRET_KEY,{
                    expiresIn:5000
                });
                res.json({
                    status:true,
                    token:token
                })
            }else{
                res.status(401).send('Invalid Email')
                // res.json({
                //   status:false,                  
                //   message:"Email and password does not match"
                //  });
            }
         
        }
        else{
            res.status(401).send('Invalid Email')
        //   res.json({
        //       status:false,
        //     message:"Email does not exits"
        //   });
        }
      }
    });
}