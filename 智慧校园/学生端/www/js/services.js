var app = angular.module('starter.services', [])

app.factory('Alert', function($ionicPopup) {

  return {
    chooseConfirm: function() {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
      confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
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
});


app.factory('$$ls',function($window){
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
});
