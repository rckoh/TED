var webUrl = "http://cloud.projeksistematik.com.my/MOBILE_REWARDS_APP/";
var apiTimeout=20000;

function success(uuid)
{
    alert(uuid);
};

function success(uuid)
{
    alert("fail");
};


function postLogin(){
    alert("as");
    var strName="ProfileStr";
    var ProfileStr = {};
    ProfileStr["commandFlag"] = "9";
    ProfileStr["Phone"] = "0177028082";
    ProfileStr["Password"] = "123456";
    ProfileStr["ID"] = "";
    
    window.plugins.uniqueDeviceID.get(success, fail);
    
    var requestUrl=webUrl+"drupalgap/getfeatured";
    
//    $.ajax({
//      url: requestUrl,
//      type: "GET",
//      headers: {
//        "Content-Type": "application/json"
//      },
//      timeout: apiTimeout,    
//      success: function(data, status, xhr) {
//        debugger;        
//        
//      },
//      error:function (xhr, ajaxOptions, thrownError){
//        debugger;
//          
//        }
//    })
}

