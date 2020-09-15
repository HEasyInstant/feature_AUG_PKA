function getAllVidualContents() {
	var token = window.localStorage.getItem("token");
	var url = '/admin/api/hotel/getAllServiceIcons?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		success : function(json) {
			if (json.success == true) {
			var inner_list="<ul class='rig columns-6'>	";
			var inner_list_editicon="<ul class='rig columns-6'>";
			for (var i = 0; i < json.icons.length; i++) {
				if(json.icons[i].includes(".DS_Store")==false){ //For mac
				var removedExtension=json.icons[i].replace('.','').replace(/ /g,'');
				inner_list=inner_list+"<li id='vc_"+removedExtension+"'><a href='#' ondblclick=\"selectAndCloseModal('"+json.icons[i]+"')\" onclick=\"getImageName('"+json.icons[i]+"')\" ><img  src='/images/service-icon/"+json.icons[i]+"' /></a></li>";
				inner_list_editicon=inner_list_editicon+"<li id='editvc_"+removedExtension+"'><a href='#' ondblclick=\"selectAndCloseModal('"+json.icons[i]+"')\" onclick=\"getImageNameForEdit('"+json.icons[i]+"')\" ><img  src='/images/service-icon/"+json.icons[i]+"' /></a></li>";
				}
			}
			inner_list+="</ul>";
			inner_list_editicon+="</ul>";
			$( "#vidualContent_div" ).append( inner_list );
			$( "#edit_vidualContent_div" ).append(inner_list_editicon);
			document.getElementById('vidualContent_div').innerHTML =inner_list;
			document.getElementById('edit_vidualContent_div').innerHTML =inner_list_editicon;
			}
		},
		error : function(xhr, status) {
			
			
		}
	});
}

function getAllBackgroungImages() {
	var token = window.localStorage.getItem("token");
	var url = '/admin/api/hotel/getAllBackgroundImages?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		success : function(json) {
			if (json.success == true) {
				var inner_list="<ul class='rig columns-6'>	";
				var inner_list_eidtbkimg="<ul class='rig columns-6'>";
				for (var i = 0; i < json.icons.length; i++) {
					if(json.icons[i].includes(".DS_Store")==false){ //For mac
						var removedExtension=json.icons[i].replace('.','').replace(/ /g,'');
						inner_list=inner_list+"<li id='bkg_"+removedExtension+"'><a href='#' ondblclick=\"selectAndCloseBkgModal('"+json.icons[i]+"')\" onclick=\"getBkgImageName('"+json.icons[i]+"')\" ><img  src='/images/service-background/"+json.icons[i]+"' /></a></li>";
						inner_list_eidtbkimg=inner_list_eidtbkimg+"<li id='editbkg_"+removedExtension+"'><a href='#' ondblclick=\"selectAndCloseBkgModal('"+json.icons[i]+"')\" onclick=\"getBkgImageNameForEdit('"+json.icons[i]+"')\" ><img  src='/images/service-background/"+json.icons[i]+"' /></a></li>";
					}
				}
				inner_list+="</ul>";
				inner_list_eidtbkimg+="</ul>";
				$( "#bkimgs_div" ).append( inner_list );
				$( "#eidt_bkimgs_div" ).append(inner_list_eidtbkimg);
				document.getElementById('bkimgs_div').innerHTML =inner_list;
				document.getElementById('eidt_bkimgs_div').innerHTML =inner_list_eidtbkimg;
			}
		},
		error : function(xhr, status) {
			
			
		}
	});
}

function getAllSplashIcons(){
	var token = window.localStorage.getItem("token");
	var url = '/admin/api/hotel/getAllHotelSplash?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		success : function(json) {
			if (json.success == true) {
			var inner_list="<ul class='rig columns-6' style='position: relative;margin-left: 10px;'>	";
			
			for (var i = 0; i < json.icons.length; i++) {
				if(json.icons[i].includes(".DS_Store")==false){ //For mac
				var removedExtension=json.icons[i].replace('.','').replace(/ /g,'');
				inner_list=inner_list+"<li id='vc_"+removedExtension+"'><a href='#' ondblclick=\"selectAndCloseSplash('"+json.icons[i]+"')\" onclick=\"getHotelSplashName('"+json.icons[i]+"')\" ><img  src='/images/hotel-splash/"+json.icons[i]+"' /></a></li>";
				}
			}
			inner_list+="</ul>";
			$( "#splash_icon_div" ).append( inner_list );
			document.getElementById('splash_icon_div').innerHTML =inner_list;
			}
		},
		error : function(xhr, status) {
			
			
		}
	});
}


function getImageName(a){
	$('div[id^="selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-icon/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#vc_'+id;
	$("li[id^='vc_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#service_thumbnail').val(a);
}

function selectAndCloseModal(a){
	$('div[id^="selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-icon/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#vc_'+id;
	$("li[id^='vc_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#service_thumbnail').val(a);
	$( "#myModal" ).removeClass( "fade" );
	$('#myModal').modal('hide');
	$('.modal-backdrop').hide();
	$('#service_thumbnail-error').hide();
}

function getImageNameForEdit(a){
	$('div[id^="editSelectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-icon/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#editvc_'+id;
	$("li[id^='editvc_']" ).css('border', "1px solid #ddd");
	$(id).css('border', "solid 2px red"); 
	$('#edit_service_thumbnail').val(a);
}
function selectAndCloseModalForEdit(a){
	$('div[id^="editSelectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-icon/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#editvc_'+id;
	$("li[id^='editvc_']" ).css('border', "1px solid #ddd");
	$(id).css('border', "solid 2px red"); 
	$('#edit_service_thumbnail').val(a);
	$( "#editMyModal" ).removeClass( "fade" );
	$('#editMyModal').modal('hide');
	$('.modal-backdrop').hide();
}

function selectAndCloseBkgModal(a){
	$('div[id^="bkg_selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-background/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#bkg_'+id;
	$("li[id^='bkg_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#bkimgs_thumbnail').val(a);
	$( "#bkimgs" ).removeClass( "fade" );
	$('#bkimgs').modal('hide');
	$('.modal-backdrop').hide();
	$('#bkimgs_thumbnail-error').hide();
}

function selectAndCloseBkgModalForEdit(a){
	$('div[id^="edit_bkg_selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-background/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#editbkg_'+id;
	$("li[id^='editbkg_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#edit_bkimgs_thumbnail').val(a);
	$( "#editbkimgs" ).removeClass( "fade" );
	$('#editbkimgs').modal('hide');
	$('.modal-backdrop').hide();
}

function getBkgImageName(a){
	$('div[id^="bkg_selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-background/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#bkg_'+id;
	$("li[id^='bkg_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#bkimgs_thumbnail').val(a);	
}

function getBkgImageNameForEdit(a){
	$('div[id^="edit_bkg_selectedImage"]').html("<img width='10%' style=\"margin-left:25%;margin-top:-7%;\" src=\"/images/service-background/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#editbkg_'+id;
	$("li[id^='editbkg_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#edit_bkimgs_thumbnail').val(a);	
}


function selectAndCloseSplash(a){
	$('div[id^="selectedImage"]').html("<img width='10%' style=\"margin-left:52%;margin-top:-7%;\" src=\"/images/hotel-splash/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#vc_'+id;
	$("li[id^='vc_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#hotelSplash').val(a);
	$( "#splashModal" ).removeClass( "fade" );
	$('#splashModal').modal('hide');
	$('.modal-backdrop').hide();
	
}

function getHotelSplashName(a){
	$('div[id^="selectedImage"]').html("<img width='10%' style=\"margin-left:52%;margin-top:-7%;\" src=\"/images/hotel-splash/"+a+"\"/>");
	var id=a.replace('.','').replace(/ /g,'');
	id='#vc_'+id;
	$("li[id^='vc_']" ).css('border', "1px solid #ddd"); 
	$(id).css('border', "solid 2px red"); 
	$('#hotelSplash').val(a);
}