/**
 * Created by Ashee on 30-05-2016.
 */

function phonenumber() {
	var inputtxt = document.getElementsByName("guestMob")[0].value.trim();
    var char = inputtxt.substring((inputtxt.length -1),inputtxt.length );
	var phoneno = /^[0-9]$/;
	if (!char.match(phoneno)) {
        inputtxt = inputtxt.substring(0, (inputtxt.length -1));
        document.getElementById("guestMob").value = inputtxt;
        if(isNaN(document.getElementById("guestMob").value)){
            document.getElementById("guestMob").value = '';
        }
	}
}

function guestAdd() {
	/* attach a submit handler to the form */
	event.preventDefault();
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var token = window.localStorage.getItem("token");
	var roomNumber = document.getElementsByName("roomNo")[0].value.trim();
	var mobile = document.getElementsByName("guestMob")[0].value.trim();
	var name = document.getElementsByName("guestName")[0].value.trim();
	var checkoutDate = document.getElementsByName("checkOut")[0].value.trim();
	var isMale=document.getElementById("male").checked;
	var isCorporateEnabled = $('input[name="isCorporate"]:checked').val(); //document.getElementById("isCorporate").checked;
	
	var e = document.getElementById("corporateName");
	var strUser = e.options[e.selectedIndex].text;
	var guestCompany = strUser
	if(isCorporateEnabled == "true" && guestCompany == "Select"){
		toastr.error('Select Corporate name for Guest'); 
	}else{
		//var url = $('#baseurl').val().trim() + 'api/guest/addGuest?access_token=' + token;
		var url = 'api/guest/addGuest?access_token=' + token;
		$.ajax({
			type : 'POST',
			dataType : 'json',
			contentType : 'application/json',
			url : url,
			data : '{"roomNumber":"' + roomNumber + '","hotelId":"' + hotelId + '","mobile":"' + mobile + '","name":"' + name + '","checkoutDate":"' + checkoutDate + '","isMale":"' + isMale + '","isCoporateGuest":"' + isCorporateEnabled + '","guestCompany":"' + guestCompany + '"}',
			success : function(json) {
				//console.log('browser json' + json)
				try {
					var obj = json;
					if (obj['success'] == true) {
						toastr.success('Guest successfully added');
						$("#roomNo").val('');
						$("#guestMob").val('');
						$("#guestName").val('');
						$("#checkOut").val('');
						$("#roomNo option[value='"+roomNumber+"']").remove();
						updateGuestList();
					} else {
						console.log("inserted count is: " + json.insertedCount);
					}
				} catch (e) {
					toastr.error('Guest addition failed');
				}
			},
			error : function() {
				toastr.error('Guest addition failed');
			}
		});
	}

}

function updateGuestList() {
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var token = window.localStorage.getItem("token");
//	var url = 'api/guest/getAllGuest?access_token=' + token;
	var url = 'api/guest/getAllGuest?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":"' + hotelId + '"}',
		success : function(json) {
//			console.log(json);
			try {
				var obj = json;
				var num=0;
				//var guestCode;
				if (obj['success'] == true) {
					var len = obj['guests'].length;
					var tabledata = "<table id=example2 class='table table-bordered table-striped'>"+ 
						"<thead>"+
							"<tr>"+
								"<th>#</th>"+
								"<th>Guest Name</th>"+
								"<th>Room No</th>"+
								"<th>Guest Code</th>"+
								"<th>Action</th>"+
							"</tr>"+
						"</thead>"+
					"<tbody>";
					for (var i = len-1; i >=0; i--) {
						if(obj['guests'][i]['isManualCheckout']==false || obj['guests'][i]['isManualCheckout']==null){
							tabledata = tabledata +
							"<tr>"+ 
								"<td>" + (++num) + "</td>"+ 
								"<td>" + obj['guests'][i]['name'] + "</td>"+
								"<td>" + obj['guests'][i]['roomNumber'] + "</td>"+
								"<td>" + obj['guests'][i]['name'].substring(0, 2).toLowerCase()+''+obj['guests'][i]['guestCode'] + "</td>"+
								"<td><a class='users-list-name' href='#'"+
								"onclick='recordForEdit("+JSON.stringify(obj['guests'][i])+")'>"+
								"<span class='glyphicon glyphicon-edit'></span>"+
								//"<input type='image' src='admin/assets/dist/img/edit.png' width='25' height='25'></td>" +
							"</tr>";
						}
						 
						
					}
					
					tabledata = tabledata + "</tbody></table>";
					document.getElementById('guest-data-table').innerHTML = tabledata;
					$('#example2').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true
						//"order": [[ 3, 'desc' ]]
					});
				} else {					
					var tabledata = "<table id=example2 class='table table-bordered table-striped'>" +
						"<thead>"+
							"<tr>"+
								"<th>#</th>"+
								"<th>Guest Name</th>"+
								"<th>Room No</th>"+
								"<th>Guest Code</th>"+
								"<th>Action</th>"+
							"</tr>"+
						"</thead>"+
					"<tbody>";
					tabledata = tabledata + "</tbody></table>";
					document.getElementById('guest-data-table').innerHTML = tabledata;
					$('#example2').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true,
						
					});
					
				}
			} catch (e) {
				//alert("Unable to fetch data");
			}
		},
		error : function() {
			//alert("Unable to fetch data");
		}
	});
}

var guestRecordForEdit = '';
var recordForEdit = function(guestRecord){
	guestRecordForEdit = guestRecord;
	$('#guest-form-title').text('Update Guest');	
	$('#guestCode').val(guestRecord.guestCode);
	$('#editRoomNo').val(guestRecord.roomNumber);
	$('#editGuestName').val(guestRecord.name);
	$('#editGuestMob').val(guestRecord.mobile);
	$('#editCheckOut').val(guestRecord.checkoutDate);

	if ( window.localStorage.getItem("isCorporateTravelEnabled") == "true" ) {
		document.getElementById("corporatePanelIdEdit").style.display='inline';
		var value = guestRecord.isCoporateGuest ? guestRecord.isCoporateGuest:  "false"  ;

		$("input[name='isCorporateEdit'][value='" + value + "']").prop( "checked", 'checked' );
		$('#corporateNameEdit option').remove();
		$('#corporateNameEdit').append($("<option></option>")
				.text('Select')); 
		if(window.localStorage.getItem("allowedCompany")){
		 var countries = window.localStorage.getItem("allowedCompany").split(',');
		 for(country in countries){
			 if(value == "true" && countries[country] == guestRecord.guestCompany ){
				$('#corporateNameEdit').append($("<option></option>")
				.attr("value",countries[country])
				.attr("selected", "selected")
				.text(countries[country])); 
			 }else{
				$('#corporateNameEdit').append($("<option></option>")
				.attr("value",countries[country])
				.text(countries[country])); 
			 }
		 }
		}
		if(value=="false"){
			$("#corporateNameEdit option:contains('Select')").prop('selected', true);
			$(document.getElementById('corporateNameEdit')).attr({
				'disabled': 'disabled'
			});
		}else{
			$(document.getElementById('corporateNameEdit')).removeAttr('disabled');
		}
	   
	 }
	/*
	$('#editCheckOut').daterangepicker({
			timePicker: true, 
			timePickerIncrement: 30, 
			format: 'MM/DD/YYYY h:mm A',
			drops: "up"
		});*/
	
	var genderMale = guestRecord.isMale;
	if(genderMale == 'true'){
		$("#editMale").prop("checked", true);
	}else{
		$("#editFemale").prop("checked", true);
	}
	$('#add-guest-form').css('display', 'none');
	$('#update-guest-form').css('display', 'block');
};

function guestUpdate() {
	/* attach a submit handler to the form */
	event.preventDefault();
	var oldRoomNumber = guestRecordForEdit.roomNumber;
	var oldName = guestRecordForEdit.name;
	var oldMobile = guestRecordForEdit.mobile;
	var oldCheckoutDate = guestRecordForEdit.checkoutDate;
	var oldGenderMale = guestRecordForEdit.isMale;
	var oldIsCorporateGuest = guestRecordForEdit.isCoporateGuest;
	var oldGuestCompany = guestRecordForEdit.guestCompany;
	
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var token = window.localStorage.getItem("token");
	var guestCode = document.getElementsByName("guestCode")[0].value.trim();
	var roomNumber = document.getElementsByName("editRoomNo")[0].value.trim();
	var mobile = document.getElementsByName("editGuestMob")[0].value.trim();
	var name = document.getElementsByName("editGuestName")[0].value.trim();
	var checkoutDate = document.getElementsByName("editCheckOut")[0].value.trim();
	var isMale = document.getElementById("editMale").checked;
	var isCorporateEnabled = $('input[name="isCorporateEdit"]:checked').val(); //document.getElementById("isCorporateEdit").checked;
	var e = document.getElementById("corporateNameEdit");
	var strUser = e.options[e.selectedIndex].text;
	var guestCompany = strUser
	/*alert(oldRoomNumber == roomNumber);
	alert(oldName == name);
	alert(oldMobile == mobile);
	alert(oldCheckoutDate == checkoutDate);
	alert(oldGenderMale+'');
	alert(isMale+'');
	alert(oldGenderMale+'' == isMale+'');*/
	if(oldRoomNumber == roomNumber && oldName == name 
		&& oldMobile == mobile && oldCheckoutDate == checkoutDate 
		&& oldGenderMale+'' == isMale+''
		&& oldIsCorporateGuest == isCorporateEnabled
		&& oldGuestCompany == guestCompany){
		toastr.error('Invalid operation modify atleast one data');
		return;
	}

	if(isCorporateEnabled == "true" && guestCompany == "Select"){
		toastr.error('Select Corporate name for Guest'); 
		return;
	}
	if(isCorporateEnabled == "false" && guestCompany == "Select"){
		guestCompany = null;
	}

	var url = 'api/guest/updateGuest?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"guestCode":' + guestCode + ',"roomNumber":"' + roomNumber + '","hotelId":"' + hotelId + '","mobile":"' + mobile + '","name":"' + name + '","checkoutDate":"' + checkoutDate + '","isMale":"' + isMale + '","isCoporateGuest":"' + isCorporateEnabled + '","guestCompany":"' + guestCompany + '"}',
		success : function(json) {
			//console.log('browser json' + json)
			try {
				var obj = json;
				if (obj['success'] == true) {
					toastr.success('Guest successfully updated');
					$("#editRoomNo").val('');
					$("#editGuestMob").val('');
					$("#editGuestName").val('');
					$("#editCheckOut").val('');
					$('#guest-form-title').text('Add Guest');
					$('#add-guest-form').css('display', 'block');
					$('#update-guest-form').css('display', 'none');
					updateGuestList();
				} else {
					//console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				toastr.error('Guest updation failed');
			}
		},
		error : function() {
			toastr.error('Guest updation failed');
		}
	});
}