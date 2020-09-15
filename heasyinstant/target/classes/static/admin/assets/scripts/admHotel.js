var hotelCode = 0;
var base_url = null;
function addHotel() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelName = document.getElementsByName("hotelName")[0].value;
	var hotelDesc = document.getElementsByName("hotelDesc")[0].value;
	//var hotelCode = document.getElementsByName("hotelCode")[0].value;
	var hotelLocation = document.getElementsByName("hotelAddress")[0].value;
	var splash = document.getElementById("hotelSplash").value;
	/*	var icon = document.getElementById("hotelIcon").value;
	 var splash = document.getElementById("hotelSplash").value;

	 var icon = document.getElementById("hotelIcon").files[0].name;
	 var splash = document.getElementById("hotelSplash").files[0].name;*/
	base_url = $('#baseurl').val().trim();
	var url = $('#baseurl').val().trim() + 'admin/api/hotel/addHotel?access_token=' + token;
	console.log(url);
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		/*data : '{"hotelName":"' + hotelName + '","hotelDesc":"' + hotelDesc + '","hotelCode":"' + hotelCode + '","hotelLocation":"' + hotelLocation + '","icon":"' + icon + '","splash":"' + splash + '"}'*/
		data : '{"hotelName":"' + hotelName + '","hotelDesc":"' + hotelDesc + '","hotelLocation":"' + hotelLocation + '","splash":"' + splash + '"}',
		success : function(json) {
			try {
				var obj = json;
				if (obj['success'] == true) {
					document.getElementById("registerUserFrm").reset();
					document.getElementById('hotelCodeAdm').value = obj['res']['code'];
					hotelCode = obj['res']['code'];
					toastr.success('Hotel successfully added');
				} else {
					toastr.error("Hotel addition failed:"+obj['err']);
					console.log("Failed to insert " + JSON.stringify(json));
				}
			} catch (e) {
				toastr.error("Hotel addition failed:"+obj['err']);
			}
		},
		error : function(xhr, status) {
			toastr.error("Hotel addition failed");
		}
	});
}


function getPass(pass){
	var encryptedPass = CryptoJS.AES.encrypt(pass, "STAYOH");
	// Decrypt
	var bytes  = CryptoJS.AES.decrypt(encryptedPass.toString(), 'STAYOH');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	return encryptedPass.toString();
}

function addAdminDetails() {
	event.preventDefault();
	//var hotelId = $.trim($('#hotelCodeAdm').val());
	var userName = $.trim($('#adminUName').val());
	var password = getPass('welcome123');
	var mobile = $.trim($('#mobile').val());
	var permission = $.trim($('#permission :selected').text());
	var email = $.trim($('#email').val());
	var name = $.trim($('#name').val());
	base_url = $('#baseurl').val().trim();
	var token = window.localStorage.getItem("token");
	var url = base_url + 'api/clients/addAdmin?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelCode+' ,"userName":"' + userName + '","name":"'+name+'","password":"' + password + '","mobile":"' + mobile + '","permission":"' + permission + '","email":"'+email+'"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					document.getElementById("admin-form").reset();
					toastr.success('Admin successfully added');

				} else {
					toastr.error("Admin addition failed : "+obj['err']);
				}
			} catch (e) {
				toastr.error("Admin addition failed");
			}
		},
		error : function(xhr, status) {

			toastr.error("Admin addition failed");

		}
	});
}
