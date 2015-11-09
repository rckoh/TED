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


function nextonclick(){
    var phoneno=$("#phoneno").val();
    phoneno="60"+phoneno;
    
    if(phoneno==""){
        alert("Please enter phone no.");
    }
    else if(phoneno.length<7){
        alert("Invalid phone no.");
    }
    else{
        alert("SMS the activation code (TAC) to your mobile number +"+phoneno+".");
        registerStepOne(phoneno);
    }
}

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
