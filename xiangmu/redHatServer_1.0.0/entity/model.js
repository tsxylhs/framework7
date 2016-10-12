/**
 * Created by lion on 16-9-6.
 */
var mongoose = require('mongoose');
var db = require('../database/Conntion');


var userSchema = new mongoose.Schema({//定义用户的所有项
    userNickName:{type:String},
    userSchoolID:{type:String},
    userCardID:{type:String},
    userPassword:{type:String},
    userPhone:{type:String},
    userName:{type:String},
    userSex:{type:String},
    userMajor:{type:String},
    userAddress:{type:Object},
    userState:{type:Number},
    role:{type:Object}
});


var roleSchema = new mongoose.Schema({//定义角色的内容
    power_user:{type:String},
    power:{}
});

var repairSchema= new mongoose.Schema({//定义报修详情的内容
    bdno:{type:String},
    rmno:{type:String},
    rpinfo:{type:String},
    rptp:{type:String},
    date:{type:Date},
    uPhone:{type:String},
    rPhone:{type:String,default:'0000'},
    state:{type:Number},
    callback:{state:{type:Number,default:0}},
    path:{type:String}
});
model = function () {
var userModel = db.model('user',userSchema,'user');
var roleModel = db.model('role',roleSchema,'role');
var repairModel = db.model('repair',repairSchema,'repair');
    return {userModel:userModel,roleModel:roleModel,repairModel:repairModel};
};
module.exports = model;