/**
 * 数据库初始化模块
 * 当数据库
 */
var model = require('../entity/model');
var async = require('async');
var process = require('process');
var init = function () {
    var m = new model();
    console.log("数据库初始化开始");
    async.series({
        selectAdmin: function (callback) {
            m.roleModel.findOne({power_user: 'admin'}, function (err, doc) {
                if (err) {
                    callback(err);
                } else if (doc !=null) {
                    callback('管理员角色已经建立')
                } else {
                    callback(null, doc);
                }
            })
        },
        insertAdmin: function (callback) {
            m.roleModel.create(
                {
                    power_user: 'admin',
                    power: {
                        one: {
                            '管理列表': [
                                {name: '用户中心', url: '#/repair/user-manager'},
                                {name: '权限管理', url: '#/repair/power-manager'},
                                {name: '用户管理', url: '#/repair/do-user-manager'},
                                {name: '报修管理', url: '#/repair/repair-manager'},
                                {name: '反馈中心', url: '#/repair/info-center'},
                                {name: '数据分析', url: '#/repair/data-ansis'}
                            ]
                        },
                        two:{
                            '功能列表': [
                                {name: '开始报修', url: '#/repair/dorepair'},
                                {name: '正在报修', url: '#/repair/repairing'},
                                {name: '历史报修', url: '#/repair/repair-record'}
                            ]
                        }
                    }
                }, function (err, doc) {
                    if (err) {
                        console.error('管理员角色初始化失败 ');
                        callback(err);
                    } else {
                        console.log(doc);
                        callback(null);
                    }
                }
            )
        }
    },function(err,result){
        if(err){
            console.error(err);
        }
    });
    async.series({
        selectPower: function (callback) {
            m.roleModel.findOne({power_user: 'repair'}, function (err, doc) {
                if (err) {
                    callback(err);
                } else if(doc !=null){
                    callback('维修者角色已经建立');
                }else{
                    callback(null, doc);
                }
            })
        },
        insertPower: function(callback) {
            m.roleModel.create(
                {
                    power_user: 'repair',
                    power:{
                        one: {
                            '功能列表': [
                                {name: '开始报修', url: '#/repair/dorepair'},
                                {name: '正在报修', url: '#/repair/repairing'},
                                {name: '历史报修', url: '#/repair/repair-record'}
                            ]
                        }
                    }
                }, function (err, doc) {
                    if (err) {
                        console.error('维修者角色初始化失败 ');
                        callback(err);
                    } else {
                        console.log(doc);
                        callback(null);
                    }
                }
            )
        }
    },function (err,result) {
        if(err){
            console.error(err);
        }
    });
    async.waterfall([
        function (callback) {
            m.userModel.find({userMajor:'admin'},function (err,doc) {
                if(err){
                    console.error(err)
                }else if(doc[0] != null){
                    console.log('管理员已存在')
                }else{
                    callback(null,doc);
                }
            });
        },
        function (date,callback) {
            m.roleModel.findOne({power_user:'admin'},function (err,doc) {
                callback(err,doc);
            });
        },
        function (date,callback){
            if(process.argv[3]==null){
                 var userPhone = '12345678901'
            }else{
                userPhone = process.argv[3]
            }
            if(process.argv[4]==null){
                var userPassword = '12345678901'
            }else{
                userPassword = process.argv[4]
            }

            m.userModel.create({
                userNickName:'admin',
                userMajor:'admin',
                userName:'admin',
                userPassword:userPassword,
                userCardID:'000000000000000000',
                userPhone:userPhone,
                userSex:'男',
                userAddress:'this',
                userState:1,
                role:{_id:date._id}
            },function (err,doc) {
                callback(err,doc);
            })
        }
    ],function (err,result) {
        if(err){
            console.error(err);
        }else {
            console.log('数据库初始化结束')
        }
    });
};
module.exports = init();

