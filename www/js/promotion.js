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

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//subheader

var currentpage=1;
function changepage(pagenumber){
    if(pagenumber==1 && currentpage!=pagenumber){
        $(".pageone").show();
        $(".pagetwo").hide();
        $(".pagethree").hide();
        
        if(currentpage>pagenumber){
            $(".pageone").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pageone").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "0%",}, 300, function() {currentpage=1;});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagethree").animate({
                marginLeft: "200%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
    }
    
    if(pagenumber==2 && currentpage!=pagenumber){
        
        $(".pageone").hide();
        $(".pagetwo").show();
        $(".pagethree").hide();
        
        if(currentpage>pagenumber){
            $(".pagetwo").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagetwo").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "-100%",}, 300, function() {});
        $(".pagetwo").animate({
                marginLeft: "0%",}, 300, function() {currentpage=2;});
        $(".pagethree").animate({
                marginLeft: "100%",}, 300, function() {});
        
        $(".selectedItem").animate({
                marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError);    
        
    }
    
    if(pagenumber==3 && currentpage!=pagenumber){
        $(".pageone").hide();
        $(".pagetwo").hide();
        $(".pagethree").show();
        
        
        if(currentpage>pagenumber){
            $(".pagethree").css("marginLeft", "-100%");
        }
        
        if(currentpage<pagenumber){
            $(".pagethree").css("marginLeft", "100%");
        }
        
        $(".pageone").animate({
                marginLeft: "200%",}, 300, function() {});
        $(".pagetwo").animate({
                marginLeft: "100%",}, 300, function() {});
        $(".pagethree").animate({
                marginLeft: "0%",}, 300, function() {currentpage=3;});
        
        $(".selectedItem").animate({
                marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
    }
}

function pageSwipeLeft(){
    if(!menuStatus){
        if(currentpage==1){
            $(".pageone").hide();
            $(".pagetwo").show();
            $(".pagethree").hide();

            $(".pagetwo").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
        }
        else if(currentpage==2){
             $(".pageone").hide();
            $(".pagetwo").hide();
            $(".pagethree").show();

            $(".pagethree").css("marginLeft", "100%");

            $(".pageone").animate({
                    marginLeft: "200%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagethree").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=3;});

            $(".selectedItem").animate({
                    marginLeft: "67.25%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
            
        }    
    }
    else{
    	$("body").on("swipeleft", function(){
            if (menuStatus){	
            $(".menubg").animate({
                marginLeft: "-70%",
              }, 300, function(){menuStatus = false});
              }
        });
    }
}

function pageSwipeRight(){
    
    if(!menuStatus){
        if(currentpage==3){
            $(".pageone").hide();
            $(".pagetwo").show();
            $(".pagethree").hide();

            $(".pagetwo").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "-100%",}, 300, function() {});
            $(".pagetwo").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=2;});
            $(".pagethree").animate({
                    marginLeft: "100%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "32.75%",}, 300, function() {$(".selectedItem").css("width", "34.5%");});
            
        }
        else if(currentpage==2){
            $(".pageone").show();
            $(".pagetwo").hide();
            $(".pagethree").hide();

            $(".pageone").css("marginLeft", "-100%");

            $(".pageone").animate({
                    marginLeft: "0%",}, 300, function() {currentpage=1;});
            $(".pagetwo").animate({
                    marginLeft: "100%",}, 300, function() {});
            $(".pagethree").animate({
                    marginLeft: "200%",}, 300, function() {});

            $(".selectedItem").animate({
                    marginLeft: "0%",}, 300, function() {$(".selectedItem").css("width", "32.75%");});
        
        }
    }
}

function initPromoList(){
    var mid=getUrlParameter("mID");
    getMerchantPromoList(mid);
}
