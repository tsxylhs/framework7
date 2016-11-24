// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$rootScope) {



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.factory('Alert', function($ionicPopup) {

  return {
    chooseConfirm: function(t,c,confirm) {
      var confirmPopup = $ionicPopup.confirm({
       title: t,
       template: c,
       okText:'接单',
       cancelText:'取消'
     });
      confirmPopup.then(function(res) {
       if(res) {
         confirm();
       } else {
         console.log('You are not sure');
       }
     });
    },
    chooseConfirm2: function(t,c,confirm) {
      var confirmPopup = $ionicPopup.confirm({
       title: t,
       template: c,
       okText:'任务完成',
       cancelText:'取消'
     });
      confirmPopup.then(function(res) {
       if(res) {
         confirm();
       } else {
         console.log('You are not sure');
       }
     });
    },
    singerConfirm: function(t,c) {
      $ionicPopup.alert({
        title:t,
        template:c,
        okText:"确认"
      });

    }
   
  };
})

.factory('$$ls',function($window){
  return {
    set : function(key,value){
      $window.localStorage[key] = value;

    },
    get : function(key,defaultValue){
      return $window.localStorage[key]||defaultValue;
    },
    setObject : function(key,value){
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject : function(key){
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.info', {
    url: '/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/info.html',
        controller:'InfoCtrl'
      }
    }
  })

  .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html',
          controller:'ContactsCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.unconsoled', {
    url: '/unconsoled',
    views: {
      'menuContent': {
        templateUrl: 'templates/unconsoled.html',
        controller: 'UnConsoledCtrl'
      }
    }
  })

  .state('app.consoled', {
    url: '/consoled',
    views: {
      'menuContent': {
        templateUrl: 'templates/consoled.html',
        controller: 'ConsoledCtrl'
      }
    }
  })

  .state('app.consoling', {
    url: '/consoling',
    views: {
      'menuContent': {
        templateUrl: 'templates/consoling.html',
        controller: 'ConsolingCtrl'
      }
    }
  })
    .state('app.myfeedback', {
    url: '/myfeedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html',
        controller: 'MyFeedbackCtrl'
      }
    }
  });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
