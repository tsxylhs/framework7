/**
 * Created by lion on 16-7-26.
 */
var mongoose = require('mongoose');
// 读取文件并使用JSON.parse()解析
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname+'/../public/config.json').toString());
var db = mongoose.connect(config.DBUrl);

db.connection.on("error",function (error) {
    console.error("数据库打开失败. "+error);
});
db.connection.on("open",function () {
    console.log("数据库开启成功.")
});

module.exports = db;