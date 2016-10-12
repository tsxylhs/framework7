var app = angular.module('starter.directive',[]);

app.directive('heading',function(){
	return {
		restrict:'E',
		templateUrl:"tools/templates/heading.html",
		controller:'HeadingCtrl'
	}
});

app.directive('footing',function(){
	return {
		restrict:'E',
		templateUrl:"tools/templates/footing.html"
	}
	
});

