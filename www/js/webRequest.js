var webUrl = "http://cloud.projeksistematik.com.my/MOBILE_REWARDS_APP/sch/searchdata.aspx";
var apiTimeout=20000;
var sha1Key="8809377";
var fbPhotoList=[];

function postLogin(username, pwd){

    var strName="ProfileStr";
    var ProfileStr = {};
    ProfileStr["commandFlag"] = "9";
    ProfileStr["Phone"] = username;
    ProfileStr["Password"] = pwd;
    ProfileStr["ID"] = "Thisistestingimei";
    
    var jsonString=JSON.stringify(ProfileStr);
    var hashedStr=SHA1(jsonString+sha1Key);
    var postString=strName+"="+jsonString+"|||"+hashedStr;

    
    $.ajax({
      url: webUrl,
      type: "POST",
      data:postString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postString.length,
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        
          var returnStr=JSON.stringify(data);
          
          window.location="home.html";
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          
          alert("Fail connect to server");
          
        }
    })
}

function getMerchantList(){
    var strName="EntityStr";
    var jsonObject = {};
    jsonObject["commandFlag"] = "0";
    jsonObject["EntityID"] = "";
    jsonObject["EntityName"] = "";
    jsonObject["EntityPhoto"] = "";
    jsonObject["EntityPoint"] = "";
    jsonObject["IC"] = "";
    jsonObject["Imei"] = "";
    
    var jsonString=JSON.stringify(jsonObject);
    var hashedStr=SHA1(jsonString+sha1Key);
    var postString=strName+"="+jsonString+"|||"+hashedStr;

    
    $.ajax({
      url: webUrl,
      type: "POST",
      data:postString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postString.length,
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        
          var returnStr=data.split("|||");
          var newJsonObj=$.parseJSON(returnStr[0]);
          
          for(var x=0; x<newJsonObj.length; x++){
            var mID='"'+ newJsonObj[x].EntityID + '"';
            var photo='"'+ newJsonObj[x].EntityPhoto + '"';
              
            $(".scrollul").append("<li><div class='merchantDiv'><img class='merchantImageSeperator' src='img/eventSeperator.png' /><img class='merchantImage' src='"+newJsonObj[x].EntityPhoto+"' onclick='goPromoPage("+mID+","+photo+");'/><span class='merchantName'>"+newJsonObj[x].EntityName+"</span><span class='merchantFollower'>100 Followers</span><span class='merchantFollow'><img src='img/addFollow.png'/>Following</span></div></li>");
          }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          
          alert("Fail connect to server");
          
        }
    })
}

function getMerchantPromoList(mID){
    
    var strName="PromotionStr";
    var jsonObject = {};
    jsonObject["commandFlag"] = "0";
    jsonObject["PromoBusinessEntity"] = mID;
    jsonObject["PromotionCategory"] = "";
    jsonObject["PromotionDescription"] = "";
    jsonObject["PromotionEndDate"] = "";
    jsonObject["PromotionHighLight"] = "";
    jsonObject["PromoID"] = "";
    jsonObject["PromoMerchant"] = "";
    jsonObject["PromoPhoto"] = "";
    jsonObject["PromoStartDate"] = "";
    jsonObject["PromoState"] = "";
    jsonObject["PromoTC"] = "";
    jsonObject["PromoTitle"] = "";
    
    var jsonString=JSON.stringify(jsonObject);
    var hashedStr=SHA1(jsonString+sha1Key);
    var postString=strName+"="+jsonString+"|||"+hashedStr;

    
    $.ajax({
      url: webUrl,
      type: "POST",
      data:postString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postString.length,
      },
      timeout: apiTimeout,    
      success: function(data, status, xhr) {
        debugger;        
        
          var returnStr=data.split("|||");
          var newJsonObj=$.parseJSON(returnStr[0]);
//          alert(returnStr);
          
          for(var x=0; x<newJsonObj.length; x++){  
            var date=newJsonObj[x].start
            $("#scrollulPromotion").append("<li><div class='promoDiv'><img class='promoImageSeperator' src='img/eventSeperator.png' /><img class='promoImage' src='"+newJsonObj[x].PromoPhoto+"'/><span class='promoName'>"+newJsonObj[x].PromoTitle+"</span><br><span class='promoDate'>3rd April 2016</span><button class='btnFb'><img src='img/fbshare.png' /></button></div></li>");
          }
          
          if(newJsonObj.length==0){
              $("#scrollulPromotion").append("<li><div class='promoDiv'><br>&nbsp;&nbsp;No result found</div></li>");
          }
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          
          alert("Fail connect to server");
          
        }
    })
}

function getFbAlbumList(){
    fbPhotoList=[];
    var fbId="honglingg";
    var accessToken='CAACEdEose0cBAGIMgrzBpVQxPDsvmWB4k4T7YE6ZCOUHeRZA1xGfG4GpeZAuMh2xUunwEFCXV7pglCyTZAZAVKbwl6egg1JiXXyvZABQxK4jzwj75tUl57QFTAqvFQZBrjfEE0y44zsb79ZAnSLVVqsvoudOFpDBNZCNwuyxwZApAIohJsiiUAaCXDFRstvjfb5E3mIOEdV3F8egZDZD';
    
    var fbUrl="https://graph.facebook.com/";
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
          
          alert("Fail connect to server a" + xhr.responseText); 
        }
    })

}

function getFbPhotoList(albumid){
    var accessToken='CAACEdEose0cBAGIMgrzBpVQxPDsvmWB4k4T7YE6ZCOUHeRZA1xGfG4GpeZAuMh2xUunwEFCXV7pglCyTZAZAVKbwl6egg1JiXXyvZABQxK4jzwj75tUl57QFTAqvFQZBrjfEE0y44zsb79ZAnSLVVqsvoudOFpDBNZCNwuyxwZApAIohJsiiUAaCXDFRstvjfb5E3mIOEdV3F8egZDZD';
    
    var fbUrl="https://graph.facebook.com/";
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
          
          alert("Fail connect to server b"); 
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
