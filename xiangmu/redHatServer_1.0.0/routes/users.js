/*模块导入*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../entity/model');
var async = require('async');

var m = new model();

/*注册（激活）*/
router.post('/register',function (req,res) {
  var jsonObject = req.body;
  async.waterfall([//异步流程控制
      function (callback) {
        m.userModel.findOne({userPhone:jsonObject.userPhone},function (err,doc) {//查看数据库中该用户是否已经注册（激活）
          if(err) {
              callback(err);
          }else if(doc == null){
              callback(new Error('No this user'));//没有该用户
          }else if(doc.userState != 0){
              callback(new Error('User has activated'));//该用户已经注册
          }else {
              callback(null,doc);
          }
        });
      },
      function (date,callback) {
          if(jsonObject.userMajor !='admin') {//判断用户种类，并按不同的种类赋予角色
              m.roleModel.findOne({power_user: 'repair'},function(err,doc){
                  callback(err,doc,date);
              });
          }else {
              m.roleModel.findOne({power_user: 'admin'},function(err,doc){
                  callback(err,doc,date);
              });
          }
      },
      function (date1,date2,callback) {//更改用户信息
          m.userModel.update({_id:{_id:date2._id}},{
              userPassword:jsonObject.userPassword,
              userState:1,//将用户状态改为已经注册状态
              role:{_id:date1._id}
          },function (err,doc) {
              console.log({_id:{_id:date2._id}},{_id:date1._id});
              callback(err,doc);
          })
      }
  ],function (err,result) {
      if(err){//向客户端发回服务器处理后的信息
          console.error(err);
          res.json({
              type:"register",
              state:"register_NO"
          });
      }else{
          console.log("用户 "+jsonObject.userPhone+"注册成功！");
          res.json({
              type:"register",
              state:"register_OK"
          });
      }
      res.end();
  });
});

/*登录*/
router.post('/login',function (req,res) {
    var jsonObject = req.body;
    async.waterfall([
        function (callback) {//从数据库中查找要登录的用户的信息
            m.userModel.findOne({'userPassword':jsonObject.password,'userPhone':jsonObject.account},function (err,doc) {
                if(err){
                    callback(err);
                }else if(doc == null) {
                    callback(new Error('No this user'));//未查到
                }else {
                    if(jsonObject.type == 2&&doc.userModel == 'user'){//用户类型为user无法登录到维修类客户端
                        callback(new Error('Type is error'));
                    }else {
                        callback(null,doc);
                    }

                }
            })
        },
        function (date,callback) {//将用户信息打包到json对象中
                var userInfo = {
                    userName:date.userName,
                    userMajor:date.userMajor
                };
                if(date.userAddress!=null||date.userAddress!=undefined){
                    userInfo.userAddress = date.userAddress;
                }
                var sendObject = {
                    type:"login",
                    state:"login_OK",
                    userInfo:userInfo
                };
                m.roleModel.findOne({_id:{$in:date.role}},function (err,doc) {
                    if(err){
                        callback(err);
                    }else {
                        sendObject.role = doc;
                        callback(null,sendObject);
                    }
                })
        }
    ],function (err,result) {
        if(err){
            res.json({
                type:"login",
                state:"login_NO"
            });
        }else {
            res.json(result);
            console.log("用户 "+jsonObject.account+"登录成功！")
        }
        res.end();
    })
});


router.post('/userDao',function (req,res) {//对用户的管理
    var jsonObject = req.body;
    var send = function (err,doc) {//服务器发回信息的方法
        if(err){
            res.json({
                type:'userDao',
                state:'userDao_NO'
            });
        }else{
            res.json({
                type:'userDao',
                state:'userDao_OK',
                info:doc
            });
        }
        res.end();
    };
    switch (jsonObject.type) {
        case 'insert':
            async.waterfall([
                function (callback) {//增加一个用户（未启用）
                    m.roleModel.findOne(jsonObject.info.role,callback(err,doc))
                },
                function (data,callback) {
                    jsonObject.info.role = {id:data._id};
                    m.userModel.create(jsonObject.info,callback(err,doc))
                }
            ],function (err,doc) {
                send(err,doc);
            });
            break;
        case 'delete'://删除一个用户
            m.userModel.remove({_id:{_id:jsonObject.info}},function (err,doc) {
                send(err,doc);
            });
            break;
        case 'update':
            async.waterfall([//更改一个用户的信息
                function (callback) {
                    if(jsonObject.user.userMajor){
                        if(jsonObject.user.userMajor != "admin") {
                            m.roleModel.findOne({power_user: 'repair'},function (err,doc) {
                                callback(err,doc);
                            });
                        }else {
                            m.roleModel.findOne({power_user: 'admin'}, function (err,doc) {
                                callback(err,doc);
                            });
                        }
                    }else {
                        callback(null,null);
                    }
                } ,
                function (date,callback) {
                    if(date != null||date[0] != null){
                        jsonObject.user.role=date._id;
                    }
                    var _id = {_id:{_id:jsonObject.user._id}};
                    delete jsonObject.user["_id"];//删除客户端发来的用户ID
                    m.userModel.update(_id,jsonObject.user,function (err,doc) {
                        callback(err,doc);
                    });
                }
            ],function (err,doc) {
                send(err,doc);
            });
            break;
        case 'findAll'://查看所有的用户
            m.userModel.find({},function (err,doc) {
                send(err,doc);
            });
            break;
        }

    });

module.exports = router;
