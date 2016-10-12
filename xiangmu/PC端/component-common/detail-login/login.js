var app = angular.module('starter.login',[]);

app.controller('LoginCtrl',function($scope,$rootScope,$http,$$ls){
	$scope.name =  "LOGIN";

	//这里默认登录成功了
	
   




	$scope.user = {};

    
    // $rootScope.managerList = {"管理列表":[{name:"用户中心",url:"#/repair/user-manager"},
    // {name:"保修管理",url:"#/repair/repair-manager"},{name:"信息中心",url:"#/repair/info-center"},
    // {name:"数据分析",url:"#/repair/data-ansis"},{name:"权限管理",url:"#/repair/power-manager"},{name:'用户管理',url:"#/repair/do-user-manager"}]};




	$scope.login = function(){
		
		
			$http({
			method:'POST',
			url:"http://"+$rootScope.hrefs+"/users/login",
			
			data:{account:$scope.user.account,password:$scope.user.password,type:3},
			timeout:2000
		})

		.success(function(data){
			
			if(data.state == "login_OK"){
			
			$rootScope.info = $scope.user.account;
			$rootScope.powerList = data.role.power.two;
			$rootScope.managerList = data.role.power.one;
			window.location.href = "#/returntohome";



			}else{
				alert('登录失败');
			}
		})
		.error(function(data){
			alert('login faild');
		});
	}

	$rootScope.exit = function(){
			$rootScope.info = '未登录';
			$rootScope.powerList = {};
			$rootScope.managerList = {};
			$$ls.set('repaired','');
			$$ls.set('repairing','');
			$$ls.set('unrepaired','');
			window.location.href = "#/returntohome";
	}

});
