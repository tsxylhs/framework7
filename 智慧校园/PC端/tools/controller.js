var app = angular.module('starter.controller',[]);




app.controller('HomeCtrl', function($scope){
	//控制轮播速度
	$('.carousel').carousel({
  		interval: 3666
	});
});

app.controller('HeadingCtrl',function($scope){
	$scope.name = "I am a Heading";

});

app.controller('AboutUsCtrl',function($scope){
	
});