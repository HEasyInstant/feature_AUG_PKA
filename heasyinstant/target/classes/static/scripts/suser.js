/**
 * Created by Ashee on 16-05-2016.
 */


$('#registerUserFrm').on('keydown', function(e){
    if (e.which===13) e.preventDefault();
});

function registerUser(){
    var registerUserFrm = $("#registerUserFrm").serialize();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: base_url,
        data: JSON.stringify(registerUserFrm) ,

        success: function(json){
            console.log('browser json'+ json)
            try{
                var obj = json;
                if(obj['STATUS'] === "OK"){
                    var token = obj['token'];
                    console.log(token);
                    window.localStorage.clear();
                    window.localStorage.setItem("token", token);
                    console.log('localstorage set done')
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


}