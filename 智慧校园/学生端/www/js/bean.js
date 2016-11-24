var app = angular.module('bean', []);
// 用到的类
// 用户类：帐号、密码、昵称、电话号码、学号
function User(account,password,nickName,phoneNumber,sno){
  this.account = account;
  this.password = password;
  this.nickName = nickName;
  this.phoneNumber = phoneNumber;
  this.sno = sno;
};


User.prototype = {
	getAccount : function(){
		return this.account;
	},
	getPassword : function(){
		return this.password;
	},
	getNickName : function(){
		return this.nickName;
	},
	getPhoneNumber : function(){
		return this.phoneNumber;
	},
	getSno : function(){
		return this.sno;
	},
	setAccount : function(account){
		this.account = account;
	},
	setPassword : function(password){
		this.password = password;
	},
	setNickName : function(nickName){
		this.nickName = nickName;
	},
	setPhoneNumber : function(phoneNumber){
		this.phoneNumber = phoneNumber;
	},
	setSno : function(sno){
		this.sno = sno;
	}
};