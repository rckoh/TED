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
    }
};


function onPrompt(results) {
    if(results==2)
    {
        window.location="index.html";
    }
}

function closeRegister(){
    navigator.notification.confirm("Are you sure you want to exit ?", 
                                   onPrompt, 
                                   "Registration", 
                                   "Cancel,Quit");     
}

function submitReg(){
    var password=$("#pwd").val();
    var confirmpassword=$("#confirmpwd").val();
    var tacno=$("#tacno").val();
    var name=getUrlParameter("name");
    var email=getUrlParameter("email");
    var phoneno=getUrlParameter("phoneno");
    
    if(password==""){
        alert("Please enter password.");
    }
    else if(password.length<6){
        alert("Password must be at least 6 characters");
    }
    else if(password!=confirmpassword){
        alert("Password is not match.");
    }
    else if(tacno==""){
        alert("Please enter tac no.");
    }
    else if($("#termsCheckBox")[0].checked==false){
        alert("You must accept the terms and conditions to register.");
    }
    else{
        registerStepThree(name, email, phoneno, tacno, password);
    }
}

