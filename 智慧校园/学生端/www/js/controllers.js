var app = angular.module('starter.controllers', []);



app.controller('HomeCtrl', function($scope) {
    

});
app.controller('RepairCtrl',function($scope){

});
//-------------------------------------------------------教室报修
app.controller('ClassroomRepairCtrl',function($scope,$rootScope,$$ls,$http,Alert,$ionicHistory,$cordovaCamera){
	var flag = 2;
	var srcs = [];
	$scope.capturePhoto = function(){
		  var options = {  
	      quality: 100,  
	      destinationType: Camera.DestinationType.DATA_URL,  
	      sourceType: Camera.PictureSourceType.CAMERA,  
	      allowEdit: true,  
	      encodingType: Camera.EncodingType.JPEG,  
	      targetWidth: 100,  
	      targetHeight: 100,  
	      popoverOptions: CameraPopoverOptions,  
	      saveToPhotoAlbum: false  
    };   
	  
	    if(flag == 2){
	    	$cordovaCamera.getPicture(options).then(function(imageData) {  
		      var image = document.getElementById('myImage');  
		      image.src = "data:image/jpeg;base64," + imageData;
		      srcs.push(image.src);
		      flag -= 1;  
		    }, function(err) {  
		      // error  
		    });
	    } 
	    if(flag == 1){
	    	$cordovaCamera.getPicture(options).then(function(imageData) {  
		      var image1 = document.getElementById('myImage1');  
		      image1.src = "data:image/jpeg;base64," + imageData; 
		      srcs.push(image1.src);
		      flag -= 1; 
		    }, function(err) {  
		      // error  
		    });
	    }
	    if(flag == 0){
	    	$cordovaCamera.getPicture(options).then(function(imageData) {  
		      var image2 = document.getElementById('myImage2');  
		      image2.src = "data:image/jpeg;base64," + imageData; 
		      srcs.push(image2.src);
		      flag -= 1; 
		    }, function(err) {  
		      // error  
		    });
	    } 
	}

	var serverIP = $$ls.get('serverIP','');//服务器ip
	var serverPort = $$ls.get('serverPort','');//服务器端口
	$scope.repair = {};
	//图片的路径 srcs[]

	//发送报修单
	$scope.sendRepair = function(selected,rpinfo){
		// document.addEventListener("deviceready", onDeviceReady, false);
		// function onDeviceReady() {
		//     Alert.singerConfirm('设备准备成功');
		// }
		// selected选择的类型嗯
		// dtdes是详细的描述
		var form = {'bdno':$scope.repair.bdno,'rmno':$scope.repair.rmno,'rptp':selected,'rpinfo':rpinfo,'account':$rootScope.info};
		if($rootScope.info == "未登录"){
			alert("用户未登录请先登录");
		}else{
			$http({
			method:'POST',
			url:"http://"+serverIP+":"+serverPort+"/repair/CReport",
			//这里的数据双向绑定不对
			data:form,
			timeout:2000
		})

		.success(function(data){
			if(data.state == "CReport_OK"){

				Alert.singerConfirm('保修成功',"欢迎使用");
				$ionicHistory.goBack(-2);
				// var options = new FileUploadOptions();
				// options.filekey = "img";
				// options.mimeType = "image/jpeg";


				// options.filekey = "test";
				// var ft = new FileTransfer();
				// var win = function (r) {
				//     Alert.singerConfirm('保修成功',r.response+" "+r.bytesSent+" "+r.response);
				//     $ionicHistory.goBack(-2);

				// }

				// var fail = function (error) {
				// 	Alert.singerConfirm('保修失败'+error.code);
				//     // alert("An error has occurred: Code = " + error.code);
				// }
				// var srcHref = "file:///home/h/photo/1.jpg";
				
				// ft.upload(srcs[0],"http://"+serverIP+":"+serverPort+"/repair/CReport",win,fail,options);
				//ft.upload(srcHref,"http://"+serverIP+":"+serverPort+"/repair/CReport",win,fail,options);
			}
			else{
				Alert.singerConfirm("保修失败","服务器拒绝了您的请求");
					
			}
		})
		.error(function(data,status,headers,config){
			Alert.singerConfirm("失败","服务器连接失败")
			
		});

		}//--else结束



	}
});
//----------------------------------------------------教室保修的结束

//--------------------------------------------------------公寓保修
app.controller('ApartmentRepairCtrl',function($scope,$rootScope,$$ls,$http,Alert,$ionicHistory,$cordovaCamera){
	var flag = 2;
	$scope.capturePhoto = function(){
		  var options = {  
	      quality: 100,  
	      destinationType: Camera.DestinationType.DATA_URL,  
	      sourceType: Camera.PictureSourceType.CAMERA,  
	      allowEdit: true,  
	      encodingType: Camera.EncodingType.JPEG,  
	      targetWidth: 100,  
	      targetHeight: 100,  
	      popoverOptions: CameraPopoverOptions,  
	      saveToPhotoAlbum: false  
    };   
	  
	  
	    if(flag == 2){
		    $cordovaCamera.getPicture(options).then(function(imageData) {  
		      var image = document.getElementById('myImage');  
		      image.src = "data:image/jpeg;base64," + imageData;
		      flag -= 1;

		    }, function(err) {  
		      // error  
		    });
	    }
	    if(flag == 1){
	    	$cordovaCamera.getPicture(options).then(function(imageData) {  
		      var image1 = document.getElementById('myImage1');  
		      image1.src = "data:image/jpeg;base64," + imageData;
		      flag -= 1;

		    }, function(err) {  
		      // error  
		    });
	    }
	    if(flag == 0){
	    	$cordovaCamera.getPicture(options).then(function(imageData) {  
		      var image2 = document.getElementById('myImage2');  
		      image2.src = "data:image/jpeg;base64," + imageData;
		      flag -= 1;

		    }, function(err) {  
		      // error  
		    });
	    }

	}

/*这里是保修事件*/
	var serverIP = $$ls.get('serverIP','');
	var serverPort = $$ls.get('serverPort','');
	$scope.repair = {};

	$scope.sendRepair = function(selected,rpinfo){
		// selected选择的类型嗯
		// dtdes是详细的描述

		var form = {'bdno':$scope.repair.bdno,'rmno':$scope.repair.rmno,'rptp':selected,'rpinfo':rpinfo,'account':$rootScope.info};
		if($rootScope.info == "未登录"){
			alert("用户未登录请先登录");
		}else{
			$http({
			method:'POST',
			url:"http://"+serverIP+":"+serverPort+"/repair/CReport",
			
			data:form,
			timeout:2000
		})

		.success(function(data){
			if(data.state == "CReport_OK"){
				flag = 2;
				Alert.singerConfirm("保修成功","感谢使用！！！");
				$ionicHistory.goBack(-2);
			}
			else{
				Alert.singerConfirm("保修失败","服务器拒绝了您的请求");
					
			}
		})
		.error(function(data,status,headers,config){
			Alert.singerConfirm("失败","服务器连接失败");
			
		});

		}//--else结束



	}


});
//--------------------------------------------------------公寓保修结束 

//-------------------------------------------------------保修记录
app.controller('RepairRecordsCtrl',function($scope,$rootScope,$$ls,$http,Alert,$ionicHistory){
	var serverIP = $$ls.get('serverIP','');
	var serverPort = $$ls.get('serverPort','');
	$scope.repairing = [];
	$scope.repaired = [];
	$scope.noRepair = [];


	if($rootScope.info == "未登录"){
			alert("用户未登录请先登录");
		}else{
			$http({
			method:'POST',
			url:"http://"+serverIP+":"+serverPort+"/repair/records",
			data:{account:$rootScope.info},
			timeout:2000
		})

		.success(function(data){
			
			if(data.state == 'records_OK'){
				for(var i = 0;i<data.list.length;i++){
					
					if(data.list[i].state == '0'){
						//未处理
					
						$scope.noRepair.push({time:data.list[i].time,type:data.list[i].type});
						
					}
					if(data.list[i].state == '1'){
						//处理中
					
						$scope.repairing.push({time:data.list[i].time,type:data.list[i].type});
					
					}
					if(data.list[i].state == '2'){
						//处理完毕
					
						$scope.repaired.push({time:data.list[i].time,type:data.list[i].type});
										}
				}
			}
			else{
				Alert.singerConfirm("查询失败","服务器拒绝了您的请求");		
			}
		})
		.error(function(data,status,headers,config){
			Alert.singerConfirm("失败","服务器连接失败");
		});
		}//--else结束
});
//-------------------------------------------------------保修记录结束

app.controller('RepairFeedbackCtrl',function($scope){

});


app.controller('ChatsCtrl', function($scope) {
  
});

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('AccountCtrl', function($scope,$$ls,$rootScope) {
	
	
	


});

//----------------------------------------------------------------------------登录模块的开始
app.controller('LoginCtrl',function($scope,Alert,$timeout,$http,$$ls,$ionicHistory,$rootScope){
	
	
	var serverIP = $$ls.get('serverIP','');
	var serverPort = $$ls.get('serverPort','');
	$scope.user = {};

	

	$scope.login = function(){

		// var loginPhoneNumber = document.getElementById('loginPhoneNumber').value;
		// var loginPassword = document.getElementById('loginPassword').value;
		$http({
			method:'POST',
			url:"http://"+serverIP+":"+serverPort+"/users/login",
			//这里的数据双向绑定不对
			data:{'account':$scope.user.phoneNumber,'password':$scope.user.password,type:1},
			timeout:2000
		})
		.success(function(data){
			if(data.state == "login_OK"){
				$$ls.set('myAccount',$scope.user.phoneNumber);
				Alert.singerConfirm("登录成功","欢迎使用！！！");
				$rootScope.info = $scope.user.phoneNumber;
				$rootScope.hrefs = "#tab/account/data";
				$ionicHistory.goBack(-1);

			}
			else{
				Alert.singerConfirm("登录失败","请检查您的帐号密码后重新登录");
				

				
			}
		})
		.error(function(data,status,headers,config){
			Alert.singerConfirm("失败","服务器连接失败")
			
		});

	};
});
//----------------------------------------------------------------------------登录模块的结束
app.controller('RegisterCtrl',function($scope,Alert,$http,$timeout,$$ls,$ionicHistory){
	var serverIP = $$ls.get('serverIP','');
	var serverPort = $$ls.get('serverPort','');
	$scope.user = {};


	$scope.register = function(){
	
		$http({
			method:'POST',
			url:"http://"+serverIP+":"+serverPort+"/users/register",
			//这里的数据双向绑定不对
			data:{'userPhone':$scope.user.phoneNumber,'userPassword':$scope.user.password,'userNickName':$scope.user.nickName,'userName':$scope.user.name,"userMajor":"admin"},
			timeout:2000
		})
		.success(function(data){
			if(data.state == "register_OK"){
				$$ls.set('myAccount',$scope.user.phoneNumber);
				Alert.singerConfirm("注册成功","欢迎使用保修系统");
				$ionicHistory.goBack(-2);
			}
			else{
				Alert.singerConfirm("注册失败","服务器拒绝了您的请求")
			}

			


		})
		.error(function(data){
			Alert.singerConfirm("注册失败","连接不到服务器")
		});

	};
});

app.controller('AboutCtrl',function($scope){

});
app.controller('MyDataCtrl',function($scope){

});
app.controller('MyCardCtrl',function($scope){

});
app.controller('MyCollectionCtrl',function($scope){

});
app.controller('MyFeedbackCtrl',function($scope){

});


