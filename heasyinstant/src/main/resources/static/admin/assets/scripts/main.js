/**
 * @author gkmourya
 */
fromDashboard=false;
open_Order_s=0;
total_Order_s=0;
total_feedback_count_s=0;
checkedin_customer_s=0;
//var token = window.localStorage.getItem("token");
var staffId = window.localStorage.getItem("clientId");
var staffName = window.localStorage.getItem("userName");

function bulkCheckoutGuest(checkedoutGuest) {
	/* attach a submit handler to the form */
	event.preventDefault();
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var token = window.localStorage.getItem("token");

	var url = 'api/guest/checkoutBulk?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"checkoutGuests":"' + checkedoutGuest + '"}',
		success : function(json) {
			console.log(json);
		},
		error : function() {
			console.log("hello")
		}
	});
}

function getCheckedInCust(){
    var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/api/guest/getActiveGuest?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":"' + hotelId + '"}',
		success : function(json) {
			try {
				var obj = json;
				var guestList = obj['guests'];
				var checkedOutGuest = [];
				var guests = [];
				for(var j = 0; j< guestList.length; j++){
					var checkoutDate = guestList[j].checkoutDate;
					checkoutDate = checkoutDate.substr(checkoutDate.indexOf("-")+1).trim();
					checkoutDate = moment(checkoutDate);
					if(moment().diff(checkoutDate) > 0){
						checkedOutGuest.push(guestList[j].guestCode);
					}else{
						guests.push(guestList[j]);
					}
				}
				var guest_img;
				var guestList_len=0;
				var guest_name_num;
				var userList = "<ul id='checkedInCust' class='users-list clearfix'>"+
				"<li><img src='admin/assets/dist/img/22.png' id='myModal' style='cursor:pointer'>"
				+ "<a data-pin-nopin='true'>"
				+ "<a class='users-list-name' id='myModal_name' href='#'>Add Guest</a>"
				+ "<span class='users-list-date'></span></li>";
				if (obj['success'] == true) {
					var len = guests.length;
					if(len >= 7){
						guestList_len = (len - 7);
					}else{
						guestList_len = 0;
					}
					document.getElementById("checked-cust").innerHTML = "<h3>"+len+"<h3>";
					for (var i = (len-1); i >= guestList_len; i--) {
						var status = guests[i]['status'];
						if(typeof status === "undefined" || null == status){
							status = 'ONLINE';
						}
						var guestCode = guests[i]['guestCode'];
						guest_name_num= guests[i]['name']+"&nbsp;&nbsp;#"+ guests[i]['roomNumber'];
						if(guests[i]['isMale']=="true"){
							guest_img='admin/assets/dist/img/user1-128x128.jpg';
						}else{
							guest_img='admin/assets/dist/img/user3-128x128.jpg';
						}
						if(status == 'ONLINE' ){
							userList = userList +
							'<li id="guestCode'+ guestCode +'">'+
								"<img src=" + guest_img + " alt='User Image' class='context-menu-one' id='"+guests[i]['guestCode']+"' name='"+guest_name_num+"'>"+
								"<a class='users-list-name' href='#'>" + guests[i]['name'] + "</a>"+
								"<span class='users-list-date'><b>RM #:" + guests[i]['roomNumber'] + "</b></span></n>"+
								"<span id='guestStatus"+guestCode+"' class='users-list-date'><i class='fa fa-circle text-success'></i><b> "+status+"</b></a></span>"
								+"<a class='users-list-name' href='#' onclick='view_order_summary("+guests[i]['guestCode']+")'>order summary</a>"
							'</li>';
						}else{
							userList = userList +
							'<li id="guestCode'+ guestCode +'">'+
								"<img src=" + guest_img + " alt='User Image' class='context-menu-one' id='"+guests[i]['guestCode']+"' name='"+guest_name_num+"'>"+
								"<a class='users-list-name' href='#'>" + guests[i]['name'] + "</a>"+
								"<span class='users-list-date'><b>RM #:" + guests[i]['roomNumber'] + "</b></span></n>"+
								"<span class='users-list-date'><i class='fa fa-circle text-danger'></i><b> "+status+"</b></a></span>"
								+"<a class='users-list-name' href='#' onclick='view_order_summary("+guests[i]['guestCode']+")'>order summary</a>"
							'</li>';
						}
					}
					document.getElementById('list').innerHTML = "</ul>"+userList;
					$("#myModal").click(function() {
						$("#main-content").load("admin/addGuest.html?access_token="+window.localStorage.getItem("token")
						, function() {
							if ( window.localStorage.getItem("isCorporateTravelEnabled") == "true") {
							   document.getElementById("corporatePanelId").style.display='inline';
							   if(window.localStorage.getItem("allowedCompany")){
								var countries = window.localStorage.getItem("allowedCompany").split(',');
								for(country in countries){
									$('#corporateName').append($("<option></option>")
									.attr("value",countries[country])
									.text(countries[country])); 
								}
							   }
							  
							}
							loadRoomByHotelCode();
						}
						);
					});
					function loadRoomByHotelCode(){
						event.preventDefault();
						var token = window.localStorage.getItem("token");
						hotelCode = window.localStorage.getItem("hotelCodeVal");
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
										for (var i = json.room.length-1; i >= 0; i--) {
											if(json.room[i].availability){
												$('#roomNo').append($("<option></option>")
												.attr("value",json.room[i].roomNumber)
												.text(json.room[i].roomNumber)); 

												$('#editRoomNo').append($("<option></option>")
												.attr("value",json.room[i].roomNumber)
												.text(json.room[i].roomNumber)); 
											}
										}
									}
								} catch (e) {
				
								}
							},
							error : function(xhr, status) {
							}
						});
					}
					
					$("#myModal_name").click(function() {
						$("#main-content").load("admin/addGuest.html?access_token="+window.localStorage.getItem("token")
						, function() {
							if ( window.localStorage.getItem("isCorporateTravelEnabled") == "true" ) {
							   document.getElementById("corporatePanelId").style.display='inline';
							   if(window.localStorage.getItem("allowedCompany")){
								var countries = window.localStorage.getItem("allowedCompany").split(',');
								for(country in countries){
									$('#corporateName').append($("<option></option>")
									.attr("value",countries[country])
									.text(countries[country])); 
								}
							   }
							  
							}
							loadRoomByHotelCode();
						});
					});
				} else {
					var userList="<ul class='users-list clearfix'>"+
				"<li><img src='admin/assets/dist/img/22.png' id='myModal' style='cursor:pointer'>"
				+"<a data-pin-nopin='true' >"
				+"<a class='users-list-name' href='#'>Add Guest</a>"
				+"<span class='users-list-date'></span></li>";
				document.getElementById('list').innerHTML = "</ul>"+userList;
				$("#myModal").click(function() {
						$("#main-content").load("admin/addGuest.html?access_token="+window.localStorage.getItem("token")
						, function() {
							if ( window.localStorage.getItem("isCorporateTravelEnabled") == "true" ) {
							   document.getElementById("corporatePanelId").style.display='inline';
							   if(window.localStorage.getItem("allowedCompany")){
								var countries = window.localStorage.getItem("allowedCompany").split(',');
								for(country in countries){
									$('#corporateName').append($("<option></option>")
									.attr("value",countries[country])
									.text(countries[country])); 
								}
							   }
							  
							}
							loadRoomByHotelCode();
						});
					});
					$("#myModal_name").click(function() {
						$("#main-content").load("admin/addGuest.html?access_token="+window.localStorage.getItem("token") , function() {
							if ( window.localStorage.getItem("isCorporateTravelEnabled") == "true" ) {
							   document.getElementById("corporatePanelId").style.display='inline';
							   if(window.localStorage.getItem("allowedCompany")){
								var countries = window.localStorage.getItem("allowedCompany").split(',');
								for(country in countries){
									$('#corporateName').append($("<option></option>")
									.attr("value",countries[country])
									.text(countries[country])); 
								}
							   }
							  
							}
							loadRoomByHotelCode();
						});
					});
				}
			} catch (e) {
				//alert("not able to fetch checked in cust..  ");
			}
			if(checkedOutGuest.length > 0) {
				bulkCheckoutGuest(checkedOutGuest);
			}
		},
		error : function() {
			//alert("not able to fetch checked in cust..  ");
		}
	});
}

var timeout ;
function getDashBoardDetails(){
    //if user is loggedout then should not call this function so adding this check.
    if(window.localStorage.getItem("token") == undefined || window.localStorage.getItem("token") == null ){
        return;
    }
    //var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var clientId = window.localStorage.getItem("clientId");
	var url = '/api/guest/getDashboardDetail?dept='+window.localStorage.getItem("departmentId")+'&access_token=' + window.localStorage.getItem("token")+'&refreshToken=true&clientId='+clientId;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":"'+hotelCode+'"}',
		success : function(json) {
			try {
				var obj = json;
				var count=0;
                if(obj.newtoken) {
                    window.localStorage.removeItem("token");
                    window.localStorage.setItem("token", obj.newtoken);
                    var token = window.localStorage.getItem("token");
                    window.history.replaceState('','',window.location.pathname+"?access_token="+token);
                }
				if (obj.success == true) {
					var pendingOrders = obj.dashboard.pendingOrderCount;
					var totalOrders = obj.dashboard.orderCount;
					var checkedInCust = obj.dashboard.checkedInCustomer;
					var feedbackCount = obj.dashboard.feedbackCount;
					var guests = obj.dashboard.guests;
					var guestsLen = guests.length;
					var checkedInCustLen = $('ul#checkedInCust li').length;
					for(var count = 0; count<guestsLen; count++){
						var liId = 'guestCode'+guests[count].guestCode;
						if($('#'+liId).length > 0) {
							var status = guests[count].status;
							if(status == 'ONLINE'){
								$('#guestStatus108').html("<i class='fa fa-circle text-success'></i><b> "+status+"</b>");
							}else{
								$('#guestStatus108').html("<i class='fa fa-circle text-danger'></i><b> "+status+"</b>");
							}
						}
					}
					if(fromDashboard){
						open_Order_s=obj.dashboard.pendingOrderCount;
						total_Order_s=obj.dashboard.orderCount;
						total_feedback_count_s=obj.dashboard.feedbackCount;
						checkedin_customer_s=obj.dashboard.checkedInCustomer;

					}else if(!fromDashboard && (pendingOrders > open_Order_s || totalOrders > total_Order_s || feedbackCount > total_feedback_count_s || checkedInCust> checkedin_customer_s)){
						loadOrdersForDashboard();
						var audio = new Audio('admin/assets/audio/new-message.wav');
						if(pendingOrders > open_Order_s){
                            var k = pendingOrders-open_Order_s;
							audio.play();
							getAllOpenOrders();
							notification = new Notification("New Order", {
								body: 'You have '+k +" new order(s)",
						          requireInteraction: true
							});
							notification.onclick = function () {
								window.focus();
								notification.close();
								$("#main-content").load("admin/orders.html?access_token="+window.localStorage.getItem("token"));
							};
							setTimeout(function() {
								notification.close()
							}, 2000000);
						}
						open_Order_s=obj.dashboard.pendingOrderCount;
						total_Order_s=obj.dashboard.orderCount;
						total_feedback_count_s=obj.dashboard.feedbackCount;
						checkedin_customer_s=obj.dashboard.checkedInCustomer;
						getCheckedInCust();
					}
					fromDashboard=false;
					document.getElementById("open-order").innerHTML = "<h3>"+obj.dashboard.pendingOrderCount+"<h3>";
					document.getElementById("total-order").innerHTML = "<h3>"+obj.dashboard.orderCount+"<h3>";
					document.getElementById("total-feedback").innerHTML = "<h3>"+obj.dashboard.feedbackCount+"<h3>";
					document.getElementById("checked-cust").innerHTML = "<h3>"+obj.dashboard.checkedInCustomer+"<h3>";
					open_Order_s=obj.dashboard.pendingOrderCount;
					total_Order_s=obj.dashboard.orderCount;
					total_feedback_count_s=obj.dashboard.feedbackCount;
					checkedin_customer_s=obj.dashboard.checkedInCustomer;
				} else {
				}
			} catch (e) {
			}
		},
		error : function() {
		}
	});

    if(timeout){
        clearTimeout(timeout);
    }
    timeout = setTimeout(getDashBoardDetails, 15000);
}

function checkAndNotifyopenOrderThroughSMS(){
	var staff_mobile = window.localStorage.getItem("staff_mobile");
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getOrdersToNotify?access_token=' + token;
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
					if(json.count>0){

						try {
						$.ajax({
							type : 'POST',
							dataType : 'json',
							contentType : 'application/json',
							url : "/api/guest/sendSMSForPendingOrders?access_token=" + token,
							async:false,
							data : '{"mobile":'+staff_mobile+'}',
							success : function(json) {
							},
							error : function(xhr, status, error) {

							}
						});
						}catch (e) {

						}
					}
				}
			} catch (e) {
			}
		},
		error : function() {
		}
	});
	setTimeout(checkAndNotifyopenOrderThroughSMS, 120000);
}

function signOut(){
    var token = window.localStorage.getItem("token");
    var clientId=window.localStorage.getItem("clientId");
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: '/api/clients/logout?access_token=' + token,
        data: '{"clientId":'+clientId+'}' ,

        success: function(json){
            try{
                var obj = json;
                if(obj['success'] == true){
                	window.localStorage.clear();
                    window.location.href="/../admin/login.html";
                } else {

                }
            }catch(e) {

            }
        },

		error: function(xhr, status) {

		}


});
}

function pushNote() {

	$.contextMenu({
		selector : '.context-menu-one',
		callback : function(key, options) {
			var m = "clicked: " + key;
			//window.console && console.log(m) || alert(m);
			var guestName=($(this).attr('name'));
			var guestID=($(this).attr('id'));
			if (key === "send") {
				document.getElementById("guestid").value = guestID;
				$('.modal-title').html("Send Notification To "+guestName);
				document.getElementById("notification-div").style.display = "block";

			}else if(key === "Checkout"){
				checkoutGuest(guestID);
			}
		},
		items : {
			"send" : {
				name : "Send Notification"
				//icon : "edit",

			},
			// "cut": {name: "Cut", icon: "cut"},
			// copy: {name: "Copy", icon: "copy"},
			// "paste": {name: "Paste", icon: "paste"},
			// "delete": {name: "Delete", icon: "delete"},
			// "sep1": "---------",
			"Checkout" : {
				name : "Checkout",
				icon : function() {
					return 'context-menu-icon';
				}
			}
		}
	});

	$('.context-menu-one').on('click', function(e) {
		console.log('clicked', this);
	});

	$("#closebtn").click(function() {
		$('#msg_title').val('');
		$('#messages').val('');
		document.getElementById("notification-div").style.display = "none";
	});

	$("#closeNotify").click(function() {
		$('#msg_title').val('');
		$('#messages').val('');
		document.getElementById("notification-div").style.display = "none";
	});

	$('#pushMsg').on('click', function(e) {
	if(!$.trim($('#msg_title').val())){

		 $( "#msg_title" ).focus();
		return;
	}else if(!$.trim($('#messages').val())){
		 $( "#messages" ).focus();
		return;
	}else{sendPushMsgtoClient();}
	});
	$("#send_to_all").click(function() {
		document.getElementById("notification-div").style.display = "block";
		$('#msg_title').val('');
		$('#messages').val('');
		$('.modal-title').html("Send Notification To All");
	});
}

function sendPushMsgtoClient(){
    var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var guestId=$.trim($('#guestid').val());
	var title=$.trim($('#msg_title').val());
	var msg=$.trim($('#messages').val());
	var valueToNotify;

	if(guestId){
	 valueToNotify={"hotelId": hotelId ,"guestId": guestId,"title": title , "msg" : msg} ;
	}else{
	valueToNotify={"hotelId": hotelId ,"title": title , "msg" : msg };
	}

	var myJSON = JSON.stringify(valueToNotify);

	var url = 'api/guest/pushNotification?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : myJSON,
		success : function(json) {

			try {
				var obj = json;
				var count = 0;
				if (obj['success'] == true) {
					$('#msg_title').val('');
					$('#messages').val('');
					$('#guestid').val('');
					toastr.success("Message sent successfully");
					document.getElementById("notification-div").style.display = "none";
				} else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {

				$('#msg_title').val('');
				$('#messages').val('');
				$('#guestid').val('');
				toastr.error("failed");
				document.getElementById("notification-div").style.display = "none";
			}
		},
		error : function() {

			$('#msg_title').val('');
			$('#messages').val('');
			$('#guestid').val('');
			toastr.error("Message sent failed");
			document.getElementById("notification-div").style.display = "none";
		}
	});
}


function loadOrdersForDashboard(){
    var token = window.localStorage.getItem("token");
	var staffId = window.localStorage.getItem("clientId");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getAllOrder?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"staffId":' + staffId + ',"hotelCode":' + hotelCode+'}',
		success : function(json) {

			try {
				if (json['success'] == true) {

				var displayNoOrder=false;
					var tabl = "<table class=table no-margin'>"+
					"<thead>"+
					"<tr>"+
						"<th>Room #</th>"+
						"<th>Items</th>"+
						"<th>Status</th>"+
						"<th>Time</th>"+
						"<th>Action</th>"+
						"</tr>"+
						"</thead>"+
						"<tbody>";
					var itr = 0;
					var arr = [];
					var rooms = [];
					var ords = json.orders;
					for(var i=0; i< json.orders.length ; i++){
					var guestCode = ords[i].guest.guestCode;
					var room = ords[i].guest.roomNumber;
						for(k=0; k< ords[i].order.length; k++){
							var or = JSON.parse(JSON.stringify(ords[i].order[k]));
							or.roomNo=room;
							or.guestCode=guestCode;
							arr.push(or);
							rooms.push(ords[i].guest.roomNumber);
						}
					}
					var orders = JSON.parse(JSON.stringify(arr));

					var itr = 0;

					orders.sort(function(a, b){
						//moment(b.orderDate, 'MMM Do YYYY, h:mm:ss a');
						return moment(b.orderDate, 'MMM DD YYYY, h:mm:ss a') - moment(a.orderDate, 'MMM DD YYYY, h:mm:ss a');;
					});
					for (var j = 0; j < arr.length; j++){
						if(itr>=7)
							break;
				 		var itemNames="";
				 		for(k=0;k<orders[j].items.length; k++){
							 if(orders[j].items[k].itemName){
								itemNames+=orders[j].items[k].itemName+", ";
							 }else{
								itemNames+=orders[j].items[k].serviceName;
								 if(orders[j].items[k].source){
									var tmp = "("+orders[j].items[k].source+"-"+orders[j].items[k].destination+"), ";
									itemNames += tmp;
								 }else{
									 itemNames += ", "
								 }
								
							 }
				 		}
				 		itemNames = itemNames.substring(0, itemNames.length-2);
				 		if(itemNames.length>12){
				 			itemNames = itemNames.substring(0, 12)+"...";
				 		}
				 		var orderStatus = orders[j].orderStatus;
				 		var ors="";
				 		var actionButton = "";
				 		var locallizedDate =moment(new Date(orders[j].orderDate+" UTC")).format('MMM DD, hh:mm:ss a').toString();
				 		if("Completed"!=orderStatus){
				 			itr++;
				 			ors="<span class='label label-success'>Completed</span>";
							if("Inprogress"==orderStatus){
								ors="<span class='label label-info'>In progress</span>";
								actionButton = "<a style='cursor:pointer' class='label label-info' onclick=\"performOrderClose('"+orders[j].orderId+"','"+orders[j].guestCode+"')\">Details</a>";
							}
							if("Initialize"==orderStatus){
								ors="<span class='label label-danger'>Open</span>";
								actionButton = "<a style='cursor:pointer' class='label label-info' onclick=\"performOrderAccept('"+orders[j].orderId+"','"+orders[j].guestCode+"')\">Details</a>";
							}
							tabl = tabl + "<tr><td>"+orders[j].roomNo+"</td><td>"+itemNames+"</td><td>"+ors+"</td><td>"+locallizedDate+"</td><td>"+actionButton+"</td></tr>";
						}

					}

						tabl=tabl+"</tbody></table>";
						document.getElementById('dashboard-order-box').innerHTML = tabl;



				} else {
					document.getElementById('dashboard-order-box').innerHTML = " <span><center>No orders found</center></span>";
				}
			} catch (e) {
			}
		},
		error : function() {
		}
	});
}
function performOrderClose(orderId, guestCode){

	var token = window.localStorage.getItem("token");
	$("#main-content").load("admin/orders.html?access_token="+window.localStorage.getItem("token"), function(responseTxt, statusTxt, jqXHR){
            if(statusTxt == "success"){
							$('#order-tabs a[href="#inprogress-order-div"]').trigger('click');
            }

        });
	//changeActiveClass('inprogress-order-div');
	/*
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

				if (json.success == true) {
					toastr.success('Order completed');
					loadOrdersForDashboard();
					getDashBoardDetails();
				}  else {

				}
			} catch (e) {
				toastr.success('Failed to complete order');
			}
		},
		error : function() {
		}
	});
*/}

function performOrderAccept(orderId, guestCode){
	var token = window.localStorage.getItem("token");
	$("#main-content").load("admin/orders.html?access_token="+window.localStorage.getItem("token"));
	//changeActiveClass('pending-order-div');
	/*
	var url = '/api/guest/assignStaff?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async: false,
		data : '{"userCode": '+guestCode+',"orderId": '+orderId+',"staffId": '+staffId+',"staffName": "'+staffName+'"}',
		success : function(json) {
			try {
				if (json.success == true) {

					toastr.success('Order accepted');
					loadOrdersForDashboard();
					getDashBoardDetails();
				} else {
					toastr.error('failed to accept order');

				}
			} catch (e) {

			}
		},
		error : function(xhr, status) {


		}
	});
*/}
function checkoutGuest(guestCode){
    var token = window.localStorage.getItem("token");
	var url = '/api/guest/chekoutGuest?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async: false,
		data : '{"userCode": '+guestCode+'}',
		success : function(json) {
			try {
				if (json.success == true) {

					toastr.success('Guest checked-out successfully');
					getCheckedInCust();
				} else {
					toastr.error('Guest checked-out failed');
				}
			} catch (e) {
				//toastr.error('Guest checkout failed');
			}
		},
		error : function(xhr, status) {

		}
	});
}

function view_order_summary(guestId){
        isValidToken();
		$("#main-content").load("admin/order-sumary.html?access_token="+window.localStorage.getItem("token"));
        setTimeout(function(){
        var url = '/api/guest/getOrderListByGuestId?access_token=' + window.localStorage.getItem("token");
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: url,
            data: '{"guestId":' + guestId + '}',
            success: function (json) {
                try {
                    var guest=''
                    if(json && json.guest){
                       guest += '<tr>';
                       guest += '<td>'+json.guest.guestCode+'</td>';
                       guest += '<td>'+json.guest.guestName+'</td>'
                       guest += '<td>'+json.guest.roomNumber+'</td>'
                       guest += '<td>'+json.guest.mobile+'</td>'
                       guest += '<td>'+json.guest.checkinDate+'</td>'
                       guest += '</tr>';
                    }

                    document.getElementById("guestDetailId").innerHTML =guest;
                    if(json && json.order){

                      var content = '';
                      var count = 1;
                      var grandSum = 0;
                      for(var i = 0; i<json.order.length; i++) {

                        if(json.order[i].items && Array.isArray(json.order[i].items)){
                            for(var j=0; j< json.order[i].items.length; j++){
								if( json.order[i].items[j].isItemAvailable == undefined || json.order[i].items[j].isItemAvailable == "undefined" || json.order[i].items[j].isItemAvailable ==true){
									var grandTotal = 0;
									var sgst = ((json.order[i].items[j].qty * json.order[i].items[j].amount * json.order[i].items[j].sgst)/100);
									if(isNaN(sgst)){
										sgst = 0;
									}
									var cgst = ((json.order[i].items[j].qty * json.order[i].items[j].amount * json.order[i].items[j].cgst)/100);
									if(isNaN(cgst)){
										cgst = 0;
									}

									grandTotal = ((json.order[i].items[j].qty * json.order[i].items[j].amount) + (cgst + sgst)) ;
									grandSum += grandTotal;
									content += '<tr>';
									content += '<td>'+ (count++) +'</td>'
									content += '<td>'+ json.order[i].items[j].itemName +'</td>'
									content += '<td>'+ json.order[i].orderStatus +'</td>'
									content += '<td>'+ json.order[i].orderDate +'</td>'
									content += '<td>'+ json.order[i].items[j].qty +'</td>'
									content += '<td>'+ json.order[i].items[j].amount +'</td>'
									content += '<td>'+ (json.order[i].items[j].qty * json.order[i].items[j].amount).toFixed(2) +'</td>'
									content += '<td>'+ sgst.toFixed(2) +'</td>'
									content += '<td>'+ cgst.toFixed(2) +'</td>'
									content += '<td>'+ grandTotal.toFixed(2) +'</td>'
									content += '</tr>';

								}

                            }
                                content += '<tr>';
                                content += '<th colspan=9> Grand Total Amount (In Rupees)</th>'
                                content += '<th>'+ grandSum.toFixed(2) +'</th>'
                                content += '</tr>';

                        }


                    }
                    document.getElementById("myOrderId").innerHTML =content;
                    }
                    } catch (e) {
                   // alert("not able to fetch checked in cust..  ");
                }
            },
            error: function () {
               // alert("not able to fetch checked in cust..  ");
            }
        },2000);

        });
    }
