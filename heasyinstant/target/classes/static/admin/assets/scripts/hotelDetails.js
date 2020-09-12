//var token = window.localStorage.getItem("token");
var old_hotelName="";
var old_hotelDescription="";
function getHotelDetails() {
	var token = window.localStorage.getItem("token");
	document.getElementById('hotelCode').value = window.localStorage.getItem("hotelCodeVal");
	var hotelId = $.trim($('#hotelCode').val());
	var url = '/admin/api/hotel/getHotelDetail?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": ' + hotelId + '}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (json.success == true) {
					document.getElementById("hotelName").value = obj['hotel']['name'];
					document.getElementById("hotelDesc").value = decodeURIComponent(obj['hotel']['desc']);
					old_hotelName=obj['hotel']['name'];
					old_hotelDescription = obj['hotel']['desc'];
				} else {
					console.log("Error " + json.err);
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {

			// alert(xhr.status);
			// alert(xhr.statusText);
			// alert(xhr.responseText);

		}
	});
}

function updateDesc() {
	var token = window.localStorage.getItem("token");
	var hotelName = $.trim($('#hotelName').val());
	var hotelDesc = $.trim($('#hotelDesc').val());
	var hotelId = $.trim($('#hotelCode').val());
	if(hotelDesc == old_hotelDescription){
		toastr.error('Invalid operation please modify hotel description');
		return;
	}
	var url = '/admin/api/hotel/updateHotel?access_token=' + token;
//	var objVal= {"hotelCode":  hotelId , "hotelName":  hotelName ,"hotelDesc": hotelDesc };
//	var myJSON = JSON.stringify(objVal);
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelId+' ,"hotelName":"' + hotelName + '","hotelDesc":"' + encodeURIComponent(hotelDesc) + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {

				if (json.success == true) {
					toastr.success('Hotel details updated successfully');
				} else {
					toastr.error('Invalid operation please modify hotel description');
					console.log("Error " + json.err);
				}
			} catch (e) {
				toastr.error('Failed to update Hotel details');
			}
		},
		error : function(xhr, status) {
			toastr.error('Failed to update Hotel details');
		}
	});
}

function addBreakfastTimeSchedule() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var breakfastStartTime = $('#br_start_time').val().trim();
	var breakfastEndTime = $('#br_end_time').val().trim();
	var time = breakfastStartTime + ' - ' + breakfastEndTime;
	var msg = 'BREAKFAST';
	var isComplementary = $('#complementary_break').is(":checked");
	var url = 'admin/api/hotel/addTimeScheduler?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":' + hotelCode + ',"time":"' + time + '","msg":"' + msg + '","isComplementery":' + isComplementary + '}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					toastr.success('Breakfast Added Successfully.');
					getTimeScheduler();
				} else {
					toastr.error('Breakfast Not Addes.');
				}
			} catch (e) {
				toastr.error('Breakfast Not Added.');
			}
		},
		error : function(xhr, status) {
			toastr.error('Breakfast Not Added.');
		}
	});
}

function addLunchTimeSchedule() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var lunchStartTime = $('#lu_start_time').val().trim();
	var lunchEndTime = $('#lu_end_time').val().trim();
	var time = lunchStartTime + ' - ' + lunchEndTime;
	var msg = 'LUNCH';
	var isComplementary = $('#complementary_lunch').is(":checked");
	var url = 'admin/api/hotel/addTimeScheduler?access_token=' + token;
	/*alert('time : '+time);
	 alert('msg : '+msg);
	 alert('isComplementary : '+isComplementary);*/
	console.log('url : ' + url);
	console.log('{"hotelId":' + hotelCode + ',"time":"' + time + '","msg":"' + msg + '","isComplementery":' + isComplementary + '}');
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":' + hotelCode + ',"time":"' + time + '","msg":"' + msg + '","isComplementery":' + isComplementary + '}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					toastr.success('Lunch Added Successfully.');
					getTimeScheduler();
				} else {
					toastr.error('Lunch Not Addes.');
				}
			} catch (e) {
				toastr.error('Lunch Not Added.');
			}
		},
		error : function(xhr, status) {
			toastr.error('Lunch Not Added.');
		}
	});
}

function addDinnerTimeSchedule() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var dinnerStartTime = $('#dinn_start_time').val().trim();
	var dinnerEndTime = $('#dinn_end_time').val().trim();
	var time = dinnerStartTime + ' - ' + dinnerEndTime;
	var msg = 'DINNER';
	var isComplementary = $('#complementary_dinn').is(":checked");
	var url = 'admin/api/hotel/addTimeScheduler?access_token=' + token;
	/*alert('time : '+time);
	 alert('msg : '+msg);
	 alert('isComplementary : '+isComplementary);*/
	console.log('url : ' + url);
	console.log('{"hotelId":' + hotelCode + ',"time":"' + time + '","msg":"' + msg + '","isComplementery":' + isComplementary + '}');
	//return false;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":' + hotelCode + ',"time":"' + time + '","msg":"' + msg + '","isComplementery":' + isComplementary + '}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					toastr.success('Dinner Added Successfully.');
					getTimeScheduler();
				} else {
					toastr.error('Dinner Not Addes.');
				}
			} catch (e) {
				toastr.error('Dinner Not Added.');
			}
		},
		error : function(xhr, status) {
			toastr.error('Dinner Not Added.');
		}
	});
}

function getTimeScheduler() {
	var hotelId = $.trim($('#hotelCode').val());
	var token = window.localStorage.getItem("token");
	var url = 'admin/api/hotel/getTimeScheduler?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": ' + hotelId + '}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var br_msg="BREAKFAST";
				var lu_msg="LUNCH";
				var dn_msg="DINNER";
				var obj = json;
				if (json.success == true) {
					if (obj['scheduler'].length == 0) {
						document.getElementById("breakfast-timing").reset();
						document.getElementById("lunch-timing").reset();
						document.getElementById("dinner-timing").reset();
					}
					if (obj['scheduler'].length > 0 ) {
						for (var i = 0; obj['scheduler'].length > i; i++) {
							if (obj['scheduler'][i]['msg'] == br_msg) {
								var break_time = obj['scheduler'][i]['time'];
								var res_break = break_time.split("-");
								//Get select object
								var objSelect_st = document.getElementById("br_start_time");
								var objSelect_end = document.getElementById("br_end_time");
								//Set selected
								setSelectedValue_br_start(objSelect_st, res_break[0]);
								setSelectedValue_br_end(objSelect_end, res_break[1]);
								document.getElementById("complementary_break").checked = obj['scheduler'][i]['isComplementery'];
								document.getElementById("break_schedulerId").value = obj['scheduler'][i]['id'];
							}

							if (obj['scheduler'][i]['msg'] == lu_msg) {
								var lunch_time = obj['scheduler'][i]['time'];
								var res_lunch = lunch_time.split("-");
								//Get select object
								var objSelect_st = document.getElementById("lu_start_time");
								var objSelect_end = document.getElementById("lu_end_time");
								//Set selected
								setSelectedValue_br_start(objSelect_st, res_lunch[0]);
								setSelectedValue_br_end(objSelect_end, res_lunch[1]);

								document.getElementById("complementary_lunch").checked = obj['scheduler'][i]['isComplementery'];
								document.getElementById("lunch_schedulerId").value = obj['scheduler'][i]['id'];
							}


							if (obj['scheduler'][i]['msg'] == dn_msg) {

								var dinner_time = obj['scheduler'][i]['time'];
								var res_dinner = dinner_time.split("-");
								//alert(res_dinner[0]+"======"+res_dinner[1]);
								//Get select object
								var objSelect_st = document.getElementById("dinn_start_time");
								var objSelect_end = document.getElementById("dinn_end_time");
								//Set selected
								setSelectedValue_br_start(objSelect_st, res_dinner[0]);
								setSelectedValue_br_end(objSelect_end, res_dinner[1]);
								document.getElementById("complementary_dinn").checked = obj['scheduler'][i]['isComplementery'];
								document.getElementById("dinner_schedulerId").value = obj['scheduler'][i]['id'];

							}

						}
					}
				} else {
					console.log("Error " + json.err);
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {

			//  alert(xhr.status);
			//  alert(xhr.statusText);
			//  alert(xhr.responseText);

		}
	});
}

function setSelectedValue_br_start(selectObj, valueToSet) {

	for (var i = 0; i < selectObj.options.length; i++) {
		if (selectObj.options[i].text == valueToSet.trim()) {
			selectObj.options[i].selected = true;
			return;
		}
	}
}

function setSelectedValue_br_end(selectObj, valueToSet) {
	for (var i = 0; i < selectObj.options.length; i++) {
		if (selectObj.options[i].text == valueToSet.trim()) {
			selectObj.options[i].selected = true;
			return;
		}
	}
}

function brDeleteValidation() {
	var schedulerId = $.trim($('#break_schedulerId').val());
	if (schedulerId <= 0) {
		toastr.error('Invalid Values');
	} else {
		deleteTimeScheduler(schedulerId);
	}
}

function lunchDeleteValidation() {
	var schedulerId = $.trim($('#lunch_schedulerId').val());
	if (schedulerId <= 0) {
		toastr.error('Invalid Values');
	} else {
		deleteTimeScheduler(schedulerId);
	}
}

function dinnerDeleteValidation() {
	var schedulerId = $.trim($('#dinner_schedulerId').val());
	if (schedulerId <= 0) {
		toastr.error('Invalid Values');
	} else {
		deleteTimeScheduler(schedulerId);
	}
}

function deleteTimeScheduler(schedulerId) {
	var token = window.localStorage.getItem("token");
	var hotelId = $.trim($('#hotelCode').val());
	var url = '/admin/api/hotel/deleteTimeScheduler?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": ' + hotelId + ',"schedulerId": ' + schedulerId + '}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (json.success == true) {
					toastr.success('Scheduler Deleted Successfully');
					document.getElementById("breakfast-timing").reset();
					document.getElementById("lunch-timing").reset();
					document.getElementById("dinner-timing").reset();
					getTimeScheduler();
				} else {
					toastr.error('Scheduler Not Deleted');
					console.log("Error " + json.err);
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {

			//  alert(xhr.status);
			//  alert(xhr.statusText);
			//  alert(xhr.responseText);

		}
	});
}

function validateBreakfast() {
	var breakfastStartTime = $('#br_start_time').val().trim();
	var breakfastEndTime = $('#br_end_time').val().trim();
	if (breakfastStartTime == "select" || breakfastEndTime == "select") {
		toastr.error("Please Select Proper Value");
		return false;
	} else {
		return true;
	}
}

function validateLunch() {
	var lunchStartTime = $('#lu_start_time').val().trim();
	var lunchEndTime = $('#lu_end_time').val().trim();
	if (lunchStartTime == "select" || lunchEndTime == "select") {
		toastr.error("Please Select Proper Value");
		return false;
	} else {
		return true;
	}
}

function validateDinner() {
	var dinnerStartTime = $('#dinn_start_time').val().trim();
	var dinnerEndTime = $('#dinn_end_time').val().trim();
	if (dinnerStartTime == "select" || dinnerEndTime == "select") {
		toastr.error("Please Select Proper Value");
		return false;
	} else {
		return true;
	}

}
