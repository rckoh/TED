//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//page loading

var loading = {
    
    //add loading page when calll
    startLoading:function(){
        $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/loading_large.gif'></img></div></div>");
    },
    
    //remove loading page when call
    endLoading:function(){
        $(".loadingPage").remove();
    }
};


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//dbmanager
var db;

var dbmanager = {
    initdb:function(){
        db = window.openDatabase("Database", "1.0", "TED", 200000);
    },
    
    createTable:function(){
        db.transaction(createTableTransaction, this.errorExecuteSQL, this.successExecuteSQL);
        
        function createTableTransaction(t){
            t.executeSql('CREATE TABLE IF NOT EXISTS userprofile (uid text, companyid text,name text, email text, profileImg text, role text, token text)');
        }
    },
    
    getProfile:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM userprofile', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
    },
    
    successExecuteSQL:function(){
        //success to executeSQL
        //alert("success");
    },
    
    errorExecuteSQL:function(err){
        //fail executeSQL
        alert("fail"+err.message);
    },
};



//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//inbox page navigate
function goInbox(){
    window.location = "inboxPage.html";
}

function initInboxButton(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0)
            $(".inboxBtn").show();
    });
}


//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//inbox check new message

var inboxMessage={
    
    checkNewMessageNumber:function(){
        dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0)
            var token=returnData.rows.item(0).token;
            var uid=returnData.rows.item(0).uid;
            postNewInboxMessageCount(token, uid, "1");
        });
    },
}



//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//encode textarea input into html
function encode4HTML(str) {
    return str
        .replace(/\r\n?/g,'\n')
        // normalize newlines - I'm not sure how these
        // are parsed in PC's. In Mac's they're \n's
        .replace(/(^((?!\n)\s)+|((?!\n)\s)+$)/gm,'')
        // trim each line
        .replace(/(?!\n)\s+/g,' ')
        // reduce multiple spaces to 2 (like in "a    b")
        .replace(/^\n+|\n+$/g,'')
        // trim the whole string
        .replace(/[<>&"']/g,function(a) {
        // replace these signs with encoded versions
            switch (a) {
                case '<'    : return '&lt;';
                case '>'    : return '&gt;';
                case '&'    : return '&amp;';
                case '"'    : return '&quot;';
                case '\''   : return '&apos;';
            }
        })
        //.replace(/\n{2,}/g,'</p><br><p>')
        // replace 2 or more consecutive empty lines with these
        .replace(/\n/g,'<br />')
        // replace single newline symbols with the <br /> entity
        .replace(/^(.+?)$/,'<p>$1</p>');
        // wrap all the string into <p> tags
        // if there's at least 1 non-empty character
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//getDataFromUrl

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
