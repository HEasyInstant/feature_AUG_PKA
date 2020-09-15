//var token = window.localStorage.getItem("token");
function getOfferByHotelCodeInOffer(){
	var token = window.localStorage.getItem("token");
	//var base_url = $('#baseurl').val().trim();
	//alert('getOfferByServiceId : '+serviceId);
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getOffers?access_token=' + token;
	//console.log(url);
	console.log('{"hotelCode": '+hotelId+'}');
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode": '+hotelId+'}',
		success : function(json) {
			console.log('zafar');
			console.log(json);
			try {
				if (json.success == true) {
					if(json.offers == null || json.offers.length == 0){
						var tabledata = "<table id='display_consolidateoffer_table' class='table table-bordered table-striped'>"+ 
						"<thead><tr><th>#</th>"+
						"<th>Service Name</th>"+
						"<th>Offer Name</th>"+
						"<th>Offer Description</th>"+
						"<th>Offer Discount</th>"+
						"</tr></thead>"+ 
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('view-consolidateoffer-table').innerHTML = tabledata;
						$('#display_consolidateoffer_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						var offers = json.offers;
						var tabledata = "<table id='display_consolidateoffer_table' class='table table-bordered table-striped'>" + 
						"<thead><tr>"+
						"<th>#</th>"+
						"<th>Service Name</th>"+
						"<th>Offer Name</th>"+
						"<th>Offer Description</th>"+
						"<th>Offer Discount</th>"+
						"</tr></thead><tbody>";
						for (var i = 0; i < offers.length; i++) {
							//alert(offers[i].discount);
							getServiceName(offers[i].serviceId);
							tabledata = tabledata + "<tr>" + "<td>" + (i+1) + "</td>" + 
							"<td>" + globalVarServiceName + "</td>" + 
							"<td>" + offers[i].name + "</td>" + 
							"<td>" + offers[i].desc + "</td>" + 
							"<td>" + offers[i].discount + "</td>" + 
							"</tr>";
						}
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('view-consolidateoffer-table').innerHTML = tabledata;
						$('#display_consolidateoffer_table').DataTable({
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
var globalVarServiceName = '';
function getServiceName(serviceId){
    var token = window.localStorage.getItem("token");
	//alert('inside getServiceName serviceId : '+serviceId);
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
			console.log(json);
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
function getOfferByServiceId(serviceId){
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getOffersByServiceId?access_token=' + token;
	//console.log(url);
	//console.log('{"hotelCode": '+hotelId+',"serviceId":' + serviceId +'}');
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
					if(json.offers == null || json.offers.length == 0){
						var tabledata = "<table id='display_offer_table' class='table table-bordered table-striped'>"+ 
						"<thead><tr><th>#</th>"+
						"<th>Name</th>"+
						"<th>Description</th>"+
						"<th>Discount</th>"+
						"<th>Action</th>"+
						"</tr></thead>"+ 
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('offer-data-table').innerHTML = tabledata;
						$('#display_offer_table').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}else{
						var offers = json.offers;
						var tabledata = "<table id='display_offer_table' class='table table-bordered table-striped'>" + 
						"<thead><tr>"+
						"<th>#</th>"+
						"<th>Name</th>"+
						"<th>Description</th>"+
						"<th>Discount</th>"+
						"<th>Action</th>"+
						"</tr></thead><tbody>";
						for (var i = 0; i < offers.length; i++) {
							//var offer = services[i].offer;
							tabledata = tabledata + "<tr>" + "<td>" + (i+1) + "</td>" + 
							"<td>" + offers[i].name + "</td>" + 
							"<td>" + offers[i].desc + "</td>" + 
							"<td>" + offers[i].discount + "</td>" +
							"<td><a class='users-list-name' href='#'"+
							"onclick='deleteOffer("+JSON.stringify(offers[i])+")'>"+
							"<span class='glyphicon glyphicon-remove'></span>"+
							"</tr>";
						}
						//debugger;
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('offer-data-table').innerHTML = tabledata;
						$('#display_offer_table').DataTable({
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
function deleteOffer(offers){
	//alert('deleteOffer : '+offers);
	event.preventDefault();
    var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
    var token = window.localStorage.getItem("token");
    var serviceId = offers.serviceId;
	var offerId = offers.offerId;
	var url = 'admin/api/hotel/deleteServiceOfferToHotel?access_token=' + token;
	/*alert('service id : '+serviceId);
	alert('offer id : '+offerId);*/
    //console.log('url : '+url);
	console.log('{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"offerId":' + offerId +'}');
	//return false;
	$.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: url,
        data: '{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"offerId":' + offerId +'}',
        success: function (json) {
            console.log('browser json' + json);
            try {
                var obj = json;
				if (obj['success'] == true) {
					document.getElementById("add-offer").reset();
					toastr.success('Offer Deleted Successfully.');
					var serviceId = window.localStorage.getItem("offerServiceId");
					getOfferByServiceId(serviceId);
					$("#cancel_ofr_vc_modal").click();
					//$("#main-content").load("admin/services.html");
                } else {
					toastr.error('Offer Not Deleted.');
                    console.log("inserted count is: " + json.insertedCount);
                }
            } catch (e) {
				toastr.error('Offer Not Added.');
            }
        },
        error: function (xhr, status) {
			toastr.error('Offer Not Added.');
        }
    });
}
function getIconsForOffer(){
	var token = window.localStorage.getItem("token");
	var url = '/admin/api/hotel/getAllOfferIcons?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		success : function(json) {
			if (json.success == true) {
			var inner_list="<ul class='rig columns-6'>	";
			for (var i = 0; i < json.icons.length; i++) {
				if(json.icons[i].includes(".DS_Store")==false){ //For mac
				var removedExtension=json.icons[i].replace('.','').replace(/ /g,'');
				inner_list=inner_list+"<li id='vc_"+removedExtension+"'><a href='#' ondblclick=\"selectAndCloseOfrModal('"+json.icons[i]+"')\" onclick=\"getOfrImageName('"+json.icons[i]+"')\" ><img  src='/images/offer-icons/"+json.icons[i]+"' /></a></li>";
				}
			}
			inner_list+="</ul>";
			$("#vidualContent_div").append(inner_list);
			document.getElementById('vidualContent_div').innerHTML =inner_list;
			}
		},
		error : function(xhr, status) {
			
			
		}
	});
}
function getOfrImageName(a){
	$('div[id^="selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/offer-icons/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#vc_'+id;
	$("li[id^='vc_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#offer_thumbnail').val(a);
}

function selectAndCloseOfrModal(a){
	$('div[id^="selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/offer-icons/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#vc_'+id;
	$("li[id^='vc_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#offer_thumbnail').val(a);
	$( "#myModal" ).removeClass( "fade" );
	$('#myModal').modal('hide');
	$('.modal-backdrop').hide();
	$('#offer_thumbnail-error').hide();
}
function addOffer(){
	//alert('inside addOffer');
	event.preventDefault();
    var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
    var token = window.localStorage.getItem("token");
    var serviceId = $("#serviceId").val();
	var offerName = $('#offerName').val().trim();
	var offerDesc = $('#offerDesc').val().trim();
    var offerDiscount = $('#offerDiscount').val().trim();
	var offerIcon = $('#offer_thumbnail').val().trim();
    var url = 'admin/api/hotel/addServiceOfferToHotel?access_token=' + token;
	/*alert('service id : '+serviceId);
	alert('offer name : '+offerName);
	alert('offer desc : '+offerDesc);
	alert('offer discount : '+offerDiscount);
	alert('offer icon : '+offerIcon);*/
    console.log('url : '+url);
	console.log('{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + ',"name":"' + offerName + 
			'","desc":"' + offerDesc + '","discount":"' + offerDiscount +'","iconName":"' + offerIcon +'"}');		
	$.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: url,
        data: '{"hotelCode":' + hotelCode + ',"serviceId":' + serviceId + 
			',"name":"' + offerName + '","desc":"' + offerDesc + 
			'","discount":"' + offerDiscount +'","iconName":"' + offerIcon +'"}',
        success: function (json) {
            console.log('browser json' + json);
            try {
                var obj = json;
				if (obj['success'] == true) {
					document.getElementById("add-offer").reset();
					toastr.success('Offer Added Successfully.');
					var serviceId = window.localStorage.getItem("offerServiceId");
					getOfferByServiceId(serviceId);
					$("#cancel_ofr_vc_modal").click();
					//$("#main-content").load("admin/services.html");
                } else {
					toastr.error(obj['err']);
                    console.log("inserted count is: " + json.insertedCount);
                }
            } catch (e) {
				toastr.error('Offer Not Added.');
            }
        },
        error: function (xhr, status) {
			toastr.error('Offer Not Added.');
        }
    });
}
