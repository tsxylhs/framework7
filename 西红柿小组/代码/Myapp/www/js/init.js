

    // Initialize app
     var myApp = new Framework7({
     animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true,
        // Specify Template7 data for pages

});



var $$ = Framework7.$;
     swipeBackPage:true
// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});



var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');
var view5 = myApp.addView('#view-5');
var tba=myApp.addView('#tab2');
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
      $.ajaxSetup({
    data: {
      //为请求设置默认值
        "token": $.jStorage.get("token"),
        "email": $.jStorage.get("email")
    },
    type: "POST"
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function() {
    //myApp.showIndicator();
});
$$(document).on('ajaxComplete', function() {
    //myApp.hideIndicator();
});
/*var serverURI='http://127.0.0.1:8888/'*/
var serverURI='http://120.77.46.61:8888/'

if ($.jStorage.get("email")) {
    $$('#user-email-span').text($.jStorage.get("email"));
    $$('#date-picker').val(getCurrentDate());
      dalidylist();
    getplanList();
    getTravelList();
} else {
    mainView.loadPage('login.html');
}
$$(document).on('pageInit', function(e) {
    var page=e.detail.page;
    if(page.name=='about'){
     
 $('.cre').on('click', function () {
 


 
 
   
});
    }    
  
});



// Events for specific pages when it initialized
$$(document).on('pageInit', function(e) {
    var page = e.detail.page;

    if (page.name === 'login') {
        $$('.toolbar').hide();
        $$('.loginBtn').on('click', function() {
            var email = $('#email').val();
        
            if (!validateEmail(email)) {
                myApp.alert('');
                $('#email').val("");
                $('#password').val("");
                return;
            }
            var password = $('#password').val();
            myApp.login(email, password);
        });
    }

    if (page.name === 'signup') {
        $$('.toolbar').hide();
        $$('.signupBtn').on('click', function() {
            var email = $('#signup-email').val();
            var username = $('#signup-username').val();
            var password = $('#signup-password').val();
            var password_cfm = $('#signup-password-cfm').val();
            console.log(email, username, password, password_cfm);
            if (myApp.signupCheck(email, username, password, password_cfm)) {
                myApp.signup(email, username, password);
            }

        });
    }
});

// Pull to refresh content
var dalidy=$$('.dalidy-refresh');
var ptrContent = $$('.todo-refresh');
var historyContent=$$('.history-refresh');
dalidy.on('refresh',function(){
    dalidylist();
     myApp.pullToRefreshDone();
})
historyContent.on('refresh',function(){
   getTravelList();
     myApp.pullToRefreshDone();
})
// Add 'refresh' listener on it
ptrContent.on('refresh', function(e) {
    getplanList();
    // When loading done, we need to "close" it
    myApp.pullToRefreshDone();
});


$$('#logoutBtn').on('click', function() {
    myApp.logout();
});


//添加日程


//创建行程
$$('.submitBtn2').on('click',function(){
    var title=$('#title-picker').val();
    var address=$('#address-picker').val();
    var date=$('#pickdate1').val();
    var time1=$('#picktime').val();
    var text=$('#text1-picker').val();

       var time=genCurrentDatetime(date, time1)
          
            myApp.addTravel(title,address,time,text);
});

//创建日记
$$('.submitBtn1').on('click', function() {
     
    var title = $('#dalidy-name').val();
    var date = $('#date-picker').val();
    var text = $('#text-dalidy').val();

    myApp.addNewdalidy(title,date,text);

});
//创建计划
$$('.submitBtn').on('click', function() {
    var task = $('#task-name').val();
   
    var time = $('#pickdate').val();
    var text = $('#text-picker').val();

    myApp.addNewTask(task,time,text);

 
});

$$('.pre-loader').on('click', function() {
    myApp.showPreloader();
})
// Required for demo popover
$$('.popover a').on('click', function() {
    myApp.closeModal('.popover');
});

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function() {
    $$('.statusbar-overlay').addClass('with-panel-left');
});

$$('.panel-left, .panel-right').on('close', function() {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

myApp.signup = function(email, username, password) {
    $.post( serverURI+"create", {

        email: email,
        username:username,
        password:password,
         headers: {
            "Origin" : "*",
            "Content-Type": "text/plain; charset=utf-8"
        }
    },function(result) {
    
        if (result.errmsg=="ok") {
            // store email and password to local storage
            $.jStorage.set("email", email);
               $.jStorage.set("token", result.token);
            $.jStorage.set("username", username);
            $.jStorage.set("password", password);
            document.location = 'index.html';
        } else {
            myApp.alert('Sign up failed!');
            mainView.loadPage('signup.html');
        }

    });
};
myApp.login = function(email, password) {
   
    console.info("login" + password);

     $.post( serverURI+"login", {

        email: email,
        password:password,
         headers: {
            "Origin" : "*",
            "Content-Type": "text/plain; charset=utf-8"
        }
    }, function(result) {
    
     if (result.errmsg=="ok") {
            $.jStorage.set("token", result.token);
            // store email and password to local storage
            $.jStorage.set("email", email);
            $.jStorage.set("password", password);
            document.location = 'index.html';
        } else {
            myApp.alert('cannot find the user');
            $.jStorage.deleteKey("email");
            $.jStorage.deleteKey("password");
            $('#email').val("");
            $('#password').val("");
            return;
        }
});
  };




myApp.logout = function() {
    $.ajax({
        type: 'POST',
        url: serverURI+"logout",
        async: false
    });
    /*
  $.post(serverURI + "logout", function (result) {
    // do nothing here now
  });
  */

    $.jStorage.deleteKey("email");
    $.jStorage.deleteKey("password");
    //mainView.loadPage('login.html');
    document.location = 'index.html';
}


myApp.addNewdalidy=function(title,date,text){
    var data={
        title:title,
        date:date,
        text:text
    }
    $.post(serverURI+"event/addNewdalidy",data,function(result){
      
        if (result.errmsg == 'ok') {

            document.location = 'index.html';

        } else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                myApp.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            myApp.alert("Add new task failed");
        }

    });
}
//
myApp.addTravel=function(title,address,time,text){

 var data={
        title:title,
        address:address,
     
        time:time,
        text:text
    }
$.post(serverURI+"event/addTravel",data,function(result){
        
        if (result.errmsg == 'ok') {

            document.location = 'index.html';

        } else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                myApp.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            myApp.alert("Add new task failed");
        }

    });



}
//
myApp.addNewTask = function(taskName, time,text) {
    $.post(serverURI+"event/createNewEvent", {
        title: taskName,
        time: time,
        text:text
    }, function(result) {

    
        if (result.errmsg == 'ok') {

            document.location = 'index.html';

        } else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                myApp.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            myApp.alert("Add new task failed");
        }

    });
}
function  dalidylist(){
    $('dalidy-refresh ul').empty();
       $.getJSON(serverURI+"event/dalidyList").done(function(data) {
    
        var statusCode = data.status;
        if (statusCode == undefined) {
            var ptrContent = $$('.dalidy-refresh');
            $.each(data, function() {
                var linkHTML = '<li event-id="' + this._id + '">' +
                                     '<label class="label-checkbox item-content">'+
                        '<input type="checkbox" onchange="setDone(this)" name="my-checkbox">'+
                        '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>'+
                        '<div class="item-inner">'+
                          '<div class="item-title-row">'+
                            '<div class="item-title">'+this.title+'</div>'+
                            '<div class="item-after">'+this.time+'</div>'+
                          '</div>'+
                          '<div class="item-subtitle">'+this.email+'</div>'+
                          '<div class="item-text">'+this.text+'</div>'+
                        
                        '</div>'+
                      '</label>'+
                    '</li>';
                ptrContent.find('ul').prepend(linkHTML);
            });

        } 
          else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                myApp.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            myApp.alert("Request faild!");
        }
});
   }
function getplanList() {
    $('.todo-refresh ul').empty();
  
    $.getJSON(serverURI+"event/planList").done(function(data) {
      
        var statusCode = data.status;
        if (statusCode == undefined) {
            var ptrContent = $$('.todo-refresh');
            $.each(data, function() {
                var linkHTML = '<li event-id="' + this._id + '">' +
                     '<label class="label-checkbox item-content">'+
        '<input type="checkbox" onchange="setP(this)" name="my-checkbox">'+
        '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>'+
        '<div class="item-inner">'+
          '<div class="item-title-row">'+
            '<div class="item-title">'+this.title+'</div>'+
            '<div class="item-after">'+this.text+'</div>'+
          '</div>'+
          '<div class="item-text">'+this.time+'</div>'+
        '</div>'+
      '</label>'+
                    '</li>';
                ptrContent.find('ul').prepend(linkHTML);
            });
        } 
        else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                myApp.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            myApp.alert("Request faild!");
        }

    });
}

function getTravelList() {
    $('.history-refresh ul').empty();
    $.getJSON(serverURI+"event/TravelList").done(function(data) {
        var statusCode = data.status;
        if (statusCode == undefined) {
            var ptrContent = $$('.history-refresh');
            $.each(data, function() {
                var linkHTML = 

                '<li event-id="' + this._id + '">' +
                     '<label class="label-checkbox item-content">'+
        '<input type="checkbox" onchange="setT(this)" name="my-checkbox">'+
        '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>'+
        '<div class="item-inner">'+
          '<div class="item-title-row">'+
            '<div class="item-title">'+this.title+'</div>'+
            '<div class="item-after">'+this.time+'</div>'+
          '</div>'+
          '<div class="item-subtitle">'+this.email+'</div>'+
          '<div class="item-text">'+this.text+'</div>'+
        '</div>'+
      '</label>'+
                    '</li>';
                ptrContent.find('ul').prepend(linkHTML);
            });
        } else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                myApp.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            myApp.alert("Request faild!");
        }

    });
}

myApp.signupCheck = function(email, username, password, password_cfm) {
    // check email format first
    if (!validateEmail(email)) {
        myApp.alert('Not a valid e-mail address.');
        return false;
    }

    // check password length
    if (password.length < 6) {
        myApp.alert('The length of password should be longer than 6.');
        return false;
    }

    // check password_cfm
    if (password != password_cfm) {
        myApp.alert('The password is not confirmed.');
        return false;
    }

    return true;

}

function validateEmail(email) {
    var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (re.test(email)) {
        return true;
    } else {
        return false;
       
    }
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + "-" + mm + '-' + dd;
    return today;
}

function genCurrentDatetime(date, time) {
    return date + " " + time;
}



function setDone(obj) {
     if (obj.checked) {
        var parent = $(obj).parent().parent();
        var eventId = parent.attr("event-id");
        var buttons = [
        {
            text: '删除',
            onClick: function () {
        $.post(serverURI + "event/setDondalidy", {
            eventId: eventId
        }, function(result) {
            if (result.errmsg == 'ok') {
                document.location = 'index.html';
            } else {
                myApp.alert('Sign up failed!');
               
            }

        });
            }
        },
        {
            text: '查看',
            onClick: function () {
                var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p>查看日记详情</p>'+
                      '<p><a href="#" class="close-popup">Close me</a></p>'+
                    '</div>'+
                  '</div>'
  myApp.popup(popupHTML);

            }
        },
        {
            text: 'Cancel',
            color: 'red',
            onClick: function () {
            
            }
        },
    ];
   
      
    } else {
        myApp.alert("not checked");
    }
     myApp.actions(buttons);


}



function setT(obj) {
      myApp.confirm('确定删除?', '行程', function () {
     
    if (obj.checked) {
        var parent = $(obj).parent().parent();
        var eventId = parent.attr("event-id");

        $.post(serverURI + "event/setTravely", {
            eventId: eventId
        }, function(result) {
            if (result.errmsg == 'ok') {
                document.location = 'index.html';
            } else {
                myApp.alert('Sign up failed!');
               
            }

        });
    } else {
        myApp.alert("not checked");
    }
});
}
 function setP(obj){
     myApp.confirm('确定删除?', '计划', function () {
     
  
    if (obj.checked) {
        var parent = $(obj).parent().parent();
        var eventId = parent.attr("event-id");

        $.post(serverURI + "event/setP", {
            eventId: eventId
        }, function(result) {
            if (result.errmsg == 'ok') {
                document.location = 'index.html';
            } else {
                myApp.alert('Sign up failed!');
               
            }

        });
    } else {
        myApp.alert("not checked");
    }



    
});
 
   }

