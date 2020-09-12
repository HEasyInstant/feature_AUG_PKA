
function addFeedbackQue() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var question = $.trim($('#que').val());
	var type = $.trim($('#ans').val());
	var url = '/admin/api/hotel/addFeedback?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":"' + hotelId + '","question":"' + question + '","type":"' + type + '"}',
		success : function(json) {
			try {
				var obj = json;
				if (obj['success'] == true) {
					toastr.success("FeedBack Question Added Successfully");
					$("#que").val('');
					getfeedbacklist();
					getfeedbackAnswers();
				} else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				toastr.error("FeedBack Question Not Added");
			}
		},
		error : function(xhr) {
			toastr.error("FeedBack Question Not Added");
		}
	});
}

function getfeedbacklist() {
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getFeedback?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelCode":' + hotelCode + '}',
		success : function(json) {
			try {
				var obj = json;
				var num = 0;
				if (json.success == true) {
					if (json.feedback == null) {
						var tabledata = "<table id='feed' class='table table-bordered table-striped'>"+
						"<thead><tr>"+
						"<th>#</th>"+
						"<th>Questions</th>"+
						"<th>Type</th>"+
						"<th>Action</th>"+
						"</tr></thead>"+
						"<tbody>";
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('feedqtn-data-table').innerHTML = tabledata;
						$('#feed').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
							/*"order": [[ 3, 'desc' ]]*/
						});
					} else {
						var len = obj['feedback'].length;
						var tabledata = "<table id='feed' class='table table-bordered table-striped'>"+
						"<thead><tr>"+
						"<th>#</th>"+
						"<th>Questions</th>"+
						"<th>Type</th>"+
						"<th>Action</th>"+
						"</tr></thead>"+
						"<tbody>";
						$('#feedbackQuestion-list').empty();
						$("#feedbackQuestion-list").append("<option value=''>Select Questions</option>");
						for (var i = len - 1; i >= 0; i--) {
							tabledata = tabledata + 
							"<tr>"+ 
								"<td>" + (++num) + "</td>"+ 
								"<td>" + obj['feedback'][i]['question'] + "</td>"+ 
								"<td>" + obj['feedback'][i]['type'] + "</td>"+
								"<td><a class='users-list-name' href='#'"+
								"onclick='showRecordForEdit("+JSON.stringify(obj['feedback'][i])+")'>"+
								"<span class='glyphicon glyphicon-edit'></span>"+
							"</tr>";
							$("#feedbackQuestion-list").append("<option value='"+obj['feedback'][i]['feedbackId']+"'>" + obj['feedback'][i]['question'] + "</option>");
						}
						//debugger;
						tabledata = tabledata + "</tbody></table>";
						document.getElementById('feedqtn-data-table').innerHTML = tabledata;
						$('#feed').DataTable({
							"paging" : true,
							"lengthChange" : true,
							"searching" : true,
							"ordering" : true,
							"info" : true,
							"autoWidth" : true
						});
					}
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

var feedbackRecordForEdit = '';
var showRecordForEdit = function(feedbackRecord){
	//alert('in function showRecordForEdit : '+feedbackRecord);
	feedbackRecordForEdit = feedbackRecord;
	
	$('#feedback-form-title').text('Update Feedback Question');	
	$('#questionId').val(feedbackRecord.feedbackId);
	$('#editQuestion').val(feedbackRecord.question);
	$('#editAns').val(feedbackRecord.type);
	
	$('#add-feed').css('display', 'none');
	$('#update-feed').css('display', 'block');
	
	$('#feedback_tabs li:eq(1) a').tab('show');
};

function updateFeedbackQue() {
	event.preventDefault();
	var token = window.localStorage.getItem("token");
	var hotelId = window.localStorage.getItem("hotelCodeVal");
	var oldQuestion = feedbackRecordForEdit.question;
	var oldType = feedbackRecordForEdit.type;
	var feedbackId = $.trim($('#questionId').val());
	var question = $.trim($('#editQuestion').val());
	var type = $.trim($('#editAns').val());
	/*alert('old question : '+oldQuestion);
	alert('old type : '+oldType);
	alert('question : '+question);
	alert('type : '+type);*/
	if(oldQuestion == question && oldType == type){
		toastr.error('Invalid operation modify atleast one data');
		return;
	}
	var url = '/admin/api/hotel/updateFeedback?access_token=' + token;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		data : '{"hotelId":' + hotelId + ',"question":"' + question + '","type":"' + type + '","feedbackId":' + feedbackId + '}',
		success : function(json) {
			try {
				var obj = json;
				if (obj['success'] == true) {
					toastr.success("FeedBack Question Updated Successfully");
					$("#editQuestion").val('');
					$('#feedback-form-title').text('Add Feedback Question');	
					$('#add-feed').css('display', 'block');
					$('#update-feed').css('display', 'none');
					getfeedbacklist();
					getfeedbackAnswers();
				} else {
					console.log("inserted count is: " + json.insertedCount);
				}
			} catch (e) {
				toastr.error("FeedBack Question Not Updated");
			}
		},
		error : function(xhr) {
			toastr.error("FeedBack Question Not Updated");
		}
	});
}

function getfeedbackAnswers(){
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	var url = '/admin/api/hotel/getFeedback?access_token=' + token;
	var feedbackIds = [];
	var tabledata = "<table id='feedbackAns' class='table table-bordered table-striped'>" + "<thead><tr><th>#</th><th>Feedback Id</th><th>Answer</th></tr></thead>" + "<tbody>";
	var num=0;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : url,
		async:false,
		data : '{"hotelCode":' + hotelCode + '}',
		success : function(json) {
			try {
				var obj = json;
				if (obj['success'] == true) {
					var len = obj['feedback'].length;
					for (var i = len-1; i >=0; i--) {
						
						$.ajax({
							type : 'POST',
							dataType : 'json',
							async:false,
							contentType : 'application/json',
							url : "/api/guest/getAllFeedbackAnswer",
							data : '{"hotelId":' + hotelCode + ',"feedbackId":'+obj['feedback'][i]['feedbackId']+'}',
							success : function(json) {
								try {
									var obj = json;
									
									
									if (obj['success'] == true) {
										var len = obj['feedbacks'].length;
										for (var i = len-1; i >=0; i--) {
											tabledata = tabledata + "<tr>" + "<td>" + (++num) + "</td>" + "<td>" + obj['feedbacks'][i]['feedbackId'] + "</td>" + "<td>" + obj['feedbacks'][i]['answer'] + "</td>" +"</tr>";
										}
										
									}
									
								} catch (e) {
								}
							}
						});
					
					}
					tabledata = tabledata + "</tbody></table>";
					document.getElementById('feedback-answers-table').innerHTML = tabledata;
					$('#feedbackAns').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : true,
					});
					
				} 
			} catch (e) {
			}
		}
	});	
	
}

function getFeedbackByIdWithCount(fid){
	var token = window.localStorage.getItem("token");
	var hotelCode = window.localStorage.getItem("hotelCodeVal");
	$('#rating_div').hide();
	$.ajax({
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		url : "/api/guest/getFeedbackByIdWithCount?access_token=" + token,
		data : '{"hotelId":' + hotelCode + ',"feedbackId":'+fid+'}',
		success : function(json) {
			
				if(json.success == true && json.feedbacks.length==1){
					var innerJson=json.feedbacks[0];
					if(innerJson.answers.hasOwnProperty('yes') || innerJson.answers.hasOwnProperty('no')){
						var yesCount=0;
						var noCount=0;
						if(innerJson.answers.hasOwnProperty('yes')){
							yesCount = innerJson.answers.yes;
						}
						if(innerJson.answers.hasOwnProperty('no')){
							noCount = innerJson.answers.no;
						}
						var totalAns = yesCount + noCount;
						var perYes=(yesCount)*100/totalAns;
						 var perNo=(noCount)*100/totalAns;
						 $('#histo_4').hide();
						 $('#histo_3').hide();
						 $('#histo_2').hide();
						 document.getElementById('total_5').innerHTML=yesCount;
						 document.getElementById('total_1').innerHTML=noCount;
						 document.getElementById('total_count_span').innerHTML=totalAns;
						 document.getElementById('option_five').innerHTML='YES';
						 document.getElementById('option_one').innerHTML='NO';
						 
						 
						 $('#rating_div').show();
					  	$('#bar-five').width(perYes+"%");
					  	$('#bar-one').width(perNo+"%");
					  	$('#average_span').hide();
					  	$('#rating-users').addClass('no_average');
					  	
					  	
					}
					else 
					if(innerJson.answers.hasOwnProperty('5') || innerJson.answers.hasOwnProperty('4') || innerJson.answers.hasOwnProperty('3') || innerJson.answers.hasOwnProperty('2') | innerJson.answers.hasOwnProperty('1')){
						var oneCount=0;
						var twoCount=0;
						var threeCount=0;
						var fourCount=0;
						var fiveCount=0;
						
						if(innerJson.answers.hasOwnProperty('1')){
							oneCount = innerJson.answers["1"];
						}
						if(innerJson.answers.hasOwnProperty('2')){
							twoCount = innerJson.answers["2"];
						}
						if(innerJson.answers.hasOwnProperty('3')){
							threeCount = innerJson.answers["3"];
						}
						if(innerJson.answers.hasOwnProperty('4')){
							fourCount = innerJson.answers["4"];
						}
						if(innerJson.answers.hasOwnProperty('5')){
							fiveCount = innerJson.answers["5"];
						}
						
						var totalAns=oneCount+twoCount+threeCount+fourCount+fiveCount;
						
						var perFive=(fiveCount)*100/totalAns;
						 var perFour=(fourCount)*100/totalAns;
						 var perThree=(threeCount)*100/totalAns;
						 var perTwo=(twoCount)*100/totalAns;
						 var perOne=(oneCount)*100/totalAns;
						 //calculate average:
						 var avg = [(5*fiveCount) + (4*fourCount) + (3*threeCount) + (2*twoCount) + (1*oneCount)] / (totalAns);
						 avg = avg.toFixed(2);
						 document.getElementById('total_5').innerHTML=fiveCount;
						 document.getElementById('total_4').innerHTML=fourCount;
						 document.getElementById('total_3').innerHTML=threeCount;
						 document.getElementById('total_2').innerHTML=twoCount;
						 document.getElementById('total_1').innerHTML=oneCount;
						 document.getElementById('total_count_span').innerHTML=totalAns;
						 
						 document.getElementById('option_five').innerHTML='EXCELLENT';
						 document.getElementById('option_four').innerHTML='GOOD';
						 document.getElementById('option_three').innerHTML='AVERAGE';
						 document.getElementById('option_two').innerHTML='POOR';
						 document.getElementById('option_one').innerHTML='NO COMMENT';
						 
						 
						 $('#average_span').show();
						 document.getElementById('average_span').innerHTML=avg;
						 $('#rating-users').removeClass('no_average');
						 
						//$('.bar span').hide();
						 $('#histo_4').show();
						 $('#histo_3').show();
						 $('#histo_2').show();
						 $('#rating_div').show();
						  	$('#bar-five').width(perFive+"%");
						  	$('#bar-four').width(perFour+"%");
						  	$('#bar-three').width(perThree+"%");
						  	$('#bar-two').width(perTwo+"%");
						  	$('#bar-one').width(perOne+"%");
				     
					} else
						if(innerJson.type=='comment'){
							var arr = Object.keys(innerJson.answers).map(function(k) { return k });
							
							var tableData = "<table id='display_feedbckcomments_table' class='table table-bordered table-striped'>" + "<thead><tr><th>#</th><th>Comments</th></tr></thead>" + "<tbody>";
							for (var i = 0; i<arr.length; i++) {
								tableData = tableData + "<tr>" +"<td>" + (i+1) + "</td><td>" + arr[i] + "</td></tr>";
						
							}
							tableData = tableData + "</tbody></table>";
							document.getElementById('rating_div_comments').innerHTML = tableData;
							$('#display_feedbckcomments_table').DataTable({
								"paging" : true,
								"lengthChange" : true,
								"searching" : true,
								"ordering" : true,
								"info" : true,
								"autoWidth" : true,
								"pageLength": 8
							});
							$('#rating_div_comments').show();
						}
					else{
						$('#rating_div_comments').hide();
						$('#rating_div').hide();
						$('#rating_div_info').show();
					}
						
					 $('#rating_loader').hide();	
						
						
				}
			},
		error : function(error){
			toastr.error('error'+error);
		}	
		});
}
