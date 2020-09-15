function addWifi() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var name = $.trim($('#wifi-name').val());
	var isEnabled = $.trim($('#enable-wifi').val());
	var type = 'static';
	var msgTemplate = $.trim($('#sms-Temp').val());
	var staticPassword = $.trim($('#static-password').val());
	var url = '/admin/api/hotel/addWifi?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelCode+' ,"name":"' + name + '","type":"' + type + '","msgTemplate":"' + msgTemplate + '","isEnabled":"' + isEnabled + '","staticPassword":"' + staticPassword+'"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					
					toastr.success('Wifi successfully added');
					


				} else {
					console.log("add wifi failed");
					
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			toastr.error('add wifi failed');


		}
	});
}

function getWifi() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getWifi?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelCode+'}',
		success : function(obj) {
			
			try {
				
				if (obj['success'] == true) {
					
					if(obj.hasOwnProperty('res') && obj['res'].length ==1){
						if(obj['res'][0].hasOwnProperty('name'))
							document.getElementById('wifi-name').value = obj['res'][0]['name'];
							
						if(obj['res'][0].hasOwnProperty('staticPassword'))
							document.getElementById('static-password').value = obj['res'][0]['staticPassword'];
						
						if(obj['res'][0].hasOwnProperty('msgTemplate'))
							document.getElementById('sms-Temp').value = obj['res'][0]['msgTemplate'];
						
						if(obj['res'][0].hasOwnProperty('isEnabled')){
							if(obj['res'][0]['isEnabled']=='true')	
								$('#enable-wifi').prop('checked', true);
							
						}
						
					}
						

				} else {
					console.log("fetch wifi failed");
					
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			toastr.error('fetch wifi failed');


		}
	});
}