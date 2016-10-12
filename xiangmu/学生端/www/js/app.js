// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova']);


app.run(function($ionicPlatform,$window,$$ls,$rootScope,$cordovaFile) {
    // app初始化的地方
    $$ls.set('serverIP','123.56.220.33');
    $$ls.set('serverPort',3000);
    //默认未登录
    // $$ls.set('isLogined',1);
   
    if($$ls.get('isLogined') != 0){
      $rootScope.info = '未登录';
      $rootScope.hrefs = '#tab/account/login'

    }else{
      $rootScope.info = $$ls.get('myAccount','');
      $rootScope.hrefs = '#tab/account/data';
    }
    
    

  //程序运行检查登录次数
    //$$ls.set('isFirst',"yes");
    //现在不进入引导页面，等后期在写引导页面及其样式
    // if($$ls.get('isFirst')!="yes"){
    //   window.location.href="guide-page.html";
    //   // $$ls.set('isFirst',"no");

    //  }
     //alert($$ls.get('isFirst'));
    
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive


    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
// 保修的页面
  .state('tab.repair-detail',{
    url:'/home/repair',
    views:{
      'tab-home':{
        templateUrl:'templates/repair-detail.html',
        controller:'RepairCtrl'
      }
    }
  })

  //教室保修单页面
  .state('tab.classroom',{
    url:'/home/classroom',
    views:{
      'tab-home':{
        templateUrl:'templates/classroom-repair.html',
        controller:'ClassroomRepairCtrl'
      }
    }
  })
  .state('tab.apartment',{
    url:'/home/apartment',
    views:{
      'tab-home':{
        templateUrl:'templates/apartment-repair.html',
        controller:'ApartmentRepairCtrl'
      }
    }
  })
  .state('tab.records',{
    url:'/home/records',
    views:{
      'tab-home':{
        templateUrl:'templates/repair-records.html',
        controller:'RepairRecordsCtrl'
      }
    }
  })
  .state('tab.feedback',{
    url:'/home/feedback',
    views:{
      'tab-home':{
        templateUrl:'templates/repair-feedback.html',
        controller:'RepairFeedbackCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


  .state('tab.login-detail',{
    url:'/account/login',
    views : {
      'tab-account':{
        templateUrl:'templates/login-detail.html',
        controller:'LoginCtrl'
      }
    }
  })
  .state('tab.register-detail',{
    url:'/account/register',
    views : {
      'tab-account':{
        templateUrl:'templates/register-detail.html',
        controller:'RegisterCtrl'
      }
    }
  })
  .state('tab.data',{
    url:'/account/data',
    views : {
      'tab-account':{
        templateUrl:'templates/my-data.html',
        controller:'MyDataCtrl'
      }
    }
  })
  .state('tab.card',{
    url:'/account/card',
    views : {
      'tab-account':{
        templateUrl:'templates/my-card.html',
        controller:'MyCardCtrl'
      }
    }
  })
    .state('tab.collection',{
    url:'/account/collection',
    views : {
      'tab-account':{
        templateUrl:'templates/my-collection.html',
        controller:'MyCollectionCtrl'
      }
    }
  })
      .state('tab.myfeedback',{
    url:'/account/myfeedback',
    views : {
      'tab-account':{
        templateUrl:'templates/my-feedback.html',
        controller:'MyFeedbackCtrl'
      }
    }
  })

  .state('tab.about',{
    url:'/account/about',
    views : {
      'tab-account':{
        templateUrl:'templates/about.html',
        controller:'AboutCtrl'
      }
    }
  });
 




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
