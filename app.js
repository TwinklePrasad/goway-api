var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt= require("jsonwebtoken");
 var router=express.Router();
const cors=require('cors');
const bodyparser = require('body-parser');


var user_settingRouter = require('./routes/user_setting');
var travelRouter = require('./routes/travel');
var driverRouter = require('./routes/driver');
var riderRouter = require('./routes/rider');
var promotionRouter = require('./routes/promotion');
var couponRouter = require('./routes/coupon');
var complaintTypeRouter = require('./routes/complaint-type');
var carRouter = require('./routes/car');
var driver_transactionRouter = require('./routes/driver_transaction');
var payment_requestRouter = require('./routes/payment_request');
var driver_serviceRouter = require('./routes/driver_service');
var travel_reviewRouter = require('./routes/travel_review');
var complaintRouter = require('./routes/complaint');
var serviceRouter = require('./routes/service');
var service_categoryRouter = require('./routes/service_category');
var coupon_serviceRouter = require('./routes/coupon_service');
var rider_couponRouter = require('./routes/rider_coupon');
var mediaRouter = require('./routes/media');
var rider_addressRouter = require('./routes/rider_address');
var rider_transactionRouter = require('./routes/rider_transaction');
var operator_todoRouter = require('./routes/operator_todo');
var operator_reminderRouter = require('./routes/operator_reminder');

var  registerRouter = require('./routes/register');
var  loginRouter = require('./routes/login');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/media',express.static('uploads'));
app.use('/car',express.static('uploads'));

app.use('/travel', travelRouter);
app.use('/user', user_settingRouter);
app.use('/driver', driverRouter);
app.use('/rider', riderRouter);
app.use('/promotion', promotionRouter);
app.use('/coupon', couponRouter);
app.use('/complaint-type', complaintTypeRouter);
app.use('/car', carRouter);
app.use('/driver_transaction', driver_transactionRouter);
app.use('/payment_request', payment_requestRouter);
app.use('/driver_service', driver_serviceRouter);
app.use('/travel_review', travel_reviewRouter);
app.use('/complaint', complaintRouter);
app.use('/service', serviceRouter);
app.use('/service_category', service_categoryRouter);
app.use('/coupon_service', coupon_serviceRouter);
app.use('/rider_coupon', rider_couponRouter);
app.use('/media', mediaRouter);
app.use('/rider_address',rider_addressRouter);
app.use('/rider_transaction', rider_transactionRouter);
app.use('/operator_todo', operator_todoRouter);
app.use('/operator_reminder', operator_reminderRouter);


// app.use(bodyparser.urlencoded({extended:true}));
// app.use(bodyparser.json());
 
app.post('/register',registerRouter.register);
app.post('/login',loginRouter.login);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

 

 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

module.exports = app;
 