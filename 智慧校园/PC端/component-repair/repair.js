var app  = angular.module('starter.repair',[]);

app.controller('RepairCtrl',function($scope,$rootScope,$timeout,$http,$$ls){
  //这里是登录的时候得到的数据
  

  $rootScope.unrepaired = $$ls.get('unrepaired','');
  $rootScope.repairing =  $$ls.get('repairing','');
  $rootScope.repaired = $$ls.get('repaired','');
  

  

  var data = {"account":$rootScope.info};
  
  $rootScope.requestData = function(){
      $http({
      method:'POST',
      url:"http://"+$rootScope.hrefs+"/repair/WRecords",
      //这里的数据双向绑定不对
      data:data,
      timeout:2000
  })

    .success(function(data){
      $rootScope.repaired = data.list.repaired;
      $rootScope.repairing = data.list.repairing;
      $rootScope.unrepaired = data.list.unrepaired;
      //本地缓存
      $$ls.set(unrepaired,data.list.unrepaired);
      alert($$ls.get('unrepaired',''));
      $$ls.set(repairing,data.list.repairing);
      $$ls.set(repaired,data.list.repaired);

    })
    .error(function(data){
      console.log("服务器链接不上了！！！");
      
    });

    }
 

    $timeout(function myFunction() {
      requestData();
      
      cancelRefresh = $timeout(myFunction, 60000);
   },60000);



});
//------------------------------------------------报修 
app.controller('DoRepairCtrl',function($scope,$timeout,$rootScope,$http){
  $scope.repair = {};

  $scope.sendRepair = function(selected,rpinfo){
    var form = {'bdno':$scope.repair.bdno,'rmno':$scope.repair.rmno,'rptp':selected,'rpinfo':rpinfo,'account':$rootScope.info};

    if($rootScope.info == "未登录"){
      alert("用户未登录请先登录");
    }else{
      $http({
      method:'POST',
      url:"http://"+$rootScope.hrefs+"/repair/CReport",
      
      data:form,
      timeout:2000
    })

    .success(function(data){
      if(data.state == "CReport_OK"){

        $('#tips').modal('toggle');
        $rootScope.tips.content = "报修成功。";
        $scope.repair.bdno = '';
        $scope.repair.rmno = '';
        $scope.repair.rpinfo = '';



      }
      else{
       $('#tips').modal('toggle');
       $rootScope.tips.content = "报修失败";
          
      }
    })
    .error(function(data,status,headers,config){
     alert('请检查您的网络链接');
      
    });
  }
}


});
//-----------------------------------------------报修结束
//------------------------------------------------正在保修的控制器
app.controller('RepairingCtrl',function($scope,$rootScope){
  $rootScope.requestData();

});


//---------------------------------------------------------保修记录的controller
app.controller('RepairRecordsCtrl',function($scope,$rootScope,$http){

  $rootScope.requestData();
  // $rootScope.role = '管理员';
  // var flag = 1;
  // if($rootScope.role == '管理员'){
  //   flag = 0;
  // }else{
  //   flag = 1;
  // }

  // $scope.records = [{}];
  //  $http({
  //     method:'POST',
  //     url:$rootScope.hrefs,//请求地址
  //     data:{type:flag},
  //     timeout:2000
  //   })


  //   .success(function(data){
  //     if(data.state == ""){//返回成功的状态
  //      //这里是请求成功进行操作
  //     }
  //     else{
  //       //这里是请求不成功的操作
          
  //     }
  //   })

  //   .error(function(data,status,headers,config){
  //    //not connected
      
  //   });
});
//-----------------------------------------------------------保修记录的结束
app.controller('UserManagerCtrl',function($scope){
$scope.name = "UserManagerCtrl";
  
});
app.controller('PowerManagerCtrl',function($scope){

});
//------------------------------------------------------------用户管理界面的controller
app.controller('DoUserManagerCtrl',function($scope,$rootScope,$http){
//用户保修之前需要向服务器进行用户数量的请求,请求所有用户的信息

var queryData = function(){
  $http({
      method:'POST',
      url:"http://"+$rootScope.hrefs+"/users/userDao",
      //这里的数据双向绑定不对
      data:{type:'findAll'},
      timeout:2000
    })
    .success(function(data){
      if(data.state == "userDao_OK"){//请求成功
        $scope.userList = data.info;
      }
      else{
       alert('请求所有用户失败');
          
      }
    })
    .error(function(data,status,headers,config){
      alert('链接不到服务器');
      
    });

}
queryData();





  $scope.modal = {};
  $scope.currUser = {};
  $scope.flag = "";
  $scope.scanUser = function(user){
    
    $scope.modal.title = "查看用户";
    $scope.modal.result = "返回";
    $scope.modal.type = "scanUser";
    $scope.modal.user = user;
  }

  $scope.deleteUser = function(user){
    $scope.modal.title = "删除用户";
    $scope.modal.result = "确认删除";
    $scope.modal.type = "deleteUser";
    $scope.modal.user = user;
    $scope.flag = "deleteUser";
    $scope.currUser = user;

  }

  $scope.alterUser = function(user){
    $scope.modal.title = "修改用户";
    $scope.modal.result = "确认修改";
    $scope.modal.type = "alterUser";
    $scope.modal.user = user;
    $scope.flag = "alterUser";
    $scope.currUser = user;
  }

  $scope.method = function(){
   if($scope.flag == 'deleteUser'){
      $http({
      method:'POST',
      url:"http://"+$rootScope.hrefs+"/users/userDao",
      
      data:{type:'delete',info:$scope.currUser._id},
      timeout:2000
    })
    .success(function(data){
      if(data.state == "userDao_OK"){//请求成功

        //重新请求数据
 
        queryData();
        $scope.backInfo = "删除成功";
        $('#myModal').modal('toggle');
        $rootScope.tips.content = "删除成功";
        $('#tips').modal('toggle');


      }
      else{
       $scope.backInfo = "删除失败";
          
      }
    })
    .error(function(data,status,headers,config){

        $('#myModal').modal('toggle');
        $rootScope.tips.content = "链接不到服务器";
        $('#tips').modal('toggle');
      
    });


   }
   //修改用户信息哦
   if($scope.flag == 'alterUser'){
      $http({
      method:'POST',
      url:"http://"+$rootScope.hrefs+"/users/userDao",
      
      data:{type:'update',user:$scope.currUser},

      timeout:2000
    })
    .success(function(data){
      if(data.state == "userDao_OK"){//请求成功

        //重新请求数据
 
        queryData();
        $('#myModal').modal('toggle');
        $rootScope.tips.content = "修改成功";
        $('#tips').modal('toggle');
      }
      else{
        $('#myModal').modal('toggle');
        $rootScope.tips.content = "修改成功";
        $('#tips').modal('toggle');
          
      }
    })
    .error(function(data,status,headers,config){
        $('#myModal').modal('toggle');
        $rootScope.tips.content = "链接不到服务器";
        $('#tips').modal('toggle');
      
    });
   }  

  }








});

app.controller('InfoCenterCtrl',function($scope,$http,$rootScope){
    $scope.feedback = [{work:'张三',user:'里斯',feed:'5',mark:'很好'}];
      $http({
      method:'POST',
      url:$rootScope.hrefs,//所有反馈信息的查询
      //这里的数据双向绑定不对
      data:{type:'queryAllFeedback'},
      timeout:2000
    })


    .success(function(data){
      if(data.state == ""){//请求成功
        
       
      }

      else{
       //请求失败
          
      }
    })

    .error(function(data,status,headers,config){
      //这里是链接不到服务器进行 的操作
      
    });

});



app.controller('DataAnsisCtrl',function($scope){
	var chart = {
      type: 'area'
   };
   var title = {
      text: '保修数据分析'   
   };
   var subtitle = {
      text: '最近一段时间的保修情况表' 
   };
   var xAxis = {
      allowDecimals: false,
      labels: {
         formatter: function () {
            return this.value; // clean, unformatted number for year
         }
      }
   };
   var yAxis = {
      title: {
         text: '保修情况区域图'
      },
      labels: {
         formatter: function () {
            return this.value / 1000 + 'k';
         }
      }
   };
   var tooltip = {
      pointFormat: '{series.name}'
   };
   var plotOptions = {
      area: {
         pointStart: 1,
         marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,	
            states: {
               hover: {
                 enabled: true
               }
            }
         }
      }
   };
   var series= [{
         name: '公寓保修',
            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        }, {
            name: '宿舍保修',
            data: [null, null, null, null, null, null, null, null, null, null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
      }
   ];     
      
   var json = {};   
   json.chart = chart; 
   json.title = title;   
   json.subtitle = subtitle; 
   json.tooltip = tooltip;
   json.xAxis = xAxis;
   json.yAxis = yAxis;  
   json.series = series;
   json.plotOptions = plotOptions;
   $('#container').highcharts(json);

});

app.controller('RepairManagerCtrl',function($scope,$http,$rootScope){
    $scope.name = 'RepairManagerCtrl';
      $scope.repairs = [{id:1,state:'保修中',user:'贺作伟',work:'张三'}];
   
    $scope.changeState = function(){
      alert('修改表单状态');
    }

     $http({
      method:'POST',
      url:$rootScope.hrefs,//所有反馈信息的查询
      //这里的数据双向绑定不对
      data:{type:'queryAllRepair'},
      timeout:2000
    })


    .success(function(data){
      if(data.state == ""){//请求成功
        
       
      }

      else{
       //请求失败
          
      }
    })

    .error(function(data,status,headers,config){
      //这里是链接不到服务器进行 的操作
      
    });
    //这是测试数据 结束后不会用这段数据





});

