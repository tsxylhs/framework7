/*引入模块*/
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var mongoose = require('mongoose');
var db = require('../database/Conntion');
var async = require('async');
var model = require('../entity/model');
var m = new model();


/*用户报修*/
router.post('/CReport',function (res,req) {
    var jsonObject = res.body;
    var path;
    var i = 0;
    var form = new multiparty.Form({uploadDir: __dirname+'/../public/images/'});
    //上传完成后处理
    try {
        form.parse(req, function (err, fields, files) {
            var filesTmp = JSON.stringify(files, null, 2);
            if (err) {
                console.log('parse error: ' + err);
            } else {
                console.log('parse files: ' + 'OK');
                files.files.forEach(function (aFile) {
                    var inputFile = aFile;
                    var uploadedPath = inputFile.path;
                    var dstPath = __dirname + '/../public/images/' + inputFile.originalFilename;
                    //重命名为真实文件名
                    fs.rename(uploadedPath, dstPath, function (err) {
                        if (err) {
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }
                    });
                });
            }
        });
    }catch (err){
        console.log("无图片上传"+err);
    }
    //将注册的信息插入到数据库中
    m.repairModel.create({bdno:jsonObject.bdno,rptp:jsonObject.rptp,rmno:jsonObject.rmno,rpinfo:jsonObject.rpinfo,date:(new Date()),uPhone:jsonObject.account,state:0,path:path},function (err,doc) {
        if(err){
            req.json({
                type:'CReport',
                state:'CReport_NO'
            });
        }else{
            req.json({
                type:'CReport',
                state:'CReport_OK'
            });
        }
        req.end();
        console.log("用户"+jsonObject.account+"报修,类型为："+jsonObject.rptp);
    })
});

/*查看有关某个用户的报修情况*/
router.post('/records',function (req,res) {
    var jsonObject = req.body;
    console.log(jsonObject);
    m.repairModel.find({uPhone:jsonObject.account},null,{sort:{date:-1}},function (err,doc) {//查找以param为条件的记录，并排序
        if (err){
            res.json({
                type:'records',
                state:'records_NO'
            });
        }else{
            var list = [];
            for (var i = 0; i < doc.length; i++) {//整理发送的信息
                list[i] = {time: doc[i].date, type: doc[i].rptp, state: doc[i].state, id: doc[i]._id}
            }
             res.json({
                type:'records',
                state:'records_OK',
                list:list
             })
        }
        res.end();
    })
});
router.post('/WRecords',function (req,res) {
   m.repairModel.find({'$or':[{rPhone:req.body.account},{state:0}]},null,{sort:{date:-1}},function (err,doc) {//查找以param为条件的记录，并排序
        if (err) {
            res.json({
                type: 'WRecords',
                state: 'WRecords_NO'
            });
        }else {
            var list ={};
            list.unrepaired = [];
            list.repairing = [];
            list.repaired = [] ;
            var s = 0,t = 0,u = 0,i;
            for(i=0;i<doc.length;i++){//打包发回客户端的信息
                var time = doc[i].date.toLocaleString();
                var obj = {time: time, type: doc[i].rptp, state: doc[i].state,RP:doc[i].uPhone, id: doc[i]._id,rpinfo:doc[i].rpinfo};
                if(doc[i].state == 0){
                    list.unrepaired[s++]  = obj;
                }else if(doc[i].state == 1){
                    list.repairing[t++] = obj;
                }else{
                    list.repaired[u++] = obj;
                }
            }
            res.json({
                type:'WRecords',
                state:'WRecords_OK',
                list:list
            });
        }
        res.end();
    })
});


/*维修人员任务接收确认和任务完成确认*/
router.post('/confirm',function (req,res) {
    var conditions = {_id:{_id:req.body.id}};//任务id
    var update = {rPhone:req.body.phoneNumber,state:req.body.state};//报修人电话和任务状态
    async.waterfall([//异步流程控制
        function (callback) {
            m.repairModel.findOne(conditions,function (err,doc) {//查看是否已经有人接收指定的任务
                if(err){
                    callback(err);
                }else if(doc.rPhone=='0000'&&doc.state==1){//rPhone为默认的‘0000’状态为1表明无人接单
                    callback(new Error('Confirmed'));
                }else {
                    callback(null,doc);
                }
            });
    },
        function(date,callback){
            m.repairModel.update(conditions,update,function (err,doc) {//修改任务状况
                if(err){
                    callback(err);
                }else{
                     callback(null);
                }
            });
    }
    ],function (err) {
        if(err){
            res.json({
                type:'confirm',
                state:'confirm_NO'
            });
        }else {
            res.json({
                type:'confirm',
                state:'confirm_OK'
            });
        }
        res.end();
    });
});

module.exports = router;