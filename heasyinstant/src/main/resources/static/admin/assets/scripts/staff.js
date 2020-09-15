//var token = window.localStorage.getItem("token");
function getPass(pass){
	var encryptedPass = CryptoJS.AES.encrypt(pass, "STAYOH");
	// Decrypt
	var bytes  = CryptoJS.AES.decrypt(encryptedPass.toString(), 'STAYOH');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
	return encryptedPass.toString();
}

function addStaff() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = $.trim($('#hotelCode').val());
	var departmentId = $.trim($('#staffDept').val());
	var staffEmail = $.trim($('#staffEmail').val());
	var staffMobile = $.trim($('#staffMobile').val());
	var staffUId = $.trim($('#staffuid').val());
	var staffPassword = getPass($.trim($('#staffPwd').val()));
	var staffName = $.trim($('#name').val());
	var staffPermission = $.trim($('#staffPer').val());
	//var base_url = $('#baseurl').val().trim();
	var url = '/api/clients/addStaff?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelCode+' ,"userName":"'+staffUId+'","name":"'+staffName+'", "password":"' +staffPassword+'", "email":"'+staffEmail+'", "mobile":' +staffMobile+', "permission":"' + staffPermission + '","departmentId":"' + departmentId + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				if (json.success == true) {
					document.getElementById("add-staff").reset();
					document.getElementById('hotelCode').value=window.localStorage.getItem("hotelCodeVal");
					toastr.success('Staff successfully added');
					loadStaffsByHotelCode();
				}else{
					//toastr.error('Staff with this Name or Email Id already registered');
				}

			} catch (e) {
				//alert('Add Staff failed');
			}
		},
		error : function(xhr, status) {
			/*alert(xhr.status);
			alert(xhr.statusText);
			alert(xhr.responseText);*/

		}
	});
}


function populateDepartmentList(){
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getDepartmentOfHotel?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+'}',
		success : function(json) {
			try {
				if (json.success == true) {
					for (var i = 0; i < json.res.length; i++) {
						$("#staffDept").append("<option value='"+json.res[i].departmentId+"'>" + json.res[i].name + "</option>");
					}

				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			/*alert(xhr.status);
			alert(xhr.statusText);
			alert(xhr.responseText);*/
		}
	});

}


function loadStaffsByHotelCode(){
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/api/clients/getAllStaff?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+'}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (json.success == true) {
					var num=0;
					var tabledata = "<table id='display_staff_table' class='table table-bordered table-striped'>"+
							"<thead>"+
							"<tr>"+
							"<th>#</th>"+
							"<th>User Name</th>"+
							"<th>User Id</th>"+
							"<th>Department</th>"+
							"<th>Action</th>"+
							"</tr>"+
							"</thead>"+
							"<tbody>";
					for (var i = json.staffs.length-1; i >= 0; i--) {
						console.log(json.staffs[i]);
						tabledata = tabledata +
								"<tr>"+
								"<td>" + (++num) + "</td>"+
								"<td>" + json.staffs[i].name + "</td>"+
								"<td>" + json.staffs[i].userName+ "</td>"+
								"<td>" + json.staffs[i].departmentName + "</td>"+
								"<td><a class='users-list-name' href='#'"+
								"onclick='showRecordForEdit("+JSON.stringify(obj['staffs'][i])+")'>"+
								"<span class='glyphicon glyphicon-edit'></span>"+
								"</tr>";
					}
					tabledata = tabledata + "</tbody></table>";
					document.getElementById('display_staffs').innerHTML = tabledata;

					$('#display_staff_table').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true
					});


				} else {
					var tabledata = "<table id='display_staff_table' class='table table-bordered table-striped'>"+
							"<thead>"+
							"<tr>"+
							"<th>#</th>"+
							"<th>User Name</th>"+
							"<th>User Id</th>"+
							"<th>Department</th>"+
							"<th>Action</th>"+
							"</tr>"+
							"</thead>"+
							"<tbody>";
					document.getElementById('display_staffs').innerHTML = tabledata;
					$('#display_staff_table').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true
					});
				}
			} catch (e) {
				//alert('Exception:'+e);
			}
		},
		error : function(xhr, status) {
			/*alert(xhr.status);
			alert(xhr.statusText);
			alert(xhr.responseText);*/
		}
	});
}



var staffRecordForEdit = '';
var clientId=0;
var showRecordForEdit = function(staffRecord){
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	staffRecordForEdit = staffRecord;
	clientId=staffRecord.clientId;
//	alert("-----"+staffRecord.permission+"---");
	$('#staff-form-title').text('Update Staff');
	$('#edithotelCode').val(hotelCode);
	$('#editStaffName').val(staffRecord.name);
	$('#editStaffMobile').val(staffRecord.mobile);
	$('#editStaffEmail').val(staffRecord.email);
	$('#editStaffPer').val(staffRecord.permission);
	$('#add-staff').css('display', 'none');
	$('#update-staff').css('display', 'block');
};



function updateStaff(){
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var oldStaffEmail=staffRecordForEdit.email;
	var oldStaffMobile=staffRecordForEdit.mobile;
	var oldStaffName=staffRecordForEdit.name;
	var oldstaffPermission=staffRecordForEdit.permission;
	var staffEmail = document.getElementById("editStaffEmail").value;
	var staffMobile = document.getElementById("editStaffMobile").value;
	var staffName = document.getElementById("editStaffName").value;
	var staffPermission = document.getElementById("editStaffPer").value;
	//var base_url = $('#baseurl').val().trim();

	if(oldStaffEmail == staffEmail && oldStaffMobile == staffMobile
			&& oldStaffName == staffName && oldstaffPermission == staffPermission){
		toastr.error('Invalid operation modify atleast one data');
		return;
	}


	var url = '/api/clients/editStaff?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"clientId": '+clientId+',"name":"'+staffName+'","email":"'+staffEmail+'", "mobile":' +staffMobile+', "permission":"' + staffPermission + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				if (json.success == true) {
					document.getElementById("add-staff").reset();
					document.getElementById('hotelCode').value=window.localStorage.getItem("hotelCodeVal");
					toastr.success('Staff successfully updated');
					$('#staff-form-title').text('Add Staff');
					$('#add-staff').css('display', 'block');
					$('#update-staff').css('display', 'none');
					loadStaffsByHotelCode();
				}else{
					//toastr.error('Staff with this Name or Email Id already registered');
				}

			} catch (e) {
				//alert('Update Staff failed');
			}
		},
		error : function(xhr, status) {
			/*alert(xhr.status);
			alert(xhr.statusText);
			alert(xhr.responseText);*/

		}
	});

}

