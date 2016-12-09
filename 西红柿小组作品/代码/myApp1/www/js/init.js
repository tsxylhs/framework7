
var fw7 = new Framework7({
	animateNavBackIcon: true,
	cache: false,
	cacheDuration: 1000,
	sortable: false,

});

function isDateInRange(begin,end,current) {
	if (current >= begin && current <= end) {
		return true;
	} else {
		return false;
	}
}
function pad(n) {
	return (n < 10) ? ("0" + n) : n;
}


(function() {

	window.init = function(params) {
	
		this.params = {
			modern : {
				enabled: false,			// Default: false
				swipeToDelete: false,	// Default: true
				swipeToDeleteLimit: 100	// Default: 100
			},
			swipeToDelete: false,
			lastSlideValue: 0,
			slideClosing: false
		}
		var progress = 0;


var serverURI='http://120.77.46.61:8888/'





this.signup = function(email, username, password) {
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
           	$('#user-label').html($.jStorage.get("email")).removeAttr("data-i18n");
          		fw7.closeModal(".popup-login");
        } else {
              $.jStorage.deleteKey("email");
            $.jStorage.deleteKey("password");
            $('#email').val("");
            $('#password').val("");
            return;
        }

    });
};


this.login = function(email, password) {

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
          	$('#user-label').html($.jStorage.get("email")).removeAttr("data-i18n");
          		fw7.closeModal(".popup-login");
        } else {
           alert('cannot find the user');
            $.jStorage.deleteKey("email");
            $.jStorage.deleteKey("password");
            $('#email').val("");
            $('#password').val("");
            return;
        }
});
  };


this.signupCheck = function(email, username, password, password_cfm) {
    // check email format first
    if (!validateEmail(email)) {
       alert('Not a valid e-mail address.');
        return false;
    }

    // check password length
    if (password.length < 6) {
     alert('The length of password should be longer than 6.');
        return false;
    }

    // check password_cfm
    if (password != password_cfm) {
       alert('The password is not confirmed.');
        return false;
    }

    return true;

}







this.addNewdalidy=function(title,date,text){
    var data={
        title:title,
        date:date,
        text:text
    }
    $.post(serverURI+"event/addNewdalidy",data,function(result){
      
        if (result.errmsg == 'ok') {

            document.location = 'index.html';

        } 
        else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
               init1.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('index.html');
            }
        } else {
            alert("Add new task failed");
        }

    });
}


		

		

		this.rebindUserPanel = function() {
			$('#user-label').off("click");
			$('#user-label').on("click", function() {
				var clickedLink = this;
				var buttons = [
				{
						text: 'Sign off',
						bold: true,
						onClick: function () {
	 						$.jStorage.deleteKey("email");
                            $.jStorage.deleteKey("password");
					
						$('#user-label').attr("data-i18n","NOT_SIGNED_IN").html("未登录");
							
							/* $('body').i18n(); */
						}
				}];
				var buttons2 = [
				{
						text: 'Cancel',
						red: true,
						color: "red",
						onClick: function () {
						}
				}];
			
				if ($.jStorage.get("email")!=null) {
					if (fw7.device.iphone) {
						
						fw7.actions([buttons, buttons2]);

					} else {
						fw7.popover(".popover-usercp", clickedLink);
					}
				} else {
					fw7.popup(".popup-login");
				}
			});

		};



this.addNewTask = function(taskName, time,text) {
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
                init1.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('index.html');
            }
        } else {
            alert("Add new task failed");
        }

    });
}







this.addTravel=function(title,address,time,text){

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
                init1.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('index.html');
            }
        } else {
            alert("Add new task failed");
        }

    });



}
		

		
		this.changeDesign = function(key) {
			var settingsTheme = $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))) != null ? $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))) : "default";
			var settingsTint = $.parseJSON(JSON.stringify(fw7.formGetData("form-tint"))) != null ? $.parseJSON(JSON.stringify(fw7.formGetData("form-tint"))) : "blue";
			switch (key) {
				case "theme":
					$('body').removeClass("layout-dark layout-white").addClass("layout-"+settingsTheme.theme).attr("data-theme", settingsTheme.theme);
					if (settingsTheme.theme == "dark") {
						$("meta[name='apple-mobile-web-app-status-bar-style']").removeAttr("content");
					} else {
						$("meta[name='apple-mobile-web-app-status-bar-style']").attr("content","black-translucent");
					}
					break;
				case "tint":
					$('body').removeClass("theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray").addClass("theme-"+settingsTint.tint).attr("data-color", settingsTint.tint);
					break;
				case "init":
					$('body').removeClass("layout-dark layout-white").addClass("layout-"+settingsTheme.theme).attr("data-theme", settingsTheme.theme);
					$('body').removeClass("theme-white theme-black theme-yellow theme-red theme-blue theme-green theme-pink theme-lightblue theme-orange theme-gray").addClass("theme-"+settingsTint.tint).attr("data-color", settingsTint.tint);
					break;
				default: break;
			}
		};
	
		
	
		this.applyModernMode = function(callback) {
			$('#modernStatus').html(component.params.modern.enabled.toString());
			$('form#switch-ios8 li#switchSwipeout.disabled').removeClass("disabled");
			var c = callback;
			if (component.params.modern.enabled) {
				$('body').addClass("ios8");
				$('.swipeout-content').css("-webkit-transform","translate3d(0,0,0)");
				$$('.swipeout').on("swipeout", function(e) {
					var elThis = $(this);
					var el = $(this).children(".swipeout-actions").children(".swipeout-actions-inner");
					if (component.params.modern.enabled) {
					if (e.detail.progress.toFixed(3) > component.params.lastSlideValue || e.detail.progress.toFixed(3) < component.params.lastSlideValue || component.params.slideClosing) {
						component.params.lastSlideValue = e.detail.progress.toFixed(3);
							//console.log(component.params.lastSlideValue);
						if (Math.round(e.detail.progress*100) < component.params.modern.swipeToDeleteLimit) {
							var matrix = elThis.children(".swipeout-content").css('-webkit-transform');
							var values = matrix.match(/-?[0-9\.]+/g);
		
							component.params.swipeToDelete = false;
							for (var i=el.children("a").length; i>0; i--) {
								el.children("a:nth-child("+i+")").css({
									"-webkit-transition": "-webkit-transform 0ms",
									"-webkit-transform": "translate3d("+ (parseInt(values[4])+(80*el.children("a").length))/el.children("a").length*((el.children("a").length+1)-i) +"px,0,0)"
								});
							}
							el.children("a:last-child").children("div").css({
								"-webkit-transform": "translate3d(0,0,0)"
							});
	
						} else if (component.params.modern.swipeToDelete) {
							component.params.swipeToDelete = true;
							var matrix = elThis.children(".swipeout-content").css('-webkit-transform');
							var values = matrix.match(/-?[0-9\.]+/g);
							el.children("a").addClass("no-transition").css({
								"-webkit-transform": "translate3d("+(parseInt(values[4])+(80*el.children("a").length))+"px,0,0)"
							});
							el.children("a:last-child").children("div").css({
								"-webkit-transform": "translate3d(-"+(el.children("a").length-1)+"00%,0,0)"
							});
						} else {
							var matrix = elThis.children(".swipeout-content").css('-webkit-transform');
							var values = matrix.match(/-?[0-9\.]+/g);
		
							component.params.swipeToDelete = false;
							for (var i=el.children("a").length; i>0; i--) {
								el.children("a:nth-child("+i+")").css({
									"-webkit-transition": "-webkit-transform 0ms",
									"-webkit-transform": "translate3d("+ (parseInt(values[4])+(80*el.children("a").length))/el.children("a").length*((el.children("a").length+1)-i) +"px,0,0)"
								});
							}
							el.children("a:last-child").children("div").css({
								"-webkit-transform": "translate3d(0,0,0)"
							});
						}
					}
					}
				});
				$$('.swipeout').on("open", function() {
					var elThis = $(this);
					var el = $(this).children(".swipeout-actions").children(".swipeout-actions-inner");
					if (component.params.modern.enabled) {
						el.children("a").removeClass("no-transition").addClass("swipeout-open").css({
							"-webkit-transition":"",
							"-webkit-transform":""
						});
						if (component.params.swipeToDelete) {
							component.params.swipeToDelete = false;
							component.params.lastSlideValue = 0;
							component.params.slideClosing = true;
							fw7.swipeoutDelete(elThis);
							if (callback == "open" || callback == "closed") {
								var issueID = parseInt($(this).closest(".swipeout").children(".swipeout-content").children(".issueID").html());
								var bugObject = bugsStorage[issueID-1];
								bugObject.status = callback;
								bugsStorage[issueID-1] = bugObject;
								localStorage.bugsData = JSON.stringify(bugsStorage);
								$$('.swipeout').on("deleted", function() {
									$(this).closest(".list-block").remove();
									if ($('.page.on-center').children("div.list-block").length < 1) {
										$('.page-content.bug-no-bg').addClass("bug-bg");
									}
								});
							} else if (callback == "deleted") {
								var issueID = parseInt($(this).closest(".swipeout").children(".swipeout-content").children(".issueID").html());
								var bugObject = bugsStorage[issueID-1];
								var index = bugsStorage.indexOf(bugObject);
								$$('.swipeout').on("deleted", function() {
									$(this).closest(".list-block").remove();
									if ($('.page.on-center').children("div.list-block").length < 1) {
										$('.page-content.bug-no-bg').addClass("bug-bg");
									}
								});
								if (index > -1) {
									bugsStorage.splice(index, 1);
									localStorage.bugsData = JSON.stringify(bugsStorage);
								}

							}

							if (callback == "deleted") {
								var index = bugsStorage.indexOf(bugObject);
								if (index > -1) {
									bugsStorage.splice(index, 1);
									localStorage.bugsData = JSON.stringify(bugsStorage);
								}
							}


						}
					}
				});
				$$('.swipeout').on("close", function() {
					var elThis = $(this);
					var el = $(this).children(".swipeout-actions").children(".swipeout-actions-inner");
					if (component.params.modern.enabled) {
						for (var i=el.children("a").length; i>0; i--) {
							el.children("a:nth-child("+i+")").css({
								"-webkit-transition": "",
								"-webkit-transform": "translate3d("+(100*(el.children("a").length-i)+100)+"%,0,0)"
							});
						}
						component.params.lastSlideValue = 0;
						component.slideClosing = false;
					}
				});
			}
		}
		this.removeModernMode = function() {
			this.params.modern.enabled = false;
			$('#modernStatus').html(component.params.modern.enabled.toString());
			$('form#switch-ios8 li#switchSwipeout').addClass("disabled");
			var el = $('.swipeout').children(".swipeout-actions").children(".swipeout-actions-inner");
			el.children("a").css("-webkit-transform","");
			$('body').removeClass("ios8");
		};
	
		
		if (this.params.modern.enabled) {
			$('body').addClass("ios8");
		}

		timedTheme = setInterval(function() {
			var timedThemeSwitch = fw7.formGetData("form-theme") != undefined ? $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme : [];
			
			var timedThemeMinHours = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttbegin.slice(0,2)) : 22;
			var timedThemeMinMinutes = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttbegin.slice(3)) : 0;
			
			var timedThemeMaxHours = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttend.slice(0,2)) : 7;
			var timedThemeMaxMinutes = fw7.formGetData("timed-theme-schedule") != undefined ? parseInt($.parseJSON(JSON.stringify(fw7.formGetData("timed-theme-schedule"))).ttend.slice(3)) : 0;
			
			$('li#schedule div.item-after').html(pad(timedThemeMinHours)+":"+pad(timedThemeMinMinutes)+"<br>"+pad(timedThemeMaxHours)+":"+pad(timedThemeMaxMinutes));
			
			if (timedThemeSwitch.length != 0) {
				$('ul#themes').parent().addClass("disabled");
				$('li#schedule').removeClass("disabled");
				
				var currentDate = new Date();
				var beginDate = new Date();
				beginDate.setHours(timedThemeMinHours);
				beginDate.setMinutes(timedThemeMinMinutes);
				beginDate.setSeconds(0);
					
				var endDate = new Date();
				endDate.setHours(timedThemeMaxHours);
				endDate.setMinutes(timedThemeMaxMinutes);
				endDate.setSeconds(0);
					
				if (endDate < beginDate) {
					if (currentDate < endDate) {
						beginDate.setDate(beginDate.getDate()-1);
						endDate.setDate(endDate.getDate()-1);
					}
					endDate.setDate(endDate.getDate()+1);
				}
				if (isDateInRange(beginDate,endDate,currentDate)) {
					$('body').removeClass("layout-dark layout-white").addClass("layout-dark").attr("data-theme", "dark");
					fw7.formStoreData("form-theme", {
						"theme":"dark",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
					fw7.formFromJSON('#form-theme', {
						"theme":"dark",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
				} else {
					$('body').removeClass("layout-dark").attr("data-theme", "default");
					fw7.formStoreData("form-theme", {
						"theme":"default",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
					fw7.formFromJSON('#form-theme', {
						"theme":"default",
						"switchTimedTheme": $.parseJSON(JSON.stringify(fw7.formGetData("form-theme"))).switchTimedTheme
					});
				}
			} else {
				$('ul#themes').parent().removeClass("disabled");
				$('li#schedule').addClass("disabled");
			}
		}, 100);
	}
})();

var fw7 = new Framework7();
var $$ = Dom7;
var timedTheme;
var init1 = new init();

var bugsStorage = localStorage.bugsData ? JSON.parse(localStorage.bugsData) : [];

var mainView = fw7.addView('.view-main', {
	dynamicNavbar: true
});
var loginView = fw7.addView('.view-login', {
	dynamicNavbar: true
});
var gettingStartedView = fw7.addView('.view-getting-started', {
	swipeBackPages: false
});

window.addEventListener('load', function (e) {
	
}, false);

$(document).ready(function() {
	$.ajaxSetup({ cache: false });

	init1.rebindUserPanel();
	init1.changeDesign("init");
		if (!localStorage.doneTutorial) {
		fw7.popup(".popup-getting-started");
	}
	
});
var serverURI='http://120.77.46.61:8888/'


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
                init1.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
           alert("Request faild!");
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
               init1.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
           alert("Request faild!");
        }

    });
}




function setDone(obj) {
	
     if (obj.checked) {
       
        var eventId = obj;
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
               alert('Sign up failed!');
               
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
  fw7.popup(popupHTML);

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
       alert("not checked");
    }
     fw7.actions(buttons);


}



function setT(obj) {
     fw7.confirm('确定删除?', '行程', function () {
     
    if (obj.checked) {
        var parent = $(obj).parent().parent();
        var eventId = parent.attr("event-id");

        $.post(serverURI + "event/setTravely", {
            eventId: eventId
        }, function(result) {
            if (result.errmsg == 'ok') {
                document.location = 'index.html';
            } else {
               alert('Sign up failed!');
               
            }

        });
    } else {
     alert("not checked");
    }
});
}
 function setP(obj){
    fw7.confirm('确定删除?', '计划', function () {
     
  
    if (obj.checked) {
        var parent = $(obj).parent().parent();
        var eventId = parent.attr("event-id");

        $.post(serverURI + "event/setP", {
            eventId: eventId
        }, function(result) {
            if (result.errmsg == 'ok') {
                document.location = 'index.html';
            } else {fw7alert('Sign up failed!');
               
            }

        });
    } else {
             alert("not checked");
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
                var linkHTML = /*'<li event-id="' + this._id + '">' +
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
                    '</li>'*/
'<li class="swipeout">'+
  '<div class="swipeout-content">'+
    '<a href="#" class="item-content item-link">'+
      '<div class="item-inner">'+
        '<div class="item-title-row">'+
          '<div class="item-title">'+this.title+'</div>'+
          '<div class="item-after">'+this.time+'</div>'+
        '</div>'+
        '<div class="item-subtitle">'+this.email+'</div>'+
        '<div class="item-text">'+this.text+'</div>'+
      '</div>'+
    '</a>'+
  '</div>'+
  '<div class="swipeout-actions-left">'+
    '<a href="#" class="swipeout-overswipe bg-green reply">Reply</a>'+
    '<a href="#" class="bg-blue forward">Forward</a>'+
  '</div>'+
  '<div class="swipeout-actions-right">'+
    '<a href="#" class="mark bg-orange">Mark</a>'+
    '<a href="#" class="swipeout-delete swipeout-overswipe"  onclick="setDone(' + this._id + ')"  >Delete</a>'+
  '</div>'+
'</li>';
                ptrContent.find('ul').prepend(linkHTML);
            });

        } 
          else if (statusCode == 401) { // unlogin
            var email = $.jStorage.get("email");
            var password = $.jStorage.get("password");
            if (email && password) {
                // auto login with local storage data
                init1.login(email, password);
                //TODO: should continue current getJson request, but I won't make it now
            } else {
                // redirect to login page
                mainView.loadPage('login.html');
            }
        } else {
            alert("Request faild!");
        }
});
   }



function genCurrentDatetime(date, time) {
    return date + " " + time;
}






fw7.onPageBeforeAnimation('settings', function () {	
	$$('.save-button').on("click", function() {
		fw7.alert("Error: The SQL database could not be contacted. Form data has been saved locally.","SQL Database Error");
	});
	
	

});

fw7.onPageAfterAnimation('settings-theme', function() {
	$('form#form-theme li').on("click", function() {
		setTimeout(function() {
			init1.changeDesign("theme");
		}, 10);
	});

});


fw7.onPageInit('addNewdalidy',function(){
	var calendarDefault = fw7.calendar({
    input: '#calendar-default',
});   
	$$('.submitBtn1').on('click', function() {
     
    var title = $('#dalidy-name').val();
    var date = $('#calendar-default').val();
    var text = $('#text-dalidy').val();

    init1.addNewdalidy(title,date,text);

});
})
fw7.onPageInit('newfree',function(){

var calendarRange = fw7.calendar({
    input: '#calendar-range',
    dateFormat: 'M dd yyyy',
    rangePicker: true
});

	$$('.submitBtn2').on('click',function(){
    var title=$('#title-picker').val();
    var address=$('#address-picker').val();
    var date=$('#calendar-range').val();
    var time1=$('#picktime').val();
    var text=$('#text1-picker').val();

       var time=genCurrentDatetime(date, time1)
          
            init1.addTravel(title,address,time,text);
});

})

fw7.onPageInit('newplan',function(){
	$$('.submitBtn').on('click', function() {
    var task = $('#task-name').val();
   
    var time = $('#pickdate').val();
    var text = $('#text-picker').val();

    init1.addNewTask(task,time,text);

 
});

})


fw7.onPageInit('dalidy',function(){
var dalidy=$$('.dalidy-refresh');
  dalidy.on('refresh',function(){
   dalidylist();
     fw7.pullToRefreshDone()
 $$('.mark').on('click', function () {
  myApp.alert('Mark');
});
$$('.reply').on('click', function () {
  myApp.alert('Reply');
});
$$('.forward').on('click', function () {
  myApp.alert('Forward');
}); 
   
})
})

fw7.onPageInit('plan',function(){
	var ptrContent = $$('.todo-refresh');
	ptrContent.on('refresh', function(e) {
    getplanList();
   fw7.pullToRefreshDone()
   
  
});


})
fw7.onPageInit('free',function(){
	var historyContent=$$('.history-refresh');
		historyContent.on('refresh',function(){
     getTravelList();
       fw7.pullToRefreshDone()
    
})
})

fw7.onPageInit('settings-tint', function() {
	$('form#form-tint li').on("click", function() {
		setTimeout(function() {
			init1.changeDesign("tint");
		}, 10);
	});
});





 $.ajaxSetup({
    data: {
      //为请求设置默认值
        "token": $.jStorage.get("token"),
        "email": $.jStorage.get("email")
    },
    type: "POST"
});


if ($.jStorage.get("email")!=null) {
    $$('#user-label').text($.jStorage.get("email"));
 
 /*     dalidylist();
    getplanList();
    getTravelList();*/
} else {
  
}

function validateEmail(email) {
    var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (re.test(email)) {
        return true;
    } else {
        return false;
       
    }
}





$$('.logout-button').on("click", function() {

	$('#user-label').attr("data-i18n","NOT_SIGNED_IN").html("已退出");
	$.jStorage.deleteKey("email");
   $.jStorage.deleteKey("password");
});




   $$('.signin-button').on('click', function() {
            var email = $('#username').val();
      
            if (!validateEmail(email)) {
               alert("邮箱格式不正确!");
                $('#email').val("");
                $('#password').val("");
                return;
            }
            var password = $('#password').val();
           init1.login(email, password);
        });

         
    
        $$('.signup-button').on('click', function() {
        	
            var email = $('#username').val();
            var username = $('#username').val();
            var password = $('#password').val();
            var password_cfm = $('#password').val();
            if (init1.signupCheck(email, username, password, password_cfm)) {
                init1.signup(email, username, password);
            }

        });
    
