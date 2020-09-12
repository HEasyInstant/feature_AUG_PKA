var SIGNfnc = function () {
    var sfnc = function() { 
        $('#login-username').focus();
        $('#login-alert').hide();
        
        $('#btn-changepwd').click(function (e) {
           e.preventDefault();
           var oldPwd = $.trim($('#old-pwd').val());
           var newPwd = $.trim($('#new-pwd').val());
           var cnfPwd = $.trim($('#cnf-pwd').val());
           var uname ="hotel_rec";
           var paswd ="welcome123";
           if(oldPwd === ""){
               $('#login-alert').html('Enter the Old Password');
               $('#login-alert').show();
           } else if(newPwd === "") {
               $('#login-alert').html('Enter the New Password');
               $('#login-alert').show();
           } else if(cnfPwd === ""){
           	   $('#login-alert').html('Enter the Confirm Password');
               $('#login-alert').show();
           } 
           else if(uname=="hotel_rec" && paswd=="welcome123" ){
        	   var token = window.localStorage.getItem("token");
                var base_url = $('#baseurl').val().trim() +'api/clients/check_login?access_token='+token;
                var data = {'username' : uname,'password' : paswd};
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    url: base_url,
                    data: JSON.stringify(data) ,

                    success: function(json){
                        try{
                            var obj = json;
                            if(obj['STATUS'] === "OK"){
                                var token = obj['token'];
                                console.log(token);
                                window.localStorage.clear();
                                window.localStorage.setItem("token", token);
                                console.log('localstorage set done');
                                var surl = $('#baseurl').val().trim() + obj['SURL'];
                                surl = surl+'?access_token='+token;
                                window.location.replace(surl);
                            } else {
                                $('#login-alert').html("Invalid Username/Password!");
                                $('#login-alert').show();
                            } 
                        }catch(e) {
                            $('#login-alert').html("ERROR : JQR001 - Exception while request");
                            $('#login-alert').show();
                        }
                    },
                    error: function(){	
                        $('#login-alert').html("ERROR : JQR005 - Error while request");
                        $('#login-alert').show();
                    }                  
                });

            }else{
            window.location.href="../../admin/changepwd.html";	
            }
           
        });
        
        
    };    
    return {
        init: function () {
            sfnc();
        }
    };
}();