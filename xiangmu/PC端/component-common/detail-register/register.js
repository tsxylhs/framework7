var app = angular.module('starter.register',[]);

app.controller('RegisterCtrl',function($scope,$http,$rootScope){
	$scope.name = "RegisterCtrl";

	$scope.register = function(account,password){
		$http({
			method:'POST',
			url:"http://"+$rootScope.hrefs+"/users/register",
			
			data:{'userPhone':account,'userPassword':password,
			'userNickName':'SRH','userName':'SRH',"userMajor":"repair"},
			timeout:2000
		})

		.success(function(data){
			
			if(data.state == "register_OK"){
			alert('注册成功请重新登录！');
			window.location.href = "#/returntohome";
			}else{

				alert('注册失败');
			}


		})
		.error(function(data){
			alert('register faild');
		});



	}


});
