function addDept() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var departmentName = $.trim($('#deptName').val().toUpperCase());
	var departmentDesc = $.trim($('#deptDesc').val());
	//var url = $('#baseurl').val().trim() + '/admin/api/hotel/addDepartmentToHotel?access_token=' + token;
	var url = '/admin/api/hotel/addDepartmentToHotel?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+' ,"departmentName":"' + departmentName + '","departmentDesc":"' + departmentDesc + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					document.getElementById("add-dept").reset();
					$("#deptName").removeAttr("disabled");
					document.getElementById('hotelCode').value=window.localStorage.getItem("hotelCodeVal");
					toastr.success('Department successfully added');
					loadDeptsByHotelCode(hotelCode);


				} else {
					console.log("addDept failed");
					toastr.error('Department is already present');
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			toastr.error('Add Department failed');


		}
	});
}

function checkType(){
	var isFrontDesk = $('#isFrontDesk:checked').is(":checked");
	if(isFrontDesk == true){
		$.trim($('#deptName').val('FRONT-DESK'));
		$("#deptName").attr("disabled", "disabled");
	}else{
		$.trim($('#deptName').val(''));
		$("#deptName").removeAttr("disabled");
	}
}

function loadDeptsByHotelCode(hotelCode){
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	hotelCode = window.localStorage.getItem("hotelCodeVal");
	var dTable = $('#display_dept_table').dataTable();
	//var base_url = $('#baseurl').val().trim();
	var url = '/admin/api/hotel/getDepartmentOfHotel?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+'}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				if (json.success == true) {
					var num=0;
					var tabledata = "<table id=example2 class='table table-bordered table-striped'>" +
							"<thead>"+
							"<tr>"+
							"<th>#</th>"+
							"<th>Department Name</th>"+
							"<th>Description</th>"+
							"<th>Action</th>"+
							"</tr>"+
							"</thead>"+
							"<tbody>";
					for (var i = json.res.length-1; i >= 0; i--) {
						tabledata = tabledata +
								"<tr>"+
								"<td>" + (++num) + "</td>"+
								"<td>" + json.res[i].name+ "</td>"+
								"<td>" + json.res[i].desc + "</td>"+
								"<td><a class='users-list-name' href='#'"+
								"onclick='showRecordForEdit("+JSON.stringify(json.res[i])+")'>"+
								"<span class='glyphicon glyphicon-edit'></span>"+
								"</tr>";
					}
					tabledata = tabledata + "</tbody></table>";
					document.getElementById('display_depts').innerHTML = tabledata;

					$('#example2').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true
					});
				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {

		}
	});
}

var departmentRecordForEdit = '';
var showRecordForEdit = function(departmentRecord){
	//alert('in function showRecordForEdit : '+departmentRecord);
	departmentRecordForEdit = departmentRecord;
	$('#dept-form-title').text('Update Department');
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	$('#updateHotelCode').val(hotelCode);
	$('#updateDeptId').val(departmentRecord.departmentId);
	$('#updateDeptName').val(departmentRecord.name);
	$('#updateDeptDesc').val(departmentRecord.desc);
	$('#add-dept').css('display', 'none');
	$('#update-dept').css('display', 'block');
};

function updateDept() {
	//alert('inside updateDept');
	event.preventDefault();
	var oldDepartmentName = departmentRecordForEdit.name;
	var oldDepartmentDesc = departmentRecordForEdit.desc;

	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var departmentId = $.trim($('#updateDeptId').val());
	var departmentName = $.trim($('#updateDeptName').val().toUpperCase());
	var departmentDesc = $.trim($('#updateDeptDesc').val());
	if(oldDepartmentName == departmentName && oldDepartmentDesc == departmentDesc){
		toastr.error('Invalid operation modify atleast one data');
		return;
	}
	//var url = $('#baseurl').val().trim() + '/admin/api/hotel/editDepartmentOfHotel?access_token=' + token;
	var url = '/admin/api/hotel/editDepartmentOfHotel?access_token=' + token;
	//console.log('{"hotelCode": '+hotelCode+', "departmentId": '+departmentId+', "name": "' + departmentName +'", "desc": "' + departmentDesc + '"}');
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+', "departmentId": '+departmentId+', "name": "' + departmentName +'", "desc": "' + departmentDesc + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					document.getElementById("update-dept").reset();
					$("#updateDeptName").removeAttr("disabled");
					document.getElementById('hotelCode').value=window.localStorage.getItem("hotelCodeVal");
					toastr.success('Department successfully updated');
					loadDeptsByHotelCode(hotelCode);
				} else {
					toastr.error('Department is already present');
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			toastr.error('Update Department failed');
		}
	});
}
