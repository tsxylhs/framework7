// js脚本入口
var dpdc = ['ui.router','starter.repair','ui.bootstrap','ngAnimate','starter.service',
		'starter.directive','starter.controller','starter.login','starter.register'];
var app = angular.module('starter',dpdc);

//主页的controller
app.run(function($rootScope) {





    // app初始化的地方
    

    $rootScope.hrefs = '123.56.220.33:3000';
    $rootScope.port = '3000';
    $rootScope.info = '未登录';
    $rootScope.tips = {};
    



    $rootScope.islogined = function(){
    	if($rootScope.info == "未登录"){

    		$rootScope.tips.content = "用户未登录，请先进行登录！！！"

    		$('#tips').modal({
			  keyboard: false
			});
			
    	}



    }


    
});


app.config(function($stateProvider,$urlRouterProvider) {

	$stateProvider.state('home',{
		url:'/home',
		views:{
			'content':{
				templateUrl:'templates/home.html',
				controller:'HomeCtrl'
			}
		}
	});

	$stateProvider.state('aboutus',{
		url:'/aboutus',
		views:{
			'content':{
				templateUrl:'templates/about-us.html',
				controller:'AboutUsCtrl'
			}
		}
	});

	$stateProvider.state('repair-platform',{
		url:'/repair',
		views:{
			'content':{
				templateUrl:'component-repair/repair.html',
				controller:'RepairCtrl'
			}
		}
	});




	$stateProvider.state('repair-platform.repair-info',{
		url:'/dorepair',
		templateUrl:'component-repair/templates/dorepair.html',
		controller:'DoRepairCtrl'
	});

	$stateProvider.state('repair-platform.repair-records',{
		url:'/repair-record',
		templateUrl:'component-repair/templates/repair-records.html',
		controller:'RepairRecordsCtrl'
	});

	//正在保修
	$stateProvider.state('repair-platform.repairing',{
		url:'/repairing',
		templateUrl:'component-repair/templates/repairing.html',
		controller:'RepairingCtrl'
	});

	$stateProvider.state('repair-platform.user-manager',{
		url:'/user-manager',
		templateUrl:'component-repair/templates/user-manager.html',
		controller:'UserManagerCtrl'
	});

	$stateProvider.state('repair-platform.power-manager',{
		url:'/power-manager',
		templateUrl:'component-repair/templates/power-manager.html',
		controller:'PowerManagerCtrl'
	});

	$stateProvider.state('repair-platform.do-user-manager',{
		url:'/do-user-manager',
		templateUrl:'component-repair/templates/user-manager-page.html',
		controller:'DoUserManagerCtrl'
	});



	$stateProvider.state('repair-platform.repair-manager',{
		url:'/repair-manager',
		templateUrl:'component-repair/templates/repair-manager.html',
		controller:'RepairManagerCtrl'
	});

	$stateProvider.state('repair-platform.info-center',{
		url:'/info-center',
		templateUrl:'component-repair/templates/info-center.html',
		controller:'InfoCenterCtrl'
	});

	$stateProvider.state('repair-platform.data-ansis',{
		url:'/data-ansis',
		templateUrl:'component-repair/templates/data-ansis.html',
		controller:'DataAnsisCtrl'
	});






	$stateProvider.state('login',{
		url:'/login',
		views:{
			'content':{
				templateUrl:'component-common/detail-login/login.html',
				controller:'LoginCtrl'
			}
		}
	});
	
	$stateProvider.state('register',{
		url:'/register',
		views:{
			'content':{
				templateUrl:'component-common/detail-register/register.html',
				controller:'RegisterCtrl'
			}
		}
	});


	$urlRouterProvider.otherwise('/home');

});
