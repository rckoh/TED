var webUrl = "http://cloud.projeksistematik.com.my/ted_app/sch/searchdata.aspx";
//var webApiUrl = "http://192.168.1.19/mobile_rewards_api/";
var webApiUrl = "http://cloud.projeksistematik.com.my/ted_api/";
//var webUrl = "http://192.168.1.19/MOBILE_REWARDS_APP/sch/searchdata.aspx";
var apiTimeout=20000;
var sha1Key="8809377";
var fbPhotoList=[];
var appV="1.0.0";
var accessToken='521613448006826|121e97ebec02027ad471542a599f351e';//facebook access token
var fbUrl="https://graph.facebook.com/";

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//post device info
function postDeviceInfo(infoType, rid){
    
    var webApiClass=webApiUrl+"api/device/new";
    var deviceId,deviceName, registrationId, imeiNo, appVersion,osVersion;
    
    deviceId=device.uuid;
    deviceName=device.model;
    registrationId=rid;
    imeiNo=device.uuid;
    appVersion=appV;
    osVersion=device.version;

    var valueStr=deviceId+deviceName+registrationId+imeiNo+appVersion+osVersion+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: webApiClass,
      type: "POST",
      data:"deviceId="+deviceId+"&deviceName="+deviceName+"&registrationId="+registrationId+"&imeiNo="+imeiNo
        +"&appVersion="+appVersion+"&osVersion="+osVersion+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;   

          storeFirstRun();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
//          alert("failed connect to server"+xhr.responseText);
        }
    })
}

function storeFirstRun() {
    var db = window.openDatabase("Database", "1.0", "TED", 200000);
    var firstRun = {
    values1 : ["1"]
    };

    insertFirstRun(firstRun);
    
    function insertFirstRun(firstRun) {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS FIRSTRUN');
            tx.executeSql('create table if not exists FIRSTRUN(RUN TEXT)');
            tx.executeSql('DELETE FROM FIRSTRUN');
            tx.executeSql(
                'INSERT INTO FIRSTRUN(RUN) VALUES (?)', 
                firstRun.values1,
                successFirstRun,
                errorFirstRun
            );
        });
    }
}

function errorFirstRun(err){
//    alert('Login failed');
//    navigator.notification.alert("Login failed.", function(){}, "myTed", "Ok");
//    loading.endLoading();
}

function successFirstRun(){
//        alert('insert success');
//    loading.endLoading();
//    window.location="home.html";
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//login
function postLogin(username, pwd){
    loading.startLoading();
    var webApiClass=webApiUrl+"api/profile/phonelogin";
    var loginType, imeiNo, loginId, loginPwd;
    
    loginType="phone";
    imeiNo=device.uuid;
    loginId=username;
    loginPwd=pwd;

    var valueStr=loginType+imeiNo+loginId+loginPwd+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: webApiClass,
      type: "POST",
      data:"loginType="+loginType+"&imeiNo="+imeiNo+"&loginId="+loginId+"&loginPwd="+loginPwd
        +"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,  
      success: function(data, status, xhr) {
        debugger;        
          storeProfile(data.name, data.ic, data.email, data.phone, data.address1, data.address2, data.postCode, data.city, data.stateId);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          alert(xhr.responseText);
        }
    })
}

function storeProfile(name, ic, email, phone, address1, address2, postcode, city, statedesc) {
    var db = window.openDatabase("Database", "1.0", "TED", 200000);
    var profile = {
    values1 : [name, ic, email, phone, address1, address2, postcode, city, statedesc]
    };

    insertProfile(profile);
    
    function insertProfile(profile) {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS PROFILE');
            tx.executeSql('create table if not exists PROFILE(NAME TEXT, IC TEXT, EMAIL TEXT, PHONE TEXT, ADDRESS1 TEXT, ADDRESS2 TEXT, POST_CODE TEXT, CITY TEXT, STATE_DESC TEXT)');
            tx.executeSql('DELETE FROM PROFILE');
            tx.executeSql(
                'INSERT INTO PROFILE(NAME, IC, EMAIL, PHONE, ADDRESS1, ADDRESS2, POST_CODE, CITY, STATE_DESC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                profile.values1,
                successLogin,
                errorLogin
            );
        });
    }
}

function errorLogin(err){
    loading.endLoading();
    alert('Login failed');
//    navigator.notification.alert("Login failed.", function(){}, "myTed", "Ok");
//    loading.endLoading();
}

function successLogin(){
//    alert('insert success');
    loading.endLoading();
    window.location="home.html";
}



//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//Merchant industry list 
function getIndustryList(){
    var webApiClass=webApiUrl+"api/merchant/industry";
    
     $.ajax({
      url: webApiClass,
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,     
      success: function(data, status, xhr) {
        debugger;        
          
          $(".filterOption ul li").remove();
          var industryId='""';
          var industryName='"All Categories"';
          
          $(".filterOption ul").append("<li onclick='filterItemOnclick("+industryId+","+industryName+")'>All Categories</li>");
          for(var x=0; x<data.length; x++){
            industryId='"'+ data[x].industryId + '"';
            industryName='"'+ data[x].industryName + '"';
            $(".filterOption ul").append("<li onclick='filterItemOnclick("+industryId+","+industryName+")'>"+data[x].industryName+"</li>");
          }

      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert(xhr.responseText);
        }
    })
}



//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//get merchant list
var entityIDHolder;

function getMerchantList(){
    var webApiClass=webApiUrl+"api/merchant/list";
    
     $.ajax({
      url: webApiClass,
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,     
      success: function(data, status, xhr) {
        debugger;        
        
          db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS Merchant');
            tx.executeSql('create table if not exists Merchant(ENTITYID TEXT, NAME TEXT, PHOTO TEXT, CATEGORY TEXT, FBID TEXT, ABOUTUS TEXT, STARTBUSINESS TEXT, ENDBUSINESS TEXT, CONTACT TEXT)');
            tx.executeSql('DELETE FROM Merchant');
          });
         
          for(var x=0; x<data.length; x++){
//            var mID='"'+ data[x].entityId + '"';
//            var photo='"'+ data[x].entityLogo + '"';
//            var ENTITYID=data[x].entityId;
//            var industri=data[x].entityIndustry;
            storeMerchant(data[x]);
          }
          
          loadMerchantList();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert(xhr.responseText);
        }
    })
}


function getFilterMerchantList(industryId){
    var webApiClass=webApiUrl+"api/merchant/list?industryId="+industryId;
    
     $.ajax({
      url: webApiClass,
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,     
      success: function(data, status, xhr) {
        debugger;        
          
          db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS Merchant');
            tx.executeSql('create table if not exists Merchant(ENTITYID TEXT, NAME TEXT, PHOTO TEXT, CATEGORY TEXT, FBID TEXT, ABOUTUS TEXT, STARTBUSINESS TEXT, ENDBUSINESS TEXT, CONTACT TEXT)');
            tx.executeSql('DELETE FROM Merchant');
          });
          
          for(var x=0; x<data.length; x++){
//            var mID='"'+ data[x].entityId + '"';
//            var photo='"'+ data[x].entityLogo + '"';
//            var ENTITYID=data[x].entityId;
//            var industri=data[x].entityIndustry;
            storeMerchant(data[x]);
          }
          
          loadMerchantList();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert(xhr.responseText);
        }
    })
}


function storeMerchant(jsonObject) {
    var merchant = {
    values1 : [jsonObject.entityId, jsonObject.entityName, jsonObject.entityLogo, jsonObject.entityIndustry, jsonObject.entityFacebookPgId, jsonObject.entityInfo, jsonObject.entityBHStart, jsonObject.entityBHEnd, jsonObject.entityContact]
    };
    
    insertMerchant(merchant);
    
    function insertMerchant(merchant) {
        db.transaction(function(tx) {
            tx.executeSql(
                'INSERT INTO Merchant(ENTITYID, NAME, PHOTO, CATEGORY, FBID, ABOUTUS, STARTBUSINESS, ENDBUSINESS, CONTACT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                merchant.values1,
                successStoreMerchant,
                errorStoreMerchant
            );
        });
    }
}

function errorStoreMerchant(err){
//    alert("failed"+err.message);
}

function successStoreMerchant(){
//    alert("success");
}


function loadMerchantList(){
    db.transaction(function(tx){
                tx.executeSql("SELECT a.ENTITYID, a.NAME, a.PHOTO, a.FBID, b.SUBSCRIBED, a.ABOUTUS, a.STARTBUSINESS, a.ENDBUSINESS, a.CONTACT FROM Merchant a left join SubsMerchant b on a.ENTITYID=b.ENTITYID and b.SUBSCRIBED='1' ORDER BY b.SUBSCRIBED desc, a.NAME", [], function(transaction, results){
            $(".scrollul li").remove();
            for(var x=0; x<results.rows.length; x++){
                var mID='"'+ results.rows.item(x).ENTITYID + '"';
                var photo='"'+ results.rows.item(x).PHOTO + '"';
                var name='"'+ results.rows.item(x).NAME + '"';
                var fbid=results.rows.item(x).FBID;
                var aboutus='"' + results.rows.item(x).ABOUTUS + '"';
                var startBH='"' + results.rows.item(x).STARTBUSINESS + '"';
                var endBH='"' + results.rows.item(x).ENDBUSINESS + '"';
                var contactNo='"' + results.rows.item(x).CONTACT + '"';
                
                if(fbid==null)
                    fbid='""';  
                else
                    fbid='"'+ fbid + '"';
                
                if(results.rows.item(x).SUBSCRIBED=="1"){
                        $(".scrollul").append("<li id='merchantRow"+x+"'><div class='merchantDiv'><img class='merchantImageSeperator' src='img/eventSeperator.png' /><img class='merchantImage' src='"+results.rows.item(x).PHOTO+"' onclick='goPromoPage("+mID+","+photo+","+fbid+","+name+","+aboutus+","+startBH+","+endBH+","+contactNo+");'/><span class='merchantName'>"+results.rows.item(x).NAME+"</span><button class='merchantFollower'>100 Followers</button><button class='merchantFollow' id='unFollowBtn' onclick='postUnSubscribedMerchant("+x+", "+mID+");'><img src='img/unfollow.png'/>Followed</button></div></li>");
                    }
                    else{
                        $(".scrollul").append("<li id='merchantRow"+x+"'><div class='merchantDiv'><img class='merchantImageSeperator' src='img/eventSeperator.png' /><img class='merchantImage' src='"+results.rows.item(x).PHOTO+"' onclick='goPromoPage("+mID+","+photo+","+fbid+","+name+","+aboutus+","+startBH+","+endBH+","+contactNo+");'/><span class='merchantName'>"+results.rows.item(x).NAME+"</span><button class='merchantFollower'>100 Followers</button><button class='merchantFollow' id='followBtn' onclick='postSubscribedMerchant("+x+", "+mID+");'><img src='img/addFollow.png'/>Following</button></div></li>");
                }
            }       
        }, failgetMetchantList);
    });
}

function failgetMetchantList(){

}
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//get subscribed merchant list
function getSubscribedMerchantList(){
dbmanager.getProfile(function(returnData){
    var webApiClass=webApiUrl+"api/merchant/mine?userIc="+returnData.rows.item(0).IC;

    $.ajax({
      url: webApiClass,
      type: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,        
      success: function(data, status, xhr) {
        debugger;        
          
          db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS SubsMerchant');
            tx.executeSql('create table if not exists SubsMerchant(ENTITYID TEXT, SUBSCRIBED TEXT)');
            tx.executeSql('DELETE FROM SubsMerchant');
          });
          
          for(var x=0; x<data.length; x++){
            storeSubscribedMerchant(data[x].entityId, data[x].allowNotify.toString());
          }
          
          getMerchantList();
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert(xhr.responseText);
        }
    })
});
}

function storeSubscribedMerchant(entityid, subscribed) {
    var merchant = {
    values1 : [entityid, subscribed]
    };

    insertMerchant(merchant);
    
    function insertMerchant(merchant) {
        db.transaction(function(tx) {
            tx.executeSql(
                'INSERT INTO SubsMerchant(ENTITYID, SUBSCRIBED) VALUES (?, ?)', 
                merchant.values1,
                successStoreSubsmerchant,
                errorStoreSubsMerchant
            );
        });
    }
}

function errorStoreSubsMerchant(err){

}

function successStoreSubsmerchant(){

}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//subscribe or unsubscribe merchant
function postSubscribedMerchant(x, mID){
dbmanager.getProfile(function(returnData){
    var webApiClass=webApiUrl+"api/merchant/subscribe";
    var imeiNo, userIc, entityId;
    imeiNo=device.uuid;
    userIc=returnData.rows.item(0).IC; 
    entityId=mID;
//    alert(mID);
    var valueStr=imeiNo+userIc+entityId+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: webApiClass,
      type: "POST",
      data:"imeiNo="+imeiNo+"&userIc="+userIc+"&entityId="+entityId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
            
            alert(xhr.responseText);
          
            $("#merchantRow"+x+" #followBtn").remove();
            $("#merchantRow"+x+" .merchantDiv").append("<button class='merchantFollow' id='unFollowBtn' onclick='postUnSubscribedMerchant("+x+", "+mID+");'><img src='img/unfollow.png'/>Followed</button>");
            $("#merchantRow"+x+" #unFollowBtn").click(function(){ postUnSubscribedMerchant(x, mID) });
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
            alert(xhr.responseText);
        }
    })
});
}

function postUnSubscribedMerchant(x, mID){
dbmanager.getProfile(function(returnData){
    var webApiClass=webApiUrl+"api/merchant/unsubscribe";
    var imeiNo, userIc, entityId;
    imeiNo=device.uuid;
    userIc=returnData.rows.item(0).IC; 
    entityId=mID;
//    alert(mID);
    var valueStr=imeiNo+userIc+entityId+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: webApiClass,
      type: "POST",
      data:"imeiNo="+imeiNo+"&userIc="+userIc+"&entityId="+entityId+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        
            alert(data);

            $("#merchantRow"+x+" #unFollowBtn").remove();
            $("#merchantRow"+x+" .merchantDiv").append("<button class='merchantFollow' id='followBtn' onclick='postSubscribedMerchant("+x+", "+mID+");'><img src='img/addFollow.png'/>Following</button>");
            $("#merchantRow"+x+" #followBtn").click(function(){ postSubscribedMerchant(x, mID)});
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert(xhr.responseText);
        }
    })
});  
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//get promotion list
function getMerchantPromoList(mID){
    var webApiClass=webApiUrl+"api/merchant/promotion?entityId="+mID;
    
    
   $.ajax({
      url: webApiClass,
      type: "Get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
          
          for(var x=0; x<data.length; x++){  
            var date=data[x].start
            $("#scrollulPromotion").append("<li><div class='promoDiv'><img class='promoImageSeperator' src='img/eventSeperator.png' /><img class='promoImage' src='"+data[x].promoPhoto+"'/><span class='promoName'>"+data[x].promoTitle+"</span><br><span class='promoDate'>3rd April 2016</span><button class='btnFb'><img src='img/fbshare.png' /></button></div></li>");
          }
          
          if(data.length==0){
              $("#scrollulPromotion").append("<li><div class='promoDiv'><br><span class=noresult>&nbsp;&nbsp;No result found</span></div></li>");
          }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
            alert(xhr.responseText);
        }
    })
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//get branch list
function getBranchList(mID){
    var webApiClass=webApiUrl+"api/merchant/branches?entityId="+mID;
    
   $.ajax({
      url: webApiClass,
      type: "Get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,  
      success: function(data, status, xhr) {
        debugger;        

          var addresses=[];
          var name=[];

          for(var x=0; x<data.length; x++){
            addresses.push(data[x].branchAddress);
            name.push(data[x].branchName );
          }
          markPosition(addresses, name); 
          $("#aboutusli").remove();
          $("#scrollulAboutUs").append("<li id='aboutusli'><div class='aboutus' id='aboutus'><img class='promoImageSeperator' src='img/aboutSeperator.png' /><br><br><h1>About Us</h1><p>"+getUrlParameter("aboutus")+"</p><br><h1>Business Hour</h1><p>"+getUrlParameter("startbh")+"-"+getUrlParameter("endbh")+"</p><br><h1>Contact Info</h1><p>"+getUrlParameter("contact")+"</p></div><br></li>");
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          alert(xhr.responseText);
        }
    })
}



//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//forgot password
function postForgotPwd(phoneNo){
    loading.startLoading();
    var webApiClass=webApiUrl+"api/profile/forgetPwd?phoneNo="+phoneNo;

   $.ajax({
      url: webApiClass,
      type: "Get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,  
      success: function(data, status, xhr) {
        debugger;        
          loading.endLoading();
          alert(data.sendOutput);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          alert("Error: "+xhr.responseText);
        }
    })
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//registration process
function registerStepOne(phoneNo){
    loading.startLoading();
    var webApiClass=webApiUrl+"api/profile/step1?phoneno="+phoneNo;
    
   $.ajax({
      url: webApiClass,
      type: "Get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,  
      success: function(data, status, xhr) {
        debugger;        
          window.location="loginTwo.html?phoneno="+phoneNo+"&name="+data.name+"&email="+data.email;
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          alert("Error: "+xhr.responseText);
        }
    })
}

function registerStepTwo(name, email, phoneno){
    loading.startLoading();
    var webApiClass=webApiUrl+"api/profile/step2";
    
    var valueStr=name+email+phoneno+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: webApiClass,
      type: "POST",
      data:"name="+name+"&email="+email+"&phoneNo="+phoneno+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,  
      success: function(data, status, xhr) {
        debugger;        
//          alert(JSON.stringify(data));
          window.location="loginThree.html?name="+name+"&email="+email+"&phoneno="+phoneno;
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          alert("Error: "+xhr.responseText);
        }
    })
}

function registerStepThree(name, email, phoneno, tac, loginpwd){
    loading.startLoading();
    var webApiClass=webApiUrl+"api/profile/step3";
    
    var valueStr=name+email+phoneno+tac+loginpwd+device.uuid+sha1Key;
    var hashedStr=SHA1(valueStr);
    
    $.ajax({
      url: webApiClass,
      type: "POST",
      data:"name="+name+"&email="+email+"&phoneNo="+phoneno+"&tacNo="+tac+"&loginPwd="+loginpwd+"&imeiNo="+device.uuid+"&checksum="+hashedStr,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeout,  
      success: function(data, status, xhr) {
        debugger;        
//          alert(JSON.stringify(data));
//          window.location="loginThree.html";
          loading.endLoading();
          postLogin(phoneno, loginpwd);
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          loading.endLoading();
          alert("Error: "+xhr.responseText);
        }
    })
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//getfacebook gallery album list
function getFbAlbumList(fbId){
    fbPhotoList=[];
    var getAlbumListUrl=fbUrl+fbId+"/albums?access_token="+accessToken;
    $.ajax({
      url: getAlbumListUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        
          var returnStr=JSON.stringify(data);
          var newJsonObj=$.parseJSON(returnStr);
          var defs=[];
          for(var x=0; x<newJsonObj.data.length;x++){
            defs.push(getFbPhotoList(newJsonObj.data[x].id));
          } 
          
          $.when.apply(null, defs).done(function() {
            loadGallery();
          });
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          
//          alert("Fail connect to server a" + xhr.responseText); 
        }
    })

}

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//get fb photos from albums
function getFbPhotoList(albumid){
    
    var getPhotoListUrl=fbUrl+albumid+"/photos?limit=150&access_token="+accessToken;
    
    var nestedajaxcall=$.ajax({
      url: getPhotoListUrl,
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        
          var returnStr=JSON.stringify(data);
          var newJsonObj=$.parseJSON(returnStr);
          
          for(var x=0; x<newJsonObj.data.length; x++){
             var fbPictureUrl=fbUrl+newJsonObj.data[x].id+"/picture";
             fbPhotoList.push(fbPictureUrl);
          }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          
//          alert("Fail connect to server b"); 
        }
    })

    return nestedajaxcall;
}


function loadGallery(){
    var total=fbPhotoList.length;
    var modno=total%3;
    var linenumber=Math.floor(total/3);
    
    if(modno>0)
        linenumber=linenumber+1;
    
    for(var x=0; x<linenumber; x++){
        if(x==linenumber-1){
            if(modno==0){
                $("#scrollulFbGallery").append("<li><div class='gallery1Div'><img class='gallery1' src='"+fbPhotoList[x*3]+"'/></div><div class='gallery2Div'><img class='gallery2' src='"+fbPhotoList[x*3+1]+"'/></div><div class='gallery3Div'><img class='gallery3' src='"+fbPhotoList[x*3+2]+"'/></div></li>");
            }
            else if(modno==1){
                $("#scrollulFbGallery").append("<li><div class='gallery1Div'><img class='gallery1' src='"+fbPhotoList[x*3]+"'/></div><div class='gallery2Div'><img class='gallery2' src=''/></div><div class='gallery3Div'><img class='gallery3' src=''/></div></li>");
            }
            else if(modno==1){
                $("#scrollulFbGallery").append("<li><div class='gallery1Div'><img class='gallery1' src='"+fbPhotoList[x*3]+"'/></div><div class='gallery2Div'><img class='gallery2' src='"+fbPhotoList[x*3+1]+"'/></div><div class='gallery3Div'><img class='gallery3' src=''/></div></li>");
            }
        }
        else{
            $("#scrollulFbGallery").append("<li><div class='gallery1Div'><img class='gallery1' src='"+fbPhotoList[x*3]+"'/></div><div class='gallery2Div'><img class='gallery2' src='"+fbPhotoList[x*3+1]+"'/></div><div class='gallery3Div'><img class='gallery3' src='"+fbPhotoList[x*3+2]+"'/></div></li>");
        }
    }
}

//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------
// Sha1 encryption //
function SHA1(msg) {
  function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };
  function lsb_hex(val) {
    var str="";
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };
  function cvt_hex(val) {
    var str="";
    var i;
    var v;
    for( i=7; i>=0; i-- ) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  };
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }
  switch( msg_len % 4 ) {
    case 0:
      i = 0x080000000;
    break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
    break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
    break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
    break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=20; i<=39; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=40; i<=59; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=60; i<=79; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}
