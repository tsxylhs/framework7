var app = angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope,$rootScope,$http,$timeout,Alert,$$ls) {
  //这里是登录的时候得到的数据
  
  $rootScope.phoneNumber = $$ls.get('phoneNumber','');//用户 的帐号
  Alert.singerConfirm("提示","登录成功");

  $rootScope.server = "http://123.56.220.33:3000";//服务器的地址

  $rootScope.group = $$ls.get('group','');//用户的组别
  $rootScope.groupName = $$ls.get('groupName','');//组名

  //所有未处理的任务
  // 当前用户已处理的任务 和正在处理了 的任务
  $rootScope.unrepaired = [];
  $rootScope.repairing =  [];
  $rootScope.repaired = [];
  

  

  var data = {"account":$rootScope.phoneNumber};
  var timer ;
  var requestData = function(){
      $http({
      method:'POST',
      url:$rootScope.server+"/repair/WRecords",//工作端请求数据
      //这里的数据双向绑定不对
      data:data,
      timeout:2000
  })

    .success(function(data){
      $rootScope.repaired = data.list.repaired;
      $rootScope.repairing = data.list.repairing;
      $rootScope.unrepaired = data.list.unrepaired;
    })
    .error(function(data,status,headers,config){
      
      
    });

    }
     

    timer = $timeout(function myFunction() {
      requestData();
      
      cancelRefresh = $timeout(myFunction, 3000);
   },3000);


  

 
})

app.controller('PlaylistsCtrl', function($scope) {
  
})



app.controller('InfoCtrl',function($scope,$rootScope){
  $scope.name = "InfoCtrl";
});

app.controller('ContactsCtrl',function($scope,$rootScope){
  $scope.contacts = [{name:'张三',phoneNumber:'17863860445'}];
  
});



app.controller('UnConsoledCtrl',function($scope,$rootScope,Alert,$http){
  $scope.show = function(r){
    var confirm = function(){
        $http({
            method:'POST',
            url:$rootScope.server+"/repair/confirm",//工作端请求数据
            data:{"id":r.id,"phoneNumber":$rootScope.phoneNumber,"state":1},
            timeout:2000
          })
          .success(function(data){
            Alert.singerConfirm("提示","接单成功,请尽快维修！！！");

          })
          .error(function(error){
           console.log(error);
            
          });

    }
    Alert.chooseConfirm("单号"+r.id,"<p>保修类型："+r.type+"</p>"+"<p>保修时间："+r.time+"</p>"+"<p>报修者"+r.RP+"</p>"+"<p>备注："+r.rpinfo+"</p>",confirm);
  }
 
});
app.controller('ConsoledCtrl',function($scope,$rootScope){


});
app.controller('ConsolingCtrl',function($scope,$rootScope,Alert,$http){
    
  $scope.show = function(r){
    var confirm = function(){
        $http({
            method:'POST',
            url:$rootScope.server+"/repair/confirm",//工作端请求数据
            data:{"id":r.id,"phoneNumber":$rootScope.phoneNumber,"state":2},
            timeout:2000
          })
        
          .success(function(data){
            Alert.singerConfirm("提示","任务完成，感谢您的合作");

          })
          .error(function(error){
           console.log(error);
            
          });

    }
    Alert.chooseConfirm2("<p align='center'>是否确认报修？</p>单号"+r.id,"<p>保修类型："+r.type+"</p>"+"<p>保修时间："+r.time+"</p>"+"<p>报修者"+r.RP+"</p>"+"<p>备注："+r.rpinfo+"</p>",confirm);
  }


});




app.controller('MyFeedbackCtrl',function($scope){
  $scope.feedback = [{id:123,stars:5,mark:'备注'},{id:141,stars:2,mark:'备注'}];
})

