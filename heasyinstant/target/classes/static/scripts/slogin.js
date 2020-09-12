var BEARER = "Bearer";
var DELIMITER = " ";
var clientId=0;
var SIGNfnc = function () {
	//check for already logged in user
	validateToken();
	
    var sfnc = function() { 
        $('#login-username').focus();
        $('#login-alert').hide();
        
        $('#btn-login').click(function (e) {
           e.preventDefault();
           if(window.localStorage.getItem("token")!=null && window.localStorage.getItem("SURL") !=null){
//        	   alert("Your session is already running");
        	   var surl = "/"+ window.localStorage.getItem("SURL");
        	    surl = surl+'?access_token='+window.localStorage.getItem("token");
        	    window.location.replace(surl);
        	    return;
           }
           var uname = $.trim($('#login-username').val());
           var paswd = $.trim($('#login-password').val());
           if(uname === ""){
               //$('#login-alert').html('Enter a valid username');
               //$('#login-alert').show();
        	   toastr.error('Enter a valid username');
           } else if(paswd === "") {
               //$('#login-alert').html('Enter the Password');
               //$('#login-alert').show();
        	   toastr.error('Enter the Password');
           } else {

                var base_url = $('#baseurl').val().trim() +'api/clients/check_login';
                var data = {'username' : uname,'password' : getPass(paswd)};
                var token = window.localStorage.getItem("token");

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    url: base_url,
                    data: JSON.stringify(data) ,

                    success: function(json){
                        try{
                            var obj = json;
                            if(obj['STATUS'] === "OK" && obj['otherDetail']['isClientChangePassword']==true){                                
                                var token = obj['token'];
                                var hotelId=obj['otherDetail']['hotelId'];
                                var userName = obj['otherDetail']['userName'];
                                var name = obj['otherDetail']['name'];
                                clientId = obj['otherDetail']['clientId'];
                                var departmentId = obj['otherDetail']['departmentId'];
                                window.localStorage.clear();
                                window.localStorage.setItem("token", token);
                                window.localStorage.setItem("hotelCodeVal",hotelId);
                                window.localStorage.setItem("userName", userName);
                                window.localStorage.setItem("name", name);
                                window.localStorage.setItem("clientId", clientId);
                                window.localStorage.setItem("SURL", obj['SURL']);
                                window.localStorage.setItem("staff_mobile",obj['otherDetail']['mobile']);
                                window.localStorage.setItem("departmentId",departmentId);
                                window.localStorage.setItem("deptName",obj['otherDetail']['deptName']); 
                                window.localStorage.setItem("isCorporateTravelEnabled",obj['otherDetail']['isCorporateTravelEnabled']); 
                                window.localStorage.setItem("allowedCompany",obj['otherDetail']['allowedCompany']); 
                                window.localStorage.setItem("travelServiceId",obj['otherDetail']['travelServiceId']); 
                                var surl = $('#baseurl').val().trim() + obj['SURL'];
                                surl = surl+'?access_token='+token;
                                window.location.replace(surl);
                            } else if(obj['STATUS'] === "OK" && obj['otherDetail']['isClientChangePassword']==false){
                            	clientId=obj['otherDetail']['clientId'];
                            	window.localStorage.setItem("cid", clientId);
                            	var token = obj['token'];
                           	 	window.localStorage.setItem("token", token);
                            	 window.location.replace("/admin/changepassword.html");

							}else{
								//$('#login-alert').html("Invalid Username/Password!");
                                //$('#login-alert').show();
                                toastr.error('Invalid Username/Password!');
							} 
                        }catch(e) {
                            //$('#login-alert').html("ERROR : Exception while request");
                            //$('#login-alert').show();
                        	toastr.error('ERROR : Exception while request');
                        }
                    },
                    error: function(){	
                        //$('#login-alert').html("ERROR : Error while request");
                        //$('#login-alert').show();
                    	toastr.error('ERROR : Error while request');
                    }                  
                });
			}
        });
        
//For change password...        
        $('#btn-changepwd').click(function (e) {
           e.preventDefault();
           $('#login-alert').hide();
			var oldPwd = $.trim($('#old-pwd').val());
			var newPwd = $.trim($('#new-pwd').val());
			var cnfPwd = $.trim($('#cnf-pwd').val());
			var cid = window.localStorage.getItem("cid");

           if(oldPwd === ""){
               toastr.error('Enter the Old Password');
               return;
           } else if(newPwd === "") {
               toastr.error('Enter the New Password');
               return;
           } else if(cnfPwd === ""){
               toastr.error('Enter the New Password');
               return;
           } else if(newPwd !=cnfPwd){
               toastr.error('New & Confirm Password are not same');
               return;
           }else if(oldPwd ===cnfPwd){
               toastr.error('Old and new Passwords can not be same');
               return;
           }else if(cnfPwd.length<5){
               toastr.error('Password length should me minimum 5');
               return;
           }
           var token = window.localStorage.getItem("token");
                
			var base_url = $('#baseurl').val().trim() + 'api/clients/changePassword?access_token='+token;
			var data = {
				"clientId" : Number(cid),
				"oldPassword" : oldPwd,
				"newPassword" : newPwd,
				"confirmPassword" : cnfPwd
			}; 
                var token = window.localStorage.getItem("token");
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    url: base_url,
                    data: JSON.stringify(data) ,

                    success: function(json){
                        console.log('browser json'+ json);
                        try{
                            var obj = json;
                            if(obj['success'] == true){
                            	localStorage.removeItem("cid");
                                var token = obj['token'];
                                
                                window.location.href="../../admin/login.html";	
                                toastr.success('Password changed successfully');
                            } else {
                            	toastr.error('Unable to change Password');
                            } 
                        }catch(e) {
                           
                            toastr.error('ERROR : - Exception while request');
                        }
                    },
                    
					error: function(xhr, status) {
						toastr.error('ERROR : - Error while request');
					}           
       
                });

           
           
        });
	
			//For email to reset password...
			$('#btn-email').click(function(e) {
				e.preventDefault();
				$('#login-alert').hide();
				var user_name = $.trim($('#user_name').val());
				if (user_name === "") {
					toastr.error('Enter the user name');
					return;
				}
				
				var user_email = $.trim($('#user_email').val());
				if (user_email === "") {
					toastr.error('Enter the email Id');
					return;
				}
				
				var token = window.localStorage.getItem("token");
				var base_url = $('#baseurl').val().trim() + 'api/clients/forgetPassword';
				var data = {
						'user_name':user_name,
						'email' : user_email
				};
	
				$.ajax({
					type : 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url : base_url,
					data : JSON.stringify(data),
	
					success : function(json) {
						console.log('browser json' + json);
						try {
							var obj = json;
							if (obj['success'] == true) {
								toastr.success('Please check your mail');
								$('#user_name').val('');
								$('#user_email').val('');
							} else {
								toastr.error('Unable to send mail');
							}
						} catch(e) {
	
							toastr.error('ERROR : - Exception while request');
						}
					},
	
					error : function(xhr, status) {
						toastr.error('ERROR : - Error while request');
					}
				});
	
			}); 
			
			//For Reset Password...
			$('#btn-resetpwd').click(function(e) {
				e.preventDefault();
				$('#login-alert').hide();
				var clientId = $.trim($('#clientId').val());
				var newPassword = $.trim($('#new-pwd').val());
				var confirmPassword = $.trim($('#cnf-pwd').val());
				if (clientId === '') {
					toastr.error('Internal Error');
					return;
				}
				var base_url = $('#baseurl').val().trim() + 'api/clients/updatePassword';
				var data = '{"clientId":' + clientId + ',"newPassword":"'+newPassword+'","confirmPassword":"'+confirmPassword+'"}';
	            data = JSON.parse(JSON.stringify(data));
				$.ajax({
					type : 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url : base_url,
					data : data,	
					success : function(json) {
						console.log('browser json' + json);
						try {
							var obj = json;
							if (obj['success'] == true) {
								toastr.success('Your Password Reset Successfully');
							    $('#new-pwd').val('');
							    $('#cnf-pwd').val('');
                                setTimeout(function () {
                                    window.location.replace("/admin/login.html");
                                },3000);
							} else {
								toastr.error('Failed To Reset Password');
							}
						} catch(e) {
							toastr.error('ERROR : - Exception while request');
						}
					},
					error : function(xhr, status) {
						toastr.error('ERROR : - Error while request');
					}
				});
	
			}); 
    };    
    return {
        init: function () {
            sfnc();
        }
    };
}();
function validateToken() {
    var sessionExpired = getParameterByName('sessionExpired');
    if(sessionExpired == "true"){
        window.localStorage.clear();
    }else{
        if (window.localStorage.getItem("token") != null && window.localStorage.getItem("SURL") != null) {
            var surl = "/" + window.localStorage.getItem("SURL");
            surl = surl + '?access_token=' + window.localStorage.getItem("token");
            window.location.replace(surl);
        }
    }

}

function getPass(pass){
    var encryptedPass = CryptoJS.AES.encrypt(pass, "STAYOH");
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(encryptedPass.toString(), 'STAYOH');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return encryptedPass.toString();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}