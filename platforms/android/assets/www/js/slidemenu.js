//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//init slide menu
var slideMenu = {
    
    initSlideMenu: function(){
        $("#slidemenu").append("<li onclick='aboutUsOnClick();'><div class='itemlabel'>About Us</div></li>");
        $("#slidemenu").append("<li onClick='forgotPwdOnClick();'><div class='itemlabel'>Forgot Password</div></li>");
        $("#slidemenu").append("<li onclick='logoutOnClick();'><div class='itemlabel'>Logout</div></li>");
    },    
}




//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//add slide menu event to control

$(function(){
	
	$("button.buttonbg").click(function(){
		if(menuStatus != true){				
			$(".menubg").animate({
                marginLeft: "0px",}, 300, function() {
                    menuStatus = true; 
            });
            
		  	return false;
		  } 
        else {
			$(".menubg").animate({
			marginLeft: "-50%",
		  }, 300, function(){menuStatus = false;});
              
			return false;
        }
});
    
//	$("body").on("swipeleft", function(){
//		if (menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "-70%",
//		  }, 300, function(){menuStatus = false});
//		  }
//	});
//	
//	$("body").on("swiperight", function(){
//		if (!menuStatus){	
//		$(".menubg").animate({
//			marginLeft: "0%",
//		  }, 300, function(){menuStatus = true});
//		  }
//	});
//	
//	$("#menu li a").click(function(){
//		var p = $(this).parent();
//		if($(p).hasClass('active')){
//			$("#menu li").removeClass('active');
//		} else {
//			$("#menu li").removeClass('active');
//			$(p).addClass('active');
//		}
//	});
});


function clickmenubutton(){
    if(menuStatus != true){				
        $(".menubg").animate({
        marginLeft: "0px",}, 300, function() {
        menuStatus = true; 
        });
            
        return false;
    } 
    else {
        $(".menubg").animate({
            marginLeft: "-50%",
		  }, 300, function(){menuStatus = false;
        });
              
        return false;
    }
}
//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
//slide menu item onclick
function aboutUsOnClick(){
    clickmenubutton();
    
    $(".app").append("<div class='aboutUsBg'><div class='aboutUsContent'><div class='aboutUsHeader'><button class='aboutUsTitle'>THE ENTERTAINMENT DIRECTORY</button><button class='aboutUsCloseBtn' onclick='closeAboutUs();'><img src='img/x.png'/></button></div><div class='aboutUsDetails'><div class='aboutUsAppLogoFrame'><img class='aboutUsAppLogo' src='img/logo.png'/></div><div class='aboutUsInfo'><h1>THE ENTERTAINMENT DIRECTORY</h1><br><div><img src='img/address.png'/><p>15, Jalan Dato  Yunus 3, Kawasan Perindustrian Dato Yunus Sulaiman, 81120 Lima Kedai, Gelang Patah, Johor.</p></div><div><img src='img/email.png'/<p>alantan.ted@hotmail.com  </p></div><div><img src='img/phone.png'/><p>+6012 733 3289</p></div></div></div></div></div>");
    
    $(".aboutUsAppLogo").load(function(){
        var marginleft=$(".app").width()/2-$(".aboutUsAppLogo").width()/2;
        $(".aboutUsAppLogo").css("margin-left", marginleft);
        $(".aboutUsAppLogo").show();
    });
}

function closeAboutUs(){
    $(".aboutUsBg").remove();
}

function logoutOnClick(){
    navigator.notification.confirm("Are you sure you want to logout now?", onConfirm, "Logout", "Logout,Cancel");     
}

function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        return; 
    }else{
        deleteProfile();
    }
}

function deleteProfile() {
    var db = window.openDatabase("Database", "1.0", "ESLN", 200000);
    db.transaction(runDeleteProfile, errorDeleteProfile, successDeleteProfile);
}

function runDeleteProfile(t){
    t.executeSql('DELETE FROM PROFILE');
}

function errorDeleteProfile(err){
    loading.endLoading();
    navigator.notification.alert("Logout failed.", function(){}, "myTed", "Ok");
}

function successDeleteProfile(){
    loading.endLoading();
    navigator.notification.alert("Logout succesfully", function(){}, "myTed", "Ok");
    window.location="index.html";
}

function forgotPwdOnClick(){
    dbmanager.getProfile(function(returnData){
        var email=returnData.rows.item(0).EMAIL;
        navigator.notification.confirm("Email will be sent to "+email+" for you to set new password. Click ok to proceed", onForgotPasswordConfirm, "Forgot Password", "Cancel,Ok");     
    });
}

function onForgotPasswordConfirm(button) {
    if(button==1){//If User selected No, then we just do nothing
        return; 
    }else{
        clickmenubutton();
        dbmanager.getProfile(function(returnData){
            postForgotPwd(returnData.rows.item(0).PHONE);
        });
    }
}
//----------------------------------------------------------
//----------------------------------------------------------
//----------------------------------------------------------
