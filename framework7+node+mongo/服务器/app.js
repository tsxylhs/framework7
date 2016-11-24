//app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/mission';
var _db;


app.use(bodyParser.urlencoded({    
  extended: true
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));

MongoClient.connect(mongoUrl, function (err, db) {
  if(err) {
    console.error(err);
    return;
  }

  console.log('connected to mongo');
  _db = db;
  app.listen(8888, function () {
    console.log('server is running...');
  });
});

app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('content-Type',"application/json;charset=utf-8")
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    
  }
  next();
});





//app.js
var ObjectID = require('mongodb').ObjectID
//shuxin 
app.get('/event/TravelList',function(req,res,next){
        var email=req.query.email;
    
    var collection=_db.collection('my_Travel');
    collection.find({email:email+''}).toArray(function (err, data) {
    if(err) {
      console.error(err);
      return;
    }

    res.json(data);
   
  });
});
//日
app.get('/event/dalidyList',function(req,res,next){
        var email=req.query.email;
   
    var collection=_db.collection('my_dalidy');
    collection.find({email:email+''}).toArray(function (err, data) {
    if(err) {
      console.error(err);
      return;
    }

    res.json(data);
   
  });
});
//tianjia xingcheng
app.get('/event/planList',function(req,res,next){
        var email=req.query.email;

    var collection=_db.collection('my_Event');
    collection.find({email:email+''}).toArray(function (err, data) {
    if(err) {
      console.error(err);
      return;
    }
;
    res.json(data);
   
  });
});

app.post('/event/addTravel',function(req,res,next){
  var token=req.body.token;
  var email=req.body.email;
  var title=req.body.title;
  var time=req.body.time;
  var address=req.body.address;
 
  var text=req.body.text;
  var data1={
    token :token,
    email :email,
    title : title,
    time : time,
    address:address,

    text:text

  }
 
    var collection=_db.collection('my_Travel');
    collection.insert(data1,function (err, ret) {
    if(err) {
      console.error(err);
      return;
    }
    res.status(200);
    res.send({errcode:0,errmsg:"ok"});
  });
});

app.post('/event/createNewEvent',function(req,res,next){
  var token=req.body.token;
  var email=req.body.email;
  var title=req.body.title;
  var time=req.body.time;
  var text=req.body.text;
  var data={
    token :token,
    email :email,
    title : title,
    time : time,
    text:text

  }
 
    var collection=_db.collection('my_Event');
    collection.insert(data,function (err, ret) {
    if(err) {
      console.error(err);
      return;
    }
    res.status(200);
    res.send({errcode:0,errmsg:"ok"});
  });
});
//创键日记
app.post('/event/addNewdalidy',function(req,res,next){
  var token=req.body.token;
  var email=req.body.email;
  var title=req.body.title;
  var time=req.body.date;
  var text=req.body.text;
  var data={
    token :token,
    email :email,
    title : title,
    time : time,
    text:text

  }
 
    var collection=_db.collection('my_dalidy');
    collection.insert(data,function (err, ret) {
    if(err) {
      console.error(err);
      return;
    }
    
   res.send({errcode:0,errmsg:"ok"});
  });
});
//chaxun
app.post('/login',function(req,res,next){
  var email=req.body.email;
  var password=req.body.password;
  console.info(email);
    var collection=_db.collection('my_mission');
    collection.find({email:email,password:password}).toArray(function (err, ops) {
    if(err) {
    console.error(err);
      res.status(500).send({errcode:0,errmsg:"err"});

    }
     else{
      console.info(ops);
 
     res.json({token:ops[0]._id,errmsg:"ok"});
     /*  res.status(200).send({resut:ret,errmsg:"ok"});*/
     
     
    }
  });
});

app.post('/event/setP', function (req, res, next) {
  var token = req.body.eventId;
  var collection = _db.collection('my_Event');

  //使用mongodb的唯一ObjectId字段查找出对应id删除记录
  collection.remove({_id: new ObjectID(token)} ,function (err, result) {
    if(err) {
      console.error(err);
      res.status(500).send();
    } else {

      res.status(200);
      res.send({errcode:0,errmsg:"ok"});
    }
  });
});

//删除计划
app.post('/event/setTravely', function (req, res, next) {
  var token = req.body.eventId;
  var collection = _db.collection('my_Travel');

  //使用mongodb的唯一ObjectId字段查找出对应id删除记录
  collection.remove({_id: new ObjectID(token)} ,function (err, result) {
    if(err) {
      console.error(err);
      res.status(500).send();
    } else {

      res.status(200);
      res.send({errcode:0,errmsg:"ok"});
    }
  });
});
app.post('/event/setDondalidy', function (req, res, next) {
  var token = req.body.eventId;
  var collection = _db.collection('my_dalidy');

  //使用mongodb的唯一ObjectId字段查找出对应id删除记录
  collection.remove({_id: new ObjectID(token)} ,function (err, result) {
    if(err) {
      console.error(err);
      res.status(500).send();
    } else {
  
      res.status(200);
      res.send({errcode:0,errmsg:"ok"});
    }
  });
});

//使用post方法
app.post('/create', function(req, res, next) {
    //接收前端发送的字段
var email=req.body.email;
var username=req.body.username;
var password=req.body.password;
console.log(email);

  //选择一个表my_mission 此时没有没关系，也会自动创建
  var collection = _db.collection('my_mission');

    //插入数据库，返回OK
  collection.insert({email:email,name:username, password:password}, function (err, ops) {
    if(err) {
      console.error(err);
      res.status(500).end();
    } else {

       res.send({token:ops[0]._id,errmsg:"ok"});
         res.json(ops);
    }
  });
});
