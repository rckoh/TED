var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    initPushNotificationRegister: function(){
        var pushNotification = window.plugins.pushNotification;
        
        
        if ( device.platform == 'android' || device.platform == 'Android'){
            pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"165573687429","ecb":"app.onNotificationGCM"});
        } 
        else {
            pushNotification.register(app.tokenHandler,app.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }

    },
    
    // result contains any message sent from the plugin call
    successHandler: function(result) {
//        alert('Callback Success! Result = '+result);
    },
    
    errorHandler:function(error) {
//        alert(error);
    },
    
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
//                $("#redidtxtareas").val(e.regid);
                if ( e.regid.length > 0 )
                {
                    dbmanager.checkFirstRun(function(returnData){
                        if(returnData.rows.length==0){
                            postDeviceInfo("new", e.regid);
                        }    
                    });
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
//              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
//              alert('An unknown GCM event has occurred');
              break;
        }
    },
    
    tokenHandler: function(result) {
        // Your iOS push server needs to know the token before it can push to this device
        // here is where you might want to send it the token for later use.
        dbmanager.checkFirstRun(function(returnData){
            if(returnData.rows.length==0){
                postDeviceInfo("new", result);
            }    
        });
    },
    
    onNotificationAPN: function(event) {
        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
            pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
        }
    }
};

function login(){
    var username=$("#username").val();
    var pwd=$("#pwd").val();
    
    if(username.length==0)
        alert("Please enter username");
    else if(pwd.length==0)
        alert("Please enter pwd");
    else   
        postLogin(username, pwd);
}

function fbLogin(){
    var permission=["public_profile"];
    var fbLoginSuccess = function (userData) {
        facebookConnectPlugin.api(userData.userID+"/?fields=id,email,name", permission,
        function (result) {
            alert("Result: " + JSON.stringify(result));
            /* alerts:
                {
                    "id": "000000123456789",
                    "email": "myemail@example.com"
                }
            */
        },
        function (error) {
            alert("Facebook login failed: " + JSON.stringify(error));
        });
//        alert("UserInfo: " + JSON.stringify(userData));
//        window.location="home.html";
    }
                
    facebookConnectPlugin.login(permission, 
                                fbLoginSuccess, 
                                function (error) { alert("fail login with fb " + error)}
                               );
}

function onPrompt(results) {
//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    if(results.buttonIndex==1)
    {
        if(results.input1.length==0)
            alert("Phone number invalid");
        else
            postForgotPwd(results.input1);
    }
}

function loginClickForgotPwd(){
    navigator.notification.prompt(
    'Please enter your phone number (example "60171237654")',  // message
    onPrompt,                  // callback to invoke
    'Forgot Password',            // title
    ['Ok','Exit'],             // buttonLabels
    'Phone Number'                 // defaultText
    );
}
