function addRoom() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var roomNumber = $.trim($('#roomNumber').val().toUpperCase());
    var roomDes = $.trim($('#roomDes').val());
    var roomType = $.trim($('#roomType').val().toUpperCase());
    var roomFloor = $.trim($('#roomFloor').val().toUpperCase());
	var url = '/admin/api/hotel/addRoomToHotel?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+' ,"roomType":"' + roomType + '","desc":"' + roomDes + '","roomNumber":"' + roomNumber + '","floor":"' + roomFloor + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					document.getElementById("add-room").reset();
					$("#deptRoom").removeAttr("disabled");
					document.getElementById('hotelCode').value=window.localStorage.getItem("hotelCodeVal");
                    toastr.success('Room successfully added');
					loadRoomByHotelCode(hotelCode);
				} else {
					console.log("addRoom failed");
					toastr.error('Room is already present');
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			toastr.error('Add Room failed');


		}
	});
}


function loadRoomByHotelCode(hotelCode){
    event.preventDefault();
	var token = window.localStorage.getItem("token");
	hotelCode = window.localStorage.getItem("hotelCodeVal");
	var dTable = $('#display_room_table').dataTable();
	//var base_url = $('#baseurl').val().trim();
	var url = '/admin/api/hotel/viewHotelRoom?access_token=' + token;
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
							"<th>Room Number</th>"+
                            "<th>Type</th>"+
                            "<th>Floor</th>"+
                            "<th>Availability</th>"+
                            "<th>Description</th>"+
							"</tr>"+
							"</thead>"+
							"<tbody>";
					for (var i = json.room.length-1; i >= 0; i--) {
                        var availability = "";
                        var td = "";
                        if(json.room[i].availability){
                            availability = "Available";
                            td = "<td style='color:green'>" + availability + "</td>";
                        }else{
                            availability = "Booked"
                            td = "<td style='color:red'>" + availability + "</td>";
                        }
                        
						tabledata = tabledata +
								"<tr>"+
								"<td>" + (++num) + "</td>"+
								"<td>" + json.room[i].roomNumber+ "</td>"+
                                "<td>" + json.room[i].roomType + "</td>"+
                                "<td>" + json.room[i].floor + "</td>"+
                                td+
                                "<td>" + json.room[i].desc + "</td>"+
								"<td><a class='users-list-name' href='#'"+
								"onclick='roomForEdit("+JSON.stringify(json.room[i])+")'>"+
								"<span class='glyphicon glyphicon-edit'></span>"+ "</td>"+
                                "</tr>";
					}
					tabledata = tabledata + "</tbody></table>";
					document.getElementById('display_rooms').innerHTML = tabledata;

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

var roomForEdit = function(room){
	//alert('in function showRecordForEdit : '+departmentRecord);
	$('#dept-form-title').text('Update Room');
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	$('#updateHotelCode').val(hotelCode);
	$('#updateRoomNumber').val(room.roomNumber);
	$('#updateRoomDes').val(room.desc);
    $('#updateRoomType').val(room.roomType);
    $('#updateRoomFloor').val(room.floor);
	$('#add-room').css('display', 'none');
	$('#update-room').css('display', 'block');
};

function updateRoom() {
	//alert('inside updateDept');
	event.preventDefault();

	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var updateRoomNumber = $.trim($('#updateRoomNumber').val());
	var updateRoomDes = $.trim($('#updateRoomDes').val());
    var updateRoomType = $.trim($('#updateRoomType').val());
    var updateRoomFloor = $.trim($('#updateRoomFloor').val());
	var url = '/admin/api/hotel/updateRoomToHotel?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelCode+' ,"roomType":"' + updateRoomType + '","desc":"' + updateRoomDes + '","roomNumber":"' + updateRoomNumber + '","floor":"' + updateRoomFloor + '"}',
		success : function(json) {
			console.log('browser json' + json);
			try {
				var obj = json;
				if (obj['success'] == true) {
					document.getElementById("update-room").reset();
					$("#updateRoomNumber").removeAttr("disabled");
					document.getElementById('hotelCode').value=window.localStorage.getItem("hotelCodeVal");
					toastr.success('Room successfully updated');
					loadRoomByHotelCode(hotelCode);
				} else {
					toastr.error('Room is already present');
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			toastr.error('Update Room failed');
		}
	});
}