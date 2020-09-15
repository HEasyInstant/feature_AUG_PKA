var staffId = window.localStorage.getItem("clientId");
var staffName = window.localStorage.getItem("userName");
//var token = window.localStorage.getItem("token");
function getAllOpenOrders(){
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getOpenOrder?access_token=' + token;
	var count=0;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async:false,
		data : '{"hotelCode":  '+hotelCode+',"staffId":'+staffId+'}',
		success : function(json) {
			try {
				var obj = json;
				document.getElementById('pOrder').innerHTML = "<div></div>";
				if (json.success == true) {
					if(json.orders == null){
						var tabledata = "<table id='p_orderTable' class='table table-bordered table-striped'>"+
						"<thead><tr>"+
						"<th width='5%'>#</th>"+
						"<th width='10%'>Room #</th>"+
						"<th width='15%'>Time</th>"+
						"<th width='60%'>Item Details</th>"+
						"<th width='10%'>Action</th>"+
						"</tr></thead>" +
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('p_orderTable').innerHTML = tabledata;
						$('#p_orderTable').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						var orders = json.orders;
						var tbl = $('<table></table>').attr({ id: "p_orderTable",class:"table table-bordered table-striped" });
						var row = $('<tr></tr>').appendTo(tbl);
						$('<th></th>').attr({width:"5%" }).text("#").appendTo(row);
						$('<th></th>').attr({width:"10%" }).text("Room#").appendTo(row);
						$('<th></th>').attr({width:"10%" }).text("Time").appendTo(row);
						$('<th></th>').attr({width:"65%" }).text("Item Details").appendTo(row);
						$('<th></th>').attr({width:"15%" }).text("Action").appendTo(row);
						var tbody = $('<tbody></tbody>').appendTo(tbl);

						var open_count = 0;
						var d;
						var dp ;
						var n ;
						var orderDate;

						for (var j = 0; j < orders.length; j++) {
							var roomNumber = orders[j].guest.roomNumber;
							for(var k =0;k<orders[j].order.length; k++){
								var localizedDate = moment(new Date(orders[j].order[k].orderDate+" UTC")).format('MMM DD, hh:mm:ss a').toString();
								row = $('<tr></tr>').appendTo(tbody);
								$('<td></td>').attr({width:"5%" }).text((++count)).appendTo(row);
								$('<td></td>').attr({width:"10%" }).text(roomNumber).appendTo(row);
								$('<td></td>').attr({width:"15%" }).text(localizedDate).appendTo(row);
								var detail = $('<td></td>').attr({width:"65%" }).appendTo(row);
								var tbl1 = $('<table></table>').attr({ class:"table table-bordered table-striped" });
								tbl1.appendTo(detail);
						 		for(var l=0;l<orders[j].order[k].items.length;l++){
						 			var serviceName=orders[j].order[k].items[l].serviceName;
						 			var serviceItemName=orders[j].order[k].items[l].serviceItemName;
									var itemName=orders[j].order[k].items[l].itemName;
									if(orders[j].order[k].items[l].source){
										var tmp = "("+orders[j].order[k].items[l].source+"-"+orders[j].order[k].items[l].destination+") -  "+orders[j].order[k].items[l].bookingOn ;
										serviceName += tmp;
									 } 
						 			var quantity=orders[j].order[k].items[l].qty;
						 			var amount=orders[j].order[k].items[l].amount;
						 			var item_id=orders[j].order[k].orderId+"_"+orders[j].order[k].items[l].itemId;
						 			var nameToDisplay;

						 			if(itemName!=null && itemName!=''){
						 				nameToDisplay=itemName;
						 			}else if(serviceItemName!=null && serviceItemName!='' ){
						 				nameToDisplay=serviceItemName;
						 			}else{
						 				nameToDisplay=serviceName;
						 			}
						 			var tempVal=orders[j].order[k].items[l];

									var row1 = $('<tr></tr>').appendTo(tbl1);
									$('<td></td>').attr({width:"60%" }).text(nameToDisplay).appendTo(row1);
									$('<td></td>').attr({width:"5%" }).text(quantity).appendTo(row1);
									$('<td></td>').attr({width:"10%" }).text(amount).appendTo(row1);
									var componentId = "itemAvailable"+item_id;
									if(orders[j].order[k].items[l].isItemAvailable == undefined || orders[j].order[k].items[l].isItemAvailable ==true){
										var checkboxContainer = $('<td></td>').attr({width:"15%" }).html(
												'<input type="checkbox" value='+orders[j].order[k].items[l].isItemAvailable+' id='+componentId+' onclick="selectRow(this)" checked>Available</input>'
										).appendTo(row1);
									}else{
										var checkboxContainer = $('<td></td>').attr({width:"15%" }).html(
												'<input type="checkbox" value='+orders[j].order[k].items[l].isItemAvailable+' id='+componentId+' onclick="selectRow(this)">Available</input>'
										).appendTo(row1);
									}

						 		}
								$('<td></td>').attr({width:"15%" }).html("<button class='btn btn-info btn-sm' " +
										"onclick=acceptOrder("+orders[j].guest.guestCode+","+orders[j].order[k].orderId+");>Accept</button>").appendTo(row);

							}
							$('#pOrder').append(tbl);
						}
												$('#p_orderTable').DataTable({
													"paging" : true,
													"lengthChange" : true,
													"ordering" : true,
													"info" : true,
													"autoWidth" : true
												});
					}
				} else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				console.log("not able to fetch open order..  "+e);
			}
		},
		error : function(e) {
		}
	});
	return count;
}


function selectRow(e) {
	if(e.checked){
		document.getElementById(e.id).value = true;
	}else{
		document.getElementById(e.id).value = false;
	}

}

function getInprogressOrders(){
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getInprogressOrder?access_token=' + token;
	var count = 0;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async:false,
		data : '{"hotelCode":  '+hotelCode+',"staffId":'+staffId+'}',
		success : function(json) {
			try {
				var obj = json;
				if (json.success == true) {
					if(json.orders == null){
						count=0;
						var tabledata = "<table id='progress_orderTable' class='table table-bordered table-striped'>"+
						"<thead><tr>"+
						"<th width='5%'>#</th>"+
						"<th width='10%'>Room #</th>"+
						"<th width='15%'>Time</th>"+
						"<th width='60%'>Item Details</th>"+
						"<th width='10%'>Action</th>"+
						"</tr></thead>" +
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('progress_orderTable').innerHTML = tabledata;

							$('#progress_orderTable').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						var orders = json.orders;

						//alert('orders : '+orders.length);
						var tabledata = "<table id='progress_orderTable' class='table table-bordered table-striped' width='100%'>"+
						"<thead><tr width='100%'>"+
						"<th width='5%'>#</th>"+
						"<th width='10%'>Room #</th>"+
						"<th width='15%'>Time</th>"+
						"<th width='55%'>Item Details</th>"+
						"<th width='15%'>Action</th>"+
						"</tr></thead>" +
						"<tbody>";
						var open_count = 0;
						var d;
						var dp ;
						var n ;
						for (var j = 0; j < orders.length; j++) {
							var roomNumber = orders[j].guest.roomNumber;

							for(var k =0;k<orders[j].order.length; k++){
								var localizedDate = moment(new Date(orders[j].order[k].orderDate+" UTC")).format('MMM DD, hh:mm:ss a').toString();
						 		tabledata = tabledata + "<tr>" +
								"<td width='5%'>" + (++count) + "</td>" +
								"<td width='10%'>" +"RM# "+ roomNumber +"</td>" +
								"<td width='15%'>" + localizedDate + "</td>" ;
						 		var td="<td width='55%'>"
						 		for(var l=0;l<orders[j].order[k].items.length;l++){

						 			var serviceName=orders[j].order[k].items[l].serviceName;
						 			var serviceItemName=orders[j].order[k].items[l].serviceItemName;
									var itemName=orders[j].order[k].items[l].itemName;
									if(orders[j].order[k].items[l].source){
										var tmp = "("+orders[j].order[k].items[l].source+"-"+orders[j].order[k].items[l].destination+") -  "+orders[j].order[k].items[l].bookingOn ;
										serviceName += tmp;
									}  
						 			var quantity=!orders[j].order[k].items[l].qty ? '':orders[j].order[k].items[l].qty;
						 			var amount=!orders[j].order[k].items[l].amount?'':orders[j].order[k].items[l].amount;
						 			var nameToDisplay;
						 			var tr = "<table class='table table-bordered table-striped'>";
									var isItemAvailable = false;
									if(orders[j].order[k].items[l].isItemAvailable == undefined ||orders[j].order[k].items[l].isItemAvailable == "undefined" || orders[j].order[k].items[l].isItemAvailable == true){
										isItemAvailable = true;
									}
						 			if(itemName!=null && itemName!=''){
						 				nameToDisplay=itemName;
						 			}else if(serviceItemName!=null && serviceItemName!='' ){
						 				nameToDisplay=serviceItemName;
						 			}else{
						 				nameToDisplay=serviceName;
						 			}
						 			tr = tr+"<tr><td width='70%'>"+nameToDisplay+"<span>"+(!isItemAvailable?' (Not Available)'.fontcolor("red"):'')+"</span></td><td width='10%'>"+quantity+"</td><td width='20%'>"+amount+"</td>"+

									"</tr></table>";
						 			td=td+tr;
						 		}
						 		td=td+"</td><td width='15%'><button class='btn btn-info btn-sm' onclick=completeOrders("+orders[j].guest.guestCode+","+orders[j].order[k].orderId+");>Complete</button>"+
									"</td></tr>";
						 		tabledata=tabledata+td;
							}

							//alert(tabledata);
						}
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('progress_Order').innerHTML = tabledata;
						if ($.fn.DataTable.isDataTable('#progress_orderTable')) {
							$('#progress_orderTable').DataTable().destroy();
						}
						$('#progress_orderTable').DataTable({
							"paging" : true,
							"scrollY": "500px",
							"scrollCollapse": true,
							"lengthChange" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}
				}  else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				//alert("not able to fetch open order..  ");
			}
		},
		error : function() {
		}
	});
	return count;
}

var globalVarServiceName = '';

function getServiceName(serviceId){
    var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getService?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async: false,
		data : '{"hotelCode": '+hotelId+'}',
		success : function(json) {
			try {
				if (json.success == true) {
					var services = json.services;
					if(json.services == null || services.length == 0){

					}else{
						for (var i = 0; i < services.length; i++) {
							if(services[i].serviceId == serviceId){
								globalVarServiceName = services[i].serviceName;
								//alert(globalVarServiceName);
							}
						}
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

function acceptOrder(guestCode, orderId, items,itemAvailability){
    var token = window.localStorage.getItem("token");
	var url = '/api/guest/assignStaff?access_token=' + token;
	var items = []
	$("input[id*='itemAvailable']").each(function (i, el) {
		var itemId = el.id.split("_");
		var val = (el.value === "true");
		items.push({itemId:itemId[1], isItemAvailable: val});
	});

	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async: false,
		data : '{"userCode": '+guestCode+',"orderId": '+orderId+', "items": '+JSON.stringify(items)+ ', "staffId": '+staffId+',"staffName": "'+staffName+'"}',
		success : function(json) {
			try {
				getAllOpenOrders();
				getInprogressOrders();
				if (json.success == true) {
					toastr.success('Order accepted');
				} else {
					toastr.error('failed to accept order');
				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {
			/*
			alert(xhr.status);
						alert(xhr.statusText);
						alert(xhr.responseText);*/

		}
	});

}

function completeOrders(guestCode,orderId){
    var token = window.localStorage.getItem("token");
	var remark="Good Service";
	var url = '/api/guest/completeOrder?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
			data : '{"userCode": '+guestCode+',"orderId": '+orderId+',"staffId": '+staffId+',"staffName": "'+staffName+'","remark": "'+remark+'"}',
		success : function(json) {
			try {
				var obj = json;
				var count=0;
				if (json.success == true) {
					if ($.fn.DataTable.isDataTable('#progress_orderTable')) {
						$('#progress_orderTable').DataTable().destroy();
					}
						if ($.fn.DataTable.isDataTable('#complete_orderTable')) {
							$('#complete_orderTable').DataTable().destroy();
					}
					getInprogressOrders();
					getCloseOrders();
					toastr.success('Order completed');
				}  else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				toastr.success('Failed to complete order');
			}
		},
		error : function() {
		}
	});
}


function getCloseOrders(){
    var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = 'admin/api/hotel/getClosedOrder?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode":  '+hotelCode+',"staffId":'+staffId+'}',
		success : function(json) {
			try {
				var obj = json;
				var count=0;
				if (json.success == true) {

					if(json.orders == null){
						var tabledata = "<table id='complete_orderTable' class='table table-bordered table-striped' style='margin-left: 0px; width: 1059px;'>"+
						"<thead><tr>"+
						"<th width='5%'>#</th>"+
						"<th width='10%'>Room #</th>"+
						"<th width='15%'>Order Date</th>"+
						"<th width='55%'>Item Details</th>"+
							"<th width='15%'>Time Taken</th>"+
						"</tr></thead>" +
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('complete_orderTable').innerHTML = tabledata;

							$('#complete_orderTable').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						var orders = json.orders;
						//alert('orders : '+orders.length);
						var tabledata = "<table id='complete_orderTable' class='table table-bordered table-striped'>"+
						"<thead><tr>"+
						"<th width='5%'>#</th>"+
						"<th width='10%'>Room #</th>"+
						"<th width='15%'>Time</th>"+
						"<th width='60%'>Item Details</th>"+
						"<th width='10%'>Time Taken</th>"+
						"</tr></thead>" +
						"<tbody>";

						var open_count = 0;
						var d;
						var dp ;
						var n ;
						for (var j = orders.length-1; j >=0; j--) {
							var roomNumber = orders[j].guest.roomNumber;
							for(var k =0;k<orders[j].order.length; k++){
								var localizedDate = moment(new Date(orders[j].order[k].orderDate+" UTC")).format('MMM DD, hh:mm:ss a').toString();
								var orderDate = moment(orders[j].order[k].orderDate, 'MMM DD YYYY, hh:mm:ss a');
								var closedDate = moment(orders[j].order[k].executedDate, 'MMM DD YYYY, hh:mm:ss a');
						var duration = moment.duration(closedDate.diff(orderDate));
						var processedTime = Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss")
								tabledata = tabledata + "<tr style='margin-left: 0px; width: 1059px;'>" +
								"<td width='5%'>" + (++count) + "</td>" +
								"<td width='10%'>" +"RM# "+ roomNumber +"</td>" +
								"<td width='15%'>" + localizedDate+ "</td>" ;
						 		var td="<td width='60%'>"
						 		for(var l=0;l<orders[j].order[k].items.length;l++){

						 			var serviceName=orders[j].order[k].items[l].serviceName;
						 			var serviceItemName=orders[j].order[k].items[l].serviceItemName;
									var itemName=orders[j].order[k].items[l].itemName;
									if(orders[j].order[k].items[l].source){
										var tmp = "("+orders[j].order[k].items[l].source+"-"+orders[j].order[k].items[l].destination+") -  "+orders[j].order[k].items[l].bookingOn ;
										serviceName += tmp;
									} 
						 			var quantity=!orders[j].order[k].items[l].qty?'':orders[j].order[k].items[l].qty;
						 			var amount=!orders[j].order[k].items[l].amount?'':orders[j].order[k].items[l].amount;
						 			var nameToDisplay;
						 			var tr = "<table class='table table-bordered table-striped'>";
									var isItemAvailable = false;
									if(orders[j].order[k].items[l].isItemAvailable == undefined || orders[j].order[k].items[l].isItemAvailable == "undefined" || orders[j].order[k].items[l].isItemAvailable == true){
										isItemAvailable = true;
									}
						 			if(itemName!=null && itemName!=''){
						 				nameToDisplay=itemName;
						 			}else if(serviceItemName!=null && serviceItemName!='' ){
						 				nameToDisplay=serviceItemName;
						 			}else{
						 				nameToDisplay=serviceName;
						 			}
						 			tr = tr+"<tr><td width='70%'>"+nameToDisplay+"<span>"+(!isItemAvailable?' (Not Available)'.fontcolor("red"):'')+"</span></td><td width='10%'>"+quantity+"</td><td width='20%'>"+amount+"</td>"+
									"</tr></table>";

						 			td=td+tr;
						 		}

						 		tabledata=tabledata+td +  	"<td width='10%'>" + processedTime+ "</td>" ;;

							}

							//alert(tabledata);
						}
	///"<td width='10%'>" + processedTime+ "</td>" ;
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('complete_Order').innerHTML = tabledata;

						if ($.fn.DataTable.isDataTable('#complete_orderTable')) {
							$('#complete_orderTable').DataTable().destroy();
						}
					$('#complete_orderTable').DataTable({
						"paging" : true,
						"scrollY": "500px",
						"scrollCollapse": true,
						"lengthChange" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true
				});

					}
				}  else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				console.log("not able to fetch open order..  "+e);
			}
		},
		error : function() {
		}
	});


}

function diff_minutes (d1, d2) {
var m1 = d1.getMinutes();
var m2 = d2.getMinutes();
return m2 - m1;

}
