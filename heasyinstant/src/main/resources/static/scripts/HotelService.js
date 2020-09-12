var addSubitemRow = 1;
var countForEditItem = 1;
function loadDeptsByHotelCodeForService(){
	countForEditItem = 1;
	//alert('countForEditItem value : '+countForEditItem);
	$('#serviceTitle').text("Services");
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
			console.log(json);
			try {
				if (json.success == true) {
					$("#department").html('');
					$("#department").append("<option value=''>Select</option>");
					$("#editDepartment").html('');
					$("#editDepartment").append("<option value=''>Select</option>");
					for (var i = 0; i < json.res.length; i++) {
					 	$("#department").append("<option value='"+json.res[i].departmentId+"'>" + json.res[i].name + "</option>");
						$("#editDepartment").append("<option value='"+json.res[i].departmentId+"'>" + json.res[i].name + "</option>");
					}
					getHotelDetailsByHotelCode();
					getHotelDetailsByHotelCodeForServiceGrid();
					//document.getElementById("display_depts").style.display="block";
				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {
				
			}
		},
		error : function(xhr, status) {
			console.log(xhr.status);
			console.log(xhr.statusText);
			console.log(xhr.responseText);
		}
	});
	$("#add_row").click(function(){
		//alert('add row : '+addSubitemRow);
		$('#addr'+addSubitemRow).html('');
		var tr = "<tr id='addr"+addSubitemRow+"'>"+
		"<td>"+(addSubitemRow + 1)+"</td>"+
		"<td><input name='subItemName"+addSubitemRow+"' id='subItemName"+addSubitemRow+"' type='text' placeholder='Enter Sub Item Name' class='subItemNameCls'/></td>"+
		"<td><input name='subItemQuantity"+addSubitemRow+"' id='subItemQuantity"+addSubitemRow+"' type='text' placeholder='Enter Sub Item Quantity' class='form-control'/></td>"+
		"<td><input name='subItemPrice"+addSubitemRow+"' id='subItemPrice"+addSubitemRow+"' type='text' placeholder='Enter Sub Item Price' class='form-control'/></td></tr>";
		$('#tab_logic').append(tr);
		addSubitemRow++;
		$('.subItemNameCls').each(function() {
			$(this).rules("add", {
				required: true,
				messages:{
					required:"Required !"
				}
			})
		});
	});
	$("#delete_row").click(function(){
		//alert('delete row : '+addSubitemRow);
		//return false;
		if(addSubitemRow>1){
			//$("#addr"+(i-1)).html('');
			//$('#tab_logic').html("<tr id='addr"+(i-1)+"'></tr>");
			document.getElementById("tab_logic").deleteRow((addSubitemRow));
			addSubitemRow--;
		}
	});
	$("#edit_add_row").click(function(){
		//alert('add edit add row : '+countForEditItem);
		//$('#editaddr'+countForEditItem).html('');
		var tr = "<tr id='editaddr"+countForEditItem+"'>"+
		"<td>"+(countForEditItem)+"</td>"+
		"<td><input name='editSubItemName"+countForEditItem+"' id='editSubItemName"+countForEditItem+"' type='text' placeholder='Enter Sub Item Name' class='subItemNameCls'/></td>"+
		"<td><input name='editSubItemQuantity"+countForEditItem+"' id='editSubItemQuantity"+countForEditItem+"' type='text' placeholder='Enter Sub Item Quantity' class='form-control'/></td>"+
		"<td><input name='editSubItemPrice"+countForEditItem+"' id='editSubItemPrice"+countForEditItem+"' type='text' placeholder='Enter Sub Item Price' class='form-control'/></td></tr>";
		$('#edit_tab_logic').append(tr);
		countForEditItem++;
		$('.subItemNameCls').each(function() {
			$(this).rules("add", {
				required: true,
				messages:{
					required:"Required !"
				}
			})
		});
	});
	$("#edit_delete_row").click(function(){
		//alert('delete edit add row : '+countForEditItem);
		if(countForEditItem>1){
			//$("#addr"+(countForEditItem-1)).html('');
			//$('#tab_logic').html("<tr id='addr"+(countForEditItem-1)+"'></tr>");
			document.getElementById("edit_tab_logic").deleteRow((countForEditItem-1));
			countForEditItem--;
		}
	});
	$('#startTime').timepicker();
	$('#endTime').timepicker();
	$('#editStartTime').timepicker();
	$('#editEndTime').timepicker();
}
function getHotelDetailsByHotelCode(){
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getHotelDetail?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelId+'}',
		success : function(json) {
			console.log(json);
			try {
				if (json.success == true) {
					if(json.hotel.services == null){
						var tabledata = "<table id='display_services_table' class='table table-bordered table-striped'>"+ 
						"<thead>"+
							"<tr>"+
								"<th>#</th>"+
								"<th>Service Name</th>"+
								"<th>Timing</th>"+
								"<th>Action</th>"+
							"</tr>"+
						"</thead>"+ 
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('service-data-table').innerHTML = tabledata;
						$('#display_services_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						var services = json.hotel.services;
						var tabledata = "<table id='display_services_table' class='table table-bordered table-striped'>"+
						"<thead>"+
							"<tr>"+
								"<th>#</th>"+
								"<th>Service Name</th>"+
								"<th>Timing</th>"+
								"<th>Action</th>"+
							"</tr>"+
						"</thead>"+
						"<tbody>";
						for (var i = 0; i < services.length; i++) {
							tabledata = tabledata+
							"<tr>"+
								"<td>" + (i+1) + "</td>"+
								"<td>" + services[i].name + "</td>"+
								"<td>" + services[i].timing + "</td>"+
								"<td><a class='users-list-name' href='#'"+
								"onclick='showServiceRecordForEdit("+JSON.stringify(services[i])+")'>"+
								"<span class='glyphicon glyphicon-edit'></span>"+
								//"<input type='image' src='admin/assets/dist/img/edit.png' width='25' height='25'></td>" +
							"</tr>";
						}
						//debugger;
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('service-data-table').innerHTML = tabledata;
						$('#display_services_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}    
				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {
			console.log("error"+e);	
			}
		},
		error : function(xhr, status) {
			/*alert(xhr.status);
			alert(xhr.statusText);
			alert(xhr.responseText);*/
		}
	});
}
var serviceId=0;
var serviceRecordForEdit = '';
var showServiceRecordForEdit = function(serviceRecord){
	serviceRecordForEdit = serviceRecord;
	//alert('in function showServiceRecordForEdit : '+serviceRecord);
	$('#service_title').text('Update Services');
	$('#editDepartment').val(serviceRecord.departmentId);
	$('#editServiceName').val(serviceRecord.name);
	$('#editServiceDesc').val(serviceRecord.desc);
	$('#editCGST').val(serviceRecord.cgst);
	$('#editSGST').val(serviceRecord.sgst);
	$('#editOtherTax').val(serviceRecord.otherTax);
	var isDeliverable = serviceRecord.isDeliverable;
	if(isDeliverable == 'true'){
		$('#editIsDeliverable').prop('checked', true);
	}else{
		$('#editIsDeliverable').prop('checked', false);
	}
	serviceId=serviceRecord.id;
	var timing = serviceRecord.timing;
	var timingStr = timing.split(' - ');
	//alert('start time :'+timingStr[0]+':');
	//alert('end time :'+timingStr[1]+':');
	$('#editStartTime').val(timingStr[0]);
	$('#editEndTime').val(timingStr[1]);
	if(serviceRecord.thumbnail == '' || serviceRecord.thumbnail.length == 0){
	
	}else{
		$('#editSelectedImage').html('<img width=10% style=margin-left:25%;margin-top:-7%; src=/images/service-icon/'+ serviceRecord.thumbnail +'>');
		$('#edit_service_thumbnail').val(serviceRecord.thumbnail);
	}
	if(serviceRecord.background == '' || serviceRecord.background.length == 0){
	
	}else{
		$('#edit_bkg_selectedImage').html('<img width=10% style=margin-left:25%;margin-top:-7%; src=/images/service-background/'+ serviceRecord.background +'>');
		$('#edit_bkimgs_thumbnail').val(serviceRecord.background);
	}
	$('#add-service').css('display', 'none');
	$('#update-service').css('display', 'block');
};

function updateServices(){
	//alert('in function updateServices');
	event.preventDefault();
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
    var token = window.localStorage.getItem("token");
	var oldDepartmentId = serviceRecordForEdit.departmentId;
	var oldServiceName = serviceRecordForEdit.name;
    var oldServiceDesc = serviceRecordForEdit.desc;
    var oldIsDeliverable = serviceRecordForEdit.isDeliverable;
    var oldTimeRange = serviceRecordForEdit.timing;

    var oldThumbnail = serviceRecordForEdit.thumbnail;
    var oldBackground = serviceRecordForEdit.background;
    
    var oldSGST = serviceRecordForEdit.sgst;
    var oldCGST = serviceRecordForEdit.cgst;
    var oldOtherTax = serviceRecordForEdit.otherTax;
    
    var departmentId = $("#editDepartment :selected").val();
	var serviceName = $('#editServiceName').val().trim();
    var serviceDesc = $('#editServiceDesc').val().trim();
    var isDeliverable = $('#editIsDeliverable:checked').is(":checked");
    var startTime = $('#editStartTime').val().trim();
	var endTime = $('#editEndTime').val().trim();
    var timeRange = startTime +' - '+ endTime;
    var thumbnail = $('#edit_service_thumbnail').val().trim();
    var background = $('#edit_bkimgs_thumbnail').val().trim();
    var SGST = $('#editSGST').val().trim();
    var CGST = $('#editCGST').val().trim();
    var otherTax = $('#editOtherTax').val().trim();
    
	var url = '/admin/api/hotel/updateService?access_token=' + token;
	
	if(oldDepartmentId == departmentId && oldServiceName == serviceName 
		&& oldServiceDesc == serviceDesc && oldIsDeliverable+'' == isDeliverable+'' 
		&& oldTimeRange == timeRange && oldThumbnail == thumbnail 
		&& oldBackground == background && oldSGST == SGST && oldCGST == CGST && otherTax == oldOtherTax){
		toastr.error('Invalid operation modify atleast one data');
		return;
	}
	console.log(url);
	console.log('{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"name":"' + serviceName + 
				'","departmentId":"' + departmentId + '","desc":"' + serviceDesc + 
				'","isDeliverable":"' + isDeliverable + '","timing":"' + timeRange + 
				'","background":"'+background+
				'","cgst":"'+CGST+
				'","sgst":"'+SGST+
				'","otherTax":"'+otherTax+
				'","thumbnail":"' + thumbnail +'"}');
	$.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: url,
        data: '{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"name":"' + serviceName + 
				'","departmentId":"' + departmentId + '","desc":"' + serviceDesc + 
				'","isDeliverable":"' + isDeliverable + '","timing":"' + timeRange + 
				'","background":"'+background+
				'","cgst":"'+CGST+
				'","sgst":"'+SGST+
				'","otherTax":"'+otherTax+
				'","thumbnail":"' + thumbnail +'"}',
        success: function (json) {
            console.log('browser json' + json);
            try {
                var obj = json;
				if (obj['success'] == true) {
					document.getElementById("update-service").reset();
					$("#edit_cancel_vc_modal").click();
					$("#edit_bkimgs_cancel_vc_modal").click();
					toastr.success('Service successfully updated');
					$('#service_title').text('Add Services');
					$('#add-service').css('display', 'block');
					$('#update-service').css('display', 'none');
					getHotelDetailsByHotelCode();
                } else {
                	toastr.error('Service not updated');
                    console.log("inserted count is: " + json.insertedCount);
                }
            } catch (e) {
            	toastr.error('Service not updated');
            }
        },
        error: function (xhr, status) {
        	toastr.error('Service not updated');
        }
    });
}
function getHotelDetailsByHotelCodeForServiceGrid(){
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getHotelDetail?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelId+'}',
		success : function(json) {
			console.log(json);
			try {
				if (json.success == true) {
					if(json.hotel.services == null){
						/*var serviceGrid = "<div class='col-lg-3 col-xs-6'>"
						+"<div class='small-box bg-aqua'>"
						+"<input type='image' src='admin/assets/dist/img/plus-24-128.png'" 
						+"class='btn btn-info btn-sm' width='100' height='100' id='showAddServiceDiv'>"
						+"<a class='users-list-name' href='#'>Add Services</a>"
						+"<span class='users-list-date'></span></div></div>";*/
						var serviceGrid = "<div class='col-lg-3 col-xs-6'>"+
						"<div class='small-box bg-aqua'>"+
							"<div class='inner'>"+
								"<div class='row-fluid' id='checked-cust' style='width: 70%'>"+
									"<input type='hidden' name='serviceId' id='serviceId'>"+
									"<input type='hidden' name='serviceName' id='serviceName'>"+
									"<a href=# rel='tooltip' title='' class='small-box-footer' style='text-decoration:none' "+
									"id='showAddServiceDiv'>"+
									"<h3 class='heading' style='color:#FFF;font-size: 30px'>Add Service<sup style='font-size: 20px'></h3></a>"+
								"</div>"+
								"<p style='color:#00C0Ef'>.</p>"+
							"</div>"+
							"<div class='icon'>"+
								"<i class='ion-ios-plus' style='cursor:pointer;' onclick='showAddServiceDivFun()'></i>"+
							"</div>"+
							"<a href=# class='small-box-footer' "+
								"onclick=showAddServiceDivFun()>"+"Add Service <i class='fa fa-arrow-circle-right'></i></a>"+
						"</div>"+
						"</div>";
						document.getElementById('list').innerHTML =serviceGrid;
						$("#showAddServiceDiv").click(function() {
							$('#serviceTitle').text("Services");
							$("#service_grid").css("display", "none");
							$("#add_service_hotel").css("display", "block");
						});
					}else{
						/*var serviceGrid = "<div class='col-lg-3 col-xs-6'>"
						+"<div class='small-box bg-aqua'>"
						+"<input type='image' src='admin/assets/dist/img/plus-24-128.png'" 
						+"class='btn btn-info btn-sm' width='100' height='100' id='showAddServiceDiv'>"
						+"<a class='users-list-name' href='#'>Add Services</a>"
						+"<span class='users-list-date'></span></div></div>";*/
						var serviceGrid = "<div class='col-lg-3 col-xs-6'>"+
						"<div class='small-box bg-aqua'>"+
							"<div class='inner'>"+
								"<div class='row-fluid' id='checked-cust' style='width: 70%'>"+
									"<input type='hidden' name='serviceId' id='serviceId'>"+
									"<input type='hidden' name='serviceName' id='serviceName'>"+
									"<a href=# rel='tooltip' title='' class='small-box-footer' style='text-decoration:none' "+
									"id='showAddServiceDiv'>"+
									"<h3 class='heading' style='color:#FFF;font-size: 30px'>Add Service<sup style='font-size: 20px'></h3></a>"+
								"</div>"+
								"<p style='color:#00C0Ef'>.</p>"+
							"</div>"+
							"<div class='icon'>"+
								"<i class='ion-ios-plus' style='cursor:pointer;' onclick='showAddServiceDivFun()'></i>"+
							"</div>"+
							"<a href=# class='small-box-footer' "+
								"onclick=showAddServiceDivFun()>"+"Add Service <i class='fa fa-arrow-circle-right'></i></a>"+
						"</div>"+
						"</div>";
						var services = json.hotel.services;
						for (var i = 0; i < services.length; i++) {
							var serviceName = '';
							if(services[i].name.length <= 9){
								serviceName = services[i].name;
							}else{
								serviceName = services[i].name.substring(0, 7) + '...';
							}
							if(services[i].name == 'HOUSE-KEEPING' 
								|| services[i].name == 'MAINTENANCE'){
								serviceGrid = serviceGrid+
								"<div class='col-lg-3 col-xs-6'>"+
								"<div class='small-box bg-aqua'>"+
									"<div class='inner'>"+
										"<div class='row-fluid' id='checked-cust' style='width: 70%'>"+
											"<input type='hidden' name='serviceId"+i+"' id='serviceId"+i+"' value='"+services[i].id+"'>"+
											"<input type='hidden' name='serviceName"+i+"' id='serviceName"+i+"' value='"+services[i].name+"'>"+
											"<a href=# rel='tooltip' title='"+services[i].name+"' class='small-box-footer' style='text-decoration:none' "+
											"onclick=showSubitems('"+i+"')>"+
											"<h3 class='heading' style='color:#FFF;font-size: 30px'>"+serviceName+"<sup style='font-size: 20px'></h3></a>"+
										"</div>"+
										"<p>"+services[i].timing+"</p>"+
									"</div>"+
									"<div class='icon'>"+
										"<i class='ion-ios-paper' style='cursor:pointer;' onclick=showitems('"+i+"')></i>"+
									"</div>"+
									"<a class='small-box-footer' "+
										"style='cursor:default;'>"+"Create Offer <i class='fa fa-arrow-circle-right'></i></a>"+
								"</div>"+
								"</div>";															
							}else{
								serviceGrid = serviceGrid+
								"<div class='col-lg-3 col-xs-6'>"+
								"<div class='small-box bg-aqua'>"+
									"<div class='inner'>"+
										"<div class='row-fluid' id='checked-cust' style='width: 70%'>"+
											"<input type='hidden' name='serviceId"+i+"' id='serviceId"+i+"' value='"+services[i].id+"'>"+
											"<input type='hidden' name='serviceName"+i+"' id='serviceName"+i+"' value='"+services[i].name+"'>"+
											"<a href=# rel='tooltip' title='"+services[i].name+"' class='small-box-footer' style='text-decoration:none' "+
											"onclick=showSubitems('"+i+"')>"+
											"<h3 class='heading' style='color:#FFF;font-size: 30px'>"+serviceName+"<sup style='font-size: 20px'></h3></a>"+
										"</div>"+
										"<p>"+services[i].timing+"</p>"+
									"</div>"+
									"<div class='icon'>"+
										"<i class='ion-ios-paper' style='cursor:pointer;' onclick=showitems('"+i+"')></i>"+
									"</div>"+
									"<a href=# class='small-box-footer' "+
										"onclick=createOffer('"+i+"')>"+"Create Offer <i class='fa fa-arrow-circle-right'></i></a>"+
								"</div>"+
								"</div>";							
							}
						}
						document.getElementById('list').innerHTML =serviceGrid;
						$("#showAddServiceDiv").click(function() {
							$('#serviceTitle').text("Services");
							$("#service_grid").css("display", "none");
							$("#add_service_hotel").css("display", "block");
						});
						$('[rel="tooltip"]').tooltip();
					}
				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {
			console.log("error"+e);	
			}
		},
		error : function(xhr, status) {
			console.log(xhr.status);
			console.log(xhr.statusText);
			console.log(xhr.responseText);
		}
	});
}
function showAddServiceDivFun(){
	$('#serviceTitle').text("Services");
	$("#service_grid").css("display", "none");
	//alert("3");
	$("#add_service_hotel").css("display", "block");
}
function createOffer(row){
	var serviceName = $('#serviceName'+row).val();
	var serviceId = $('#serviceId'+row).val();
	//alert('inside createOffer for service id : '+serviceId);
	window.localStorage.setItem("offerServiceId", null);
	window.localStorage.setItem("offerServiceName", null);
	window.localStorage.setItem("offerShowType", null);
	window.localStorage.setItem("offerServiceId", serviceId);
	window.localStorage.setItem("offerServiceName", serviceName);
	window.localStorage.setItem("offerShowType", "add");
	$("#main-content").load("admin/offer.html");
}
function showitems(row){
	var serviceName = $('#serviceName'+row).val();
	var serviceId = $('#serviceId'+row).val();
	//alert('inside showitems serviceId : '+serviceId+', serviceName : '+serviceName);
	$('#serviceTitle').text(serviceName);
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getServiceItemsByserviceId?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelId+',"serviceId":' + serviceId +'}',
		success : function(json) {
			console.log(json);
			try {
				if (json.success == true) {
					if(json.serviceItems == null){
						var tabledata = "<table id='display_item_table' class='table table-bordered table-striped'>"+ 
						"<thead><tr>"+
						"<th>#</th>"+
						"<th>Item Name</th>"+
						"<th>Item Desc</th>"+
						"<th>Item Quantity</th>"+
						"<th>Item Unit</th>"+
						"<th>Action</th>"+
						"</tr></thead>" +
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('display_item_table').innerHTML = tabledata;
						document.getElementById('service_grid').style.display = 'none';
						document.getElementById("display_item_div").style.display = "block";
						$('#display_item_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						//alert('else');
						//$('#item-data-table').html("<table id='display_item_table' class='table table-bordered table-striped'></table>");
						var serviceItems = json.serviceItems;
						var tabledata = "<table id='display_item_table' class='table table-bordered table-striped'>" + 
						"<thead><tr>"+
						"<th>#</th>"+
						"<th>Item Name</th>"+
						"<th>Item Desc</th>"+
						"<th>Item Quantity</th>"+
						"<th>Item Unit</th>"+
						"<th>Action</th>"+
						"</tr></thead>" + 
						"<tbody>";
						for (var i = 0; i < serviceItems.length; i++) {
							tabledata = tabledata + "<tr>" + 
							"<td>" + (i+1) + "</td>" + 
							"<td>" + serviceItems[i].name + "</td>" + 
							"<td>" + serviceItems[i].desc + "</td>" + 
							"<td>" + serviceItems[i].qty + "</td>" + 
							"<td>" + serviceItems[i].unit + "</td>" + 
							"<td>"+
							"<a class='users-list-name' href='#'"+
							"onclick='showSubitemDiv("+ JSON.stringify(serviceItems[i]) +")'>"+
							"<input type='image' src='admin/assets/dist/img/View_Details.png'"+
							"width='15' height='15'>" +
							"<div class='vcenter'>"+
							"<a class='users-list-name' href='#'"+
							"onclick='showRecordForItemEdit("+(i+1)+", "+JSON.stringify(serviceItems[i])+", "+ serviceId +", "+"\""+serviceName+"\")'>"+
							"<span class='glyphicon glyphicon-edit'></span>"+
							"</div>"+
							"</td></tr>";
						}
						tabledata = tabledata + "</tbody></table>";
						//alert('tabledata : '+tabledata);
						//alert(document.getElementById('display_item_table').innerHTML);
						//document.getElementById('item-data-table').innerHTML = tabledata;
						$('#item-data-table').html(tabledata);
						//alert("5");
						document.getElementById("view_item").style.display = "block";
						document.getElementById("display_item_div").style.display = "block";
						document.getElementById('service_grid').style.display = 'none';
						$('#display_item_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}    
				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {
				console.log("error"+e);	
			}
		},
		error : function(xhr, status) {
			console.log(xhr.status);
			console.log(xhr.statusText);
			console.log(xhr.responseText);
		}
	});
}
function showSubitemDiv(serviceItemObj){
	var subItems = serviceItemObj.item;
	//alert('inside showSubitemDiv subItems : '+subItems.length);
	if(subItems.length == 0){
		var tabledata = "<table id='display_subitem_table' class='table table-bordered table-striped'>"+ 
		"<thead><tr>"+
		"<th>#</th>"+
		"<th>Sub Item Name</th>"+
		"<th>Sub Item Quantity</th>"+
		"<th>Sub Item Price</th>"+
		"</tr></thead>" +
		"<tbody>";
		tabledata = tabledata + "</tbody></table>";
		document.getElementById('display_subitem_table').innerHTML = tabledata;
		document.getElementById('service_grid').style.display = 'none';
		document.getElementById("display_subitem_div").style.display = "block";
		$('#display_subitem_table').DataTable({
			"paging" : true,
			"lengthChange" : true,
			"searching" : true,
			"ordering" : true,
			"info" : true,
			"autoWidth" : true
		});
	}else{
		var tabledata = "<table id='display_subitem_table' class='table table-bordered table-striped'>" + 
		"<thead><tr>"+
		"<th>#</th>"+
		"<th>Sub Item Name</th>"+
		"<th>Sub Item Quantity</th>"+
		"<th>Sub Item Price</th>"+
		"</tr></thead>" + 
		"<tbody>";
		for (var i = 0; i < subItems.length; i++) {
			tabledata = tabledata + "<tr>" + 
			"<td>" + (i+1) + "</td>" + 
			"<td>" + subItems[i].name + "</td>" + 
			"<td>" + subItems[i].qty + "</td>" + 
			"<td>" + subItems[i].price + "</td>" +
			"</tr>";
		}
		tabledata = tabledata + "</tbody></table>";
		document.getElementById('display_subitem_table').innerHTML = tabledata;
		document.getElementById('service_grid').style.display = 'none';
		document.getElementById("display_subitem_div").style.display = "block";
		if ( $.fn.DataTable.isDataTable('#display_subitem_table') ) {
			$('#display_subitem_table').DataTable().destroy();
			
		}
		$('#display_subitem_table').DataTable({
			"paging" : true,
			"lengthChange" : true,
			"searching" : true,
			"ordering" : true,
			"info" : true,
			"autoWidth" : true
		});
	}
}
var serviceItemForEdit = '';
function showRecordForItemEdit(row, serviceItemObj, serviceId, serviceName){
	//alert('row : '+row);
	//alert('serviceItemObj : '+serviceItemObj);
	//alert('serviceId : '+serviceId);
	//alert('serviceName : '+serviceName);
	serviceItemForEdit = serviceItemObj;
	$('#editServiceId').val(serviceId);
	$('#editServiceItemId').val(serviceItemObj.serviceItemId);
	$('#editItemName').val(serviceItemObj.name);
	$('#editItemDesc').val(serviceItemObj.desc);
	$('#editItemQuantity').val(serviceItemObj.qty);
	$('#editItemUnit').val(serviceItemObj.unit);
	var subitemObj = serviceItemObj.item;
	var subitemLen = subitemObj.length;
	//alert('subitemLen : '+subitemLen);
	if(subitemLen >= 1){
		countForEditItem = 1;
		//alert('inside showRecordForItemEdit value of countForEditItem before : '+countForEditItem);
		var tr = '';
		for(var subItemCount = 0; subItemCount < subitemLen; subItemCount++){
			//alert('subItemCount : '+subItemCount);
			tr += "<tr id='editaddr"+countForEditItem+"'>"+
			"<td>"+(countForEditItem)+"</td>"+
			"<td><input name='editSubItemName"+countForEditItem+"' id='editSubItemName"+countForEditItem+"' type='text' placeholder='Enter Sub Item Name' class='subItemNameCls' value='"+subitemObj[subItemCount].name+"'/></td>"+
			"<td><input name='editSubItemQuantity"+countForEditItem+"' id='editSubItemQuantity"+countForEditItem+"' type='text' placeholder='Enter Sub Item Quantity' class='form-control' value='"+subitemObj[subItemCount].qty+"'/></td>"+
			"<td><input name='editSubItemPrice"+countForEditItem+"' id='editSubItemPrice"+countForEditItem+"' type='text' placeholder='Enter Sub Item Price' class='form-control' value='"+subitemObj[subItemCount].price+"'/></td></tr>";
			$('#edit_tab_logic').append(tr);
			countForEditItem++;
			$('.subItemNameCls').each(function() {
				$(this).rules("add", {
					required: true,
					messages:{
						required:"Required !"
					}
				})
			});
			if(subItemCount == 1){
				$('#editSubItemName'+(subItemCount-1)).val(subitemObj[(subItemCount-1)].name);
				$('#editSubItemQuantity'+(subItemCount-1)).val(subitemObj[(subItemCount-1)].qty);
				$('#editSubItemPrice'+(subItemCount-1)).val(subitemObj[(subItemCount-1)].price);
			}
			//$('#editSubItemName'+subItemCount).val(subitemObj[subItemCount].name);
			//$('#editSubItemQuantity'+subItemCount).val(subitemObj[subItemCount].qty);
			//$('#editSubItemPrice'+subItemCount).val(subitemObj[subItemCount].price);
		}
		$('#edit_tab_logic').html('');
		var edit_tab_logic = "<table class=table table-bordered table-hover id=edit_tab_logic>"+
		"<thead>"+
		"<tr>"+
		"<th class=text-center>#</th>"+
		"<th class=text-center>Sub Item Name</th>"+
		"<th class=text-center>Quantity</th>"+
		"<th class=text-center>Price</th>"+
		"</tr>"+
		"</thead>"+
		"<tbody>"+tr+"</tbody>"+
		"</table>";
		document.getElementById('edit_tab_logic_div').innerHTML = edit_tab_logic;
	}else if(subitemLen == 1){
		$('#editSubItemName0').val(subitemObj[0].name);
		$('#editSubItemQuantity0').val(subitemObj[0].qty);
		$('#editSubItemPrice0').val(subitemObj[0].price);
	}
	$('.subItemNameCls').each(function() {
		$(this).rules("add", {
			required: true,
			messages:{
				required:"Required !"
			}
		})
	});
	$('#serviceTitle').text(serviceName);
	$('#item-form-title').text('Update Items');
	$('#service_grid').css('display', 'none');
	//alert("8");
	$('#display_subitem_div').css('display', 'none');
	$('#view_item').css('display', 'none');
	$('#add-item').css('display', 'none');
	$('#add_subitem').css('display', 'block');
	$('#update-item').css('display', 'block');
}
function addServices(){
	event.preventDefault();
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
    var token = window.localStorage.getItem("token");
    var departmentId = $("#department :selected").val();
	var serviceName = $('#serviceName').val().trim();
    var serviceDesc = $('#serviceDesc').val().trim();
    var isDeliverable = $('#isDeliverable:checked').is(":checked");
    var startTime = $('#startTime').val().trim();
	var endTime = $('#endTime').val().trim();
    var timeRange = startTime +' - '+ endTime;
    var thumbnail = $('#service_thumbnail').val().trim();
    var background = $('#bkimgs_thumbnail').val().trim();
    var SGST = $('#SGST').val().trim();
    var CGST = $('#CGST').val().trim();
    var otherTax = $('#otherTax').val().trim();;
	var url = 'admin/api/hotel/addServiceToHotel?access_token=' + token;
    console.log('url : '+url);
    console.log('{"hotelCode":' + hotelCode + ',"name":"' + serviceName + 
			'","departmentId":"' + departmentId + '","desc":"' + serviceDesc + 
			'","isDeliverable":"' + isDeliverable + '","timing":"' + timeRange + 
			'","background":"'+background+
			'","sgst":"'+SGST+
			'","cgst":"'+CGST+
			'","otherTax":"'+otherTax+
			'","thumbnail":"' + thumbnail +'"}');
	$.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: url,
        data: '{"hotelCode":' + hotelCode + ',"name":"' + serviceName + 
				'","departmentId":"' + departmentId + '","desc":"' + serviceDesc + 
				'","isDeliverable":"' + isDeliverable + '","timing":"' + timeRange + 
				'","background":"'+background+
				'","sgst":"'+SGST+
				'","cgst":"'+CGST+
				'","otherTax":"'+otherTax+
				'","thumbnail":"' + thumbnail +'"}',
        success: function (json) {
            console.log('browser json' + json);
            try {
                var obj = json;
				if (obj['success'] == true) {
					document.getElementById("add-service").reset();
					$("#cancel_vc_modal").click();
					$("#bkimgs_cancel_vc_modal").click();
					toastr.success('Service successfully added');
					getHotelDetailsByHotelCode();
                } else {
                	toastr.error(obj['err']);
                    console.log("inserted count is: " + json.insertedCount);
                }
            } catch (e) {
            	toastr.error('Service not added');
            }
        },
        error: function (xhr, status) {
        	toastr.error('Service not added');
        }
    });
}
function showSubitems(row){
	var x = document.getElementById("tab_logic").rows.length;
	if(x > 2){
		for(var count = x; count > 2; count--){
			document.getElementById("tab_logic").deleteRow(count-1);
		}
	}
	i=1;
	var serviceName = $('#serviceName'+row).val();
	var serviceId = $('#serviceId'+row).val();
	$('#serviceTitle').text(serviceName);
	$('#serviceId').val(serviceId);
	document.getElementById('service_grid').style.display = 'none';
	document.getElementById('add_service_hotel').style.display = 'none';
	document.getElementById('add_subitem').style.display = 'block';
	$('.subItemNameCls').each(function() {
		$(this).rules("add", {
			required: true,
			messages:{
				required:"Required !"
			}
		})
	});
}
function addSubitems(){
	//alert('addSubitems');
	event.preventDefault();
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
    var token = window.localStorage.getItem("token");
	var serviceId = $('#serviceId').val().trim();
	var itemName = $('#itemName').val().trim();
    var itemDesc = $('#itemDesc').val().trim();
    var itemQuantity = $('#itemQuantity').val().trim();
	var itemUnit = $('#itemUnit').val().trim();
	var rowCount = $('#tab_logic tr').length;
	var subItemName = [];
	var subItemQuantity = [];
	var subItemPrice = [];
	for(var count = 0; count < (rowCount-1); count++){
		//alert('count : '+count);
		subItemName[count] = $('#subItemName'+count).val().trim();
		subItemQuantity[count] = $('#subItemQuantity'+count).val().trim();
		subItemPrice[count] = $('#subItemPrice'+count).val().trim();
	}
	var url = 'admin/api/hotel/addServiceItemsToHotel?access_token=' + token;
	/**alert('service id : '+serviceId);
	alert('item name : '+itemName);
	alert('item desc : '+itemDesc);
	alert('item quantity : '+itemQuantity);
	alert('item unit : '+itemUnit);
	//alert('row count : '+rowCount);
	alert('sub item name : '+subItemName);
	alert('sub item quantity : '+subItemQuantity);
	alert('sub item price : '+subItemPrice);
	alert('url : '+url);
	**/
	/*console.log('{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ','+'"serviceItems":'+ '[');
	console.log('{"name":"'+itemName+'" ,"desc": "'+itemDesc+'","qty": "'+itemQuantity+'","unit":"'+itemUnit+'",');
	console.log('"item":'+'[');
	console.log('{"name":"'+subItemName+'" ,"qty": "'+subItemQuantity+'","price":"'+subItemPrice+'"}');
	console.log(']'+'}'+']'+'}');*/		
	var a='{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ','+'"serviceItems":'+ '[';
	var b='{"name":"'+itemName+'" ,"desc": "'+itemDesc+'","qty": "'+itemQuantity+'","unit":"'+itemUnit+'",';
	var c='"item":'+'[';
	var d = '';
	for(var count=0; count < subItemName.length; count++){
		if(count == (subItemName.length-1)){
			d = d + '{"name":"'+subItemName[count]+'" ,"qty": "'+subItemQuantity[count]+'","price":"'+subItemPrice[count]+'"}';
		}else{
			d = d + '{"name":"'+subItemName[count]+'" ,"qty": "'+subItemQuantity[count]+'","price":"'+subItemPrice[count]+'"}' + ",";	
		}
	}
	//var d='{"name":"'+subItemName+'" ,"qty": "'+subItemQuantity+'","price":"'+subItemPrice+'"}';
	var e=']'+'}'+']'+'}';
	console.log(a+b+c+d+e);		
	$.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: url,
        data: a+b+c+d+e,
        success: function (json) {
            console.log('browser json' + json);
            try {
                var obj = json;
				if (obj['success'] == true) {
					toastr.success('Service sub-item successfully added');
					document.getElementById("add-item").reset();
					addSubitemRow=1;
					getHotelDetailsByHotelCodeForServiceGrid();
					document.getElementById('add_subitem').style.display = 'none';
					document.getElementById('service_grid').style.display = 'block';
					//getHotelDetailsByHotelCode();
					//alert('Service sub-item successfully added');
                    /*$('#service-alert').hide();
                    $('#service-success-alert').html("Service successfully added");
                    $('#service-success-alert').show();*/
                } else {
					toastr.error(obj['err']);
					//alert('Service not added');
                    console.log("inserted count is: " + json.insertedCount);
                }
            } catch (e) {
				toastr.error('Service sub-item not added');
				//alert('Service not added');
               /* $('#service-success-alert').hide();
                $('#service-alert').html("Service addition failed");
                $('#service-alert').show();*/
            }
        },
        error: function (xhr, status) {
			toastr.error('Service sub-item not added');
			//alert('Service not added');
			/*$('#service-success-alert').hide();
            $('#service-alert').html("Service addition failed");
            $('#service-alert').show();*/
        }
    });
}

function updateSubitems(){
	//alert('updateSubitems');
	event.preventDefault();
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
    var token = window.localStorage.getItem("token");
	var serviceId = $('#editServiceId').val().trim();
	var serviceItemId = $('#editServiceItemId').val().trim();
	var itemName = $('#editItemName').val().trim();
    var itemDesc = $('#editItemDesc').val().trim();
    var itemQuantity = $('#editItemQuantity').val().trim();
	var itemUnit = $('#editItemUnit').val().trim();
	var rowCount = $('#edit_tab_logic tr').length;
	var subItemName = [];
	var subItemQuantity = [];
	var subItemPrice = [];
	//alert('rowCount : '+rowCount);
	for(var count = 1; count < rowCount; count++){
		//alert('count : '+count+', name : '+$('#editSubItemName'+count).val());
		subItemName[count] = $('#editSubItemName'+count).val();
		subItemQuantity[count] = $('#editSubItemQuantity'+count).val();
		subItemPrice[count] = $('#editSubItemPrice'+count).val();
	}
	//return false;
	var url = 'admin/api/hotel/updateServiceItemsToHotel?access_token=' + token;
	/*alert('service id : '+serviceId);
	alert('service item id : '+serviceItemId);
	alert('item name : '+itemName);
	alert('item desc : '+itemDesc);
	alert('item quantity : '+itemQuantity);
	alert('item unit : '+itemUnit);
	//alert('row count : '+rowCount);
	alert('sub item name : '+subItemName);
	alert('sub item quantity : '+subItemQuantity);
	alert('sub item price : '+subItemPrice);*/
	/*console.log('{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"serviceItemId":' + serviceItemId + ','+'"serviceItems":'+ '[');
	console.log('{"name":"'+itemName+'" ,"desc": "'+itemDesc+'","qty": "'+itemQuantity+'","unit":"'+itemUnit+'",');
	console.log('"item":'+'[');
	console.log('{"name":"'+subItemName+'" ,"qty": "'+subItemQuantity+'","price":"'+subItemPrice+'"}');
	console.log(']'+'}'+']'+'}');*/serviceItemId
	var a='{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"serviceItemId":' + serviceItemId + ','+'"serviceItems":'+ '[';
	var b='{"name":"'+itemName+'" ,"desc": "'+itemDesc+'","qty": "'+itemQuantity+'","unit":"'+itemUnit+'",';
	var c='"item":'+'[';
	var d = '';
	//alert('subItemName len : '+subItemName.length);
	for(var count=1; count < subItemName.length; count++){
		if(count == (subItemName.length-1)){
			d = d + '{"name":"'+subItemName[count]+'" ,"qty": "'+subItemQuantity[count]+'","price":"'+subItemPrice[count]+'"}';
		}else{
			d = d + '{"name":"'+subItemName[count]+'" ,"qty": "'+subItemQuantity[count]+'","price":"'+subItemPrice[count]+'"}' + ",";	
		}
	}
	//var d='{"name":"'+subItemName+'" ,"qty": "'+subItemQuantity+'","price":"'+subItemPrice+'"}';
	var e=']'+'}'+']'+'}';
	console.log(a+b+c+d+e);
	//return;
	$.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: url,
        data: a+b+c+d+e,
        success: function (json) {
            console.log('browser json' + json);
            try {
                var obj = json;
				if (obj['success'] == true) {
					//countForEditItem = 1;
					toastr.success('Service sub-item successfully updated');
					$('#display_item_table').DataTable().destroy();
					$('#serviceTitle').text('services');
					document.getElementById("update-item").reset();
					getHotelDetailsByHotelCodeForServiceGrid();
					document.getElementById('add_subitem').style.display = 'none';
					document.getElementById('service_grid').style.display = 'block';
					//alert("11");
					//getHotelDetailsByHotelCode();
                    /*$('#service-alert').hide();
                    $('#service-success-alert').html("Service successfully update");
                    $('#service-success-alert').show();*/
                } else {
					toastr.error('Service sub-item not update');
                    console.log("inserted count is: " + json.insertedCount);
                }
            } catch (e) {
				toastr.error('Service sub-item not update');
                /* $('#service-success-alert').hide();
                $('#service-alert').html("Service addition failed");
                $('#service-alert').show();*/
            }
        },
        error: function (xhr, status) {
			toastr.error('Service sub-item not update');
			/*$('#service-success-alert').hide();
            $('#service-alert').html("Service addition failed");
            $('#service-alert').show();*/
        }
    });
}

function viewAllSubitems(){
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getHotelDetail?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId": '+hotelId+'}',
		success : function(json) {
			console.log(json);
			try {
				if (json.success == true) {
					if(json.hotel.services == null){
						var tabledata = "<table id='display_fullitem_table' class='table table-bordered table-striped'>"+ 
						"<thead><tr><th>#</th><th>Service Name</th><th>Timing</th></tr></thead>"+ 
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('fullitem-data-table').innerHTML = tabledata;
						$('#display_fullitem_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						//alert('else');
						var services = json.hotel.services;
						var tabledata = "<table id='display_fullitem_table' class='table table-bordered table-striped'>"+ 
						"<thead><tr><th>#</th>"+
						"<th>Service Name</th>"+
						"<th>Service Desc</th>"+
						"<th>Is Deliverable</th>"+
						"<th>Thumnail</th>"+
						"<th>Timing</th>"+
						"<th>Item Name</th>"+
						"<th>Item Desc</th>"+
						"<th>Item Quantity</th>"+
						"<th>Item Unit</th>"+
						"<th>Sub Item Name</th>"+
						"<th>Sub Item Quantity</th>"+
						"<th>Sub Item Price</th>"+
						"</tr></thead><tbody>";
						for (var i = 0; i < services.length; i++) {
							var items = services[i].serviceItems;
							//alert('service items length : '+items.length);
							for (var itemCount = 0; itemCount < items.length; itemCount++) {
								var subItems = items[itemCount].item;
								//alert('sub items length : '+subItems.length);
								for (var subItemCount = 0; subItemCount < subItems.length; subItemCount++) {
									//alert('sub item count : '+subItemCount);
									tabledata = tabledata + "<tr>" + 
									"<td>" + (i+1) + "</td>"+
									"<td>" + services[i].name + "</td>"+
									"<td>" + services[i].desc + "</td>"+ 
									"<td>" + services[i].isDeliverable + "</td>"+ 
									"<td>" + services[i].thumbnail + "</td>"+ 
									"<td>" + services[i].timing + "</td>"+ 
									"<td>" + items[itemCount].name + "</td>"+ 
									"<td>" + items[itemCount].desc + "</td>"+ 
									"<td>" + items[itemCount].qty + "</td>"+ 
									"<td>" + items[itemCount].unit + "</td>"+ 
									"<td>" + subItems[subItemCount].name + "</td>"+ 
									"<td>" + subItems[subItemCount].qty + "</td>"+ 
									"<td>" + subItems[subItemCount].price + "</td>"+ 
									"</tr>";
								}
							}
						}
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('fullitem-data-table').innerHTML = tabledata;
						document.getElementById("display_fullitem_div").style.display = "block";
						$('#display_fullitem_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}    
				} else {
					console.log("Can not get depts: " + json.err);
				}
			} catch (e) {
				console.log("error"+e);	
			}
		},
		error : function(xhr, status) {
			console.log(xhr.status);
			console.log(xhr.statusText);
			console.log(xhr.responseText);
		}
	});
}