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
        
        initGoogleMap();
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




//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//google map
var map;
var infowindow;

function initGoogleMap(){
    var latlong=new google.maps.LatLng(1.542160222923056 , 103.80120195144707);
    
    var mapOptions={
        center:latlong,
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeControl: false,
    };
    
    map=new google.maps.Map(document.getElementById("geolocation"), mapOptions);
    
    var mID=getUrlParameter("mID");
    getBranchList(mID);
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(onSucccessGetPosition, onErrorGetPosition,{timeout: 10000, enableHighAccuracy: true});    
//    }
}

function markPosition(addresses, name){
//    var latitude=position.coords.latitude;
//    var longitude=position.coords.longitude;
    var latlong=new google.maps.LatLng(1.542160222923056 , 103.80120195144707);
    
    var mapOptions={
        center:latlong,
        zoom:8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeControl: false,
    };

    map=new google.maps.Map(document.getElementById("geolocation"), mapOptions);
    var geocoder = new google.maps.Geocoder(); 
    infowindow = new google.maps.InfoWindow();
                    
    for (var x = 0; x < addresses.length; x++) {
        (function(){
            var address=addresses[x];
            var branchname=name[x];
//            alert(address);
            geocoder.geocode({address:address}, function(results,status){ 
                if (status == google.maps.GeocoderStatus.OK) {
                    var p = results[0].geometry.location;
                    var lat=p.lat();
                    var lng=p.lng();
                    createMarker(address,lat,lng, branchname);
                }
            });
                    
        })(addresses[x], name[x]);
    }
}

function createMarker(add,lat,lng, name) {
    var contentString = name;
    var latlong = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
        position: latlong,
        map: map,
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
    });
}