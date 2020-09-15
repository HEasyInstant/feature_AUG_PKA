<!DOCTYPE html>
<!-- saved from url=(0032)http://ka.railwire.co.in/subcntl -->
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Stayoh</title>

		<meta name="description" content="User login page">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

		<link rel="stylesheet" href="css/bootstrap.css">
		<link rel="stylesheet" href="css/font-awesome.css">
		<link rel="stylesheet" href="css/jquery-ui.custom.css">
		<link rel="stylesheet" href="css/chosen.css">
		<link rel="stylesheet" href="css/select2.css">
		<link rel="stylesheet" href="css/datepicker.css">
		<link rel="stylesheet" href="css/bootstrap-editable.css">
		<link rel="stylesheet" href="css/bootstrap-timepicker.css">
		<link rel="stylesheet" href="css/daterangepicker.css">
		<link rel="stylesheet" href="css/bootstrap-datetimepicker.css">
		<link rel="stylesheet" href="css/jquery.gritter.css">
		<link rel="stylesheet" href="css/toastr.min.css">
		<link rel="stylesheet" href="css/sweet-alert.css">

		<link rel="stylesheet" href="css/ace-fonts.css">
		<link rel="stylesheet" href="css/ace.css" class="ace-main-stylesheet" id="main-ace-style">
		<link rel="stylesheet" href="plugins/light-box/custom.css">
		<!--[if lte IE 9]>
		<link rel="stylesheet" href="/admin/assets/css/ace-part2.css"/>
		<![endif]-->

		<!--[if lte IE 9]>
		<link rel="stylesheet" href="/admin/assets/css/ace-ie.css"/>
		<![endif]-->
		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<script src="admin/assets/js/ace-extra.js"></script>
		<!--[if lt IE 9]>
		<script src="/admin/assets/js/html5shiv.js"></script>
		<script src="/admin/assets/js/respond.js"></script>
		<![endif]-->
		<script src="/admin/assets/scripts/requestHandler.js"></script>
		<script src="admin/assets/scripts/main.js"></script>
		<script src="admin/assets/scripts/visualContents.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
	</head>
	<script>
		function inject() {
			function a() {
				function a(a) {
					parent.postMessage({
						type : "blockedWindow",
						args : JSON.stringify(a)
					}, l)
				}

				function b(a) {
					var b = a[1];
					return null != b && ["_blank", "_parent", "_self", "_top"].indexOf(b) < 0 ? b : null
				}

				function e(a, b) {
					var c;
					for (c in a)
					try {
						void 0 === b[c] && (b[c] = a[c])
					} catch(d) {
					}
					return b
				}

				var g = arguments,
				    h = !0,
				    j = null,
				    k = null;
				if (null != window.event && ( k = window.event.currentTarget), null == k) {
					for (var m = g.callee; null != m.arguments && null != m.arguments.callee.caller; )
						m = m.arguments.callee.caller;
					null != m.arguments && m.arguments.length > 0 && null != m.arguments[0].currentTarget && ( k = m.arguments[0].currentTarget)
				}
				null != k && ( k instanceof Window || k === document || null != k.URL && null != k.body || null != k.nodeName && ("body" == k.nodeName.toLowerCase() || "#document" == k.nodeName.toLowerCase())) ? (window.pbreason = "Blocked a new window opened with URL: " + g[0] + " because it was triggered by the " + k.nodeName + " element",
				h = !1) : h = !0;
				document.webkitFullscreenElement || document.mozFullscreenElement || document.fullscreenElement;
				if (((new Date).getTime() - d < 1e3 || isNaN(d) && c()) && (window.pbreason = "Blocked a new window opened with URL: " + g[0] + " because a full screen was just initiated while opening this url.", document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(),
				h = !1), 1 == h) {
					j = f.apply(this, g);
					var n = b(g);
					if (null != n && (i[n] = j), j !== window) {
						var o = (new Date).getTime(),
						    p = j.blur;
						j.blur = function() {
							(new Date).getTime() - o < 1e3 ? (window.pbreason = "Blocked a new window opened with URL: " + g[0] + " because a it was blured", j.close(), a(g)) : p()
						}
					}
				} else {
					var q = {
						href : g[0]
					};
					q.replace = function(a) {
						q.href = a
					},
					j = {
						close : function() {
							return !0
						},
						test : function() {
							return !0
						},
						blur : function() {
							return !0
						},
						focus : function() {
							return !0
						},
						showModelessDialog : function() {
							return !0
						},
						showModalDialog : function() {
							return !0
						},
						prompt : function() {
							return !0
						},
						confirm : function() {
							return !0
						},
						alert : function() {
							return !0
						},
						moveTo : function() {
							return !0
						},
						moveBy : function() {
							return !0
						},
						resizeTo : function() {
							return !0
						},
						resizeBy : function() {
							return !0
						},
						scrollBy : function() {
							return !0
						},
						scrollTo : function() {
							return !0
						},
						getSelection : function() {
							return !0
						},
						onunload : function() {
							return !0
						},
						print : function() {
							return !0
						},
						open : function() {
							return this
						},
						opener : window,
						closed : !1,
						innerHeight : 480,
						innerWidth : 640,
						name : g[1],
						location : q,
						document : {
							location : q
						}
					}, e(window, j), j.window =
					j;
					var n = b(g);
					if (null != n)
						try {
							i[n].close()
						} catch(r) {
						}
					setTimeout(function() {
						var b;
						b = j.location instanceof Object ? j.document.location instanceof Object ? null != q.href ? q.href : g[0] : j.document.location : j.location, g[0] =
						b, a(g)
					}, 100)
				}
				return j
			}

			function b(a) {
				d = a ? (new Date).getTime() : 0 / 0
			}

			function c() {
				return document.fullScreenElement && null !== document.fullScreenElement || null != document.mozFullscreenElement || null != document.webkitFullscreenElement
			}

			var d,
			    e = "originalOpenFunction",
			    f = window.open,
			    g = document.createElement,
			    h = document.createEvent,
			    i = {},
			    j = 0,
			    k = null,
			    l = window.location != window.parent.location ? document.referrer : document.location;
			window[e] = window.open, window.open = function() {
				try {
					return a.apply(this, arguments)
				} catch(b) {
					return null
				}
			}, document.createElement = function() {
				var a = g.apply(document, arguments);
				if ("a" == arguments[0] || "A" == arguments[0]) {
					j = (new Date).getTime();
					var b = a.dispatchEvent;
					a.dispatchEvent = function(c) {
						return null != c.type && "click" == ("" + c.type).toLocaleLowerCase() ? (window.pbreason = "blocked due to an explicit dispatchEvent event with type 'click' on an 'a' tag", parent.postMessage({
							type : "blockedWindow",
							args : JSON.stringify({
								0 : a.href
							})
						}, l), !0) : b(c)
					},
					k =
					a
				}
				return a
			}, document.createEvent = function() {
				try {
					return arguments[0].toLowerCase().indexOf("mouse") >= 0 && (new Date).getTime() - j <= 50 ? (window.pbreason = "Blocked because 'a' element was recently created and " + arguments[0] + " event was created shortly after", arguments[0] = k.href, parent.postMessage({
						type : "blockedWindow",
						args : JSON.stringify({
							0 : k.href
						})
					}, l), null) : h.apply(document, arguments)
				} catch(a) {
				}
			}, document.addEventListener("fullscreenchange", function() {
				b(document.fullscreen)
			}, !1), document.addEventListener("mozfullscreenchange", function() {
				b(document.mozFullScreen)
			}, !1), document.addEventListener("webkitfullscreenchange", function() {
				b(document.webkitIsFullScreen)
			}, !1)
		} inject()
	</script>
	<body class="no-skin">
		<div id="navbar" class="navbar navbar-default">
			<script type="text/javascript">
				try {
					ace.settings.check('navbar', 'fixed')
				} catch(e) {
				}
			</script>
			<div class="navbar-container" id="navbar-container">
				<!-- #section:basics/sidebar.mobile.toggle -->
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!-- /section:basics/sidebar.mobile.toggle -->
				<div class="navbar-header pull-left">
					<!-- #section:basics/navbar.layout.brand -->
					<a href="#" class="navbar-brand"> <small> <!--<i class="fa fa-leaf"></i>--> Stayoh Admin Panel </small> </a>
					<!-- /section:basics/navbar.layout.brand -->
					<!-- #section:basics/navbar.toggle -->
					<!-- /section:basics/navbar.toggle -->
				</div>
				<!-- #section:basics/navbar.dropdown -->
				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">

						<li class="light-blue">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle"> <img class="nav-user-photo" src="assets/css/images/avatar2.png" alt="Jason&#39;s Photo"> <span class="user-info" id="uname-span"> </span> <i class="ace-icon fa fa-caret-down"></i> </a>
							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li class="divider"></li>
								<li>
									<a href="#" onclick="signOut()"> <i class="ace-icon fa fa-power-off"></i> Logout </a>
								</li>
							</ul>
						</li>

					</ul>
				</div>
			</div>
		</div>
		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try {
					ace.settings.check('main-container', 'fixed')
				} catch(e) {
				}
			</script>
			<div id="sidebar" class="sidebar responsive">
				<script type="text/javascript">
					try {
						ace.settings.check('sidebar', 'fixed')
					} catch(e) {
					}
				</script>
				<div class="sidebar-shortcuts" id="sidebar-shortcuts">
					<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<span class="btn btn-success"></span>
						<span class="btn btn-info"></span>
						<span class="btn btn-warning"></span>
					</div>
				</div>
				<ul class="nav nav-list">
					<li class="">
						<a href="#" onclick="invokeRequest('/adminpanel')"> <i class="menu-icon fa fa-tachometer"></i> <span class="menu-text"> User Management </span> </a>
						<b class="arrow"></b>
					</li>
					<li class="">
						<!-- <a href="#" onclick="invokeRequest('/customer')"> -->
						<a href="#" > <span class="menu-text"> Add Hotel </span> </a>
						<b class="arrow"></b>
					</li>

				</ul>

			</div>

			<div class="main-content">
				<div class="main-content-inner">
					<div class="breadcrumbs" id="breadcrumbs">
						<script type="text/javascript">
							try {
								ace.settings.check('breadcrumbs', 'fixed')
							} catch(e) {
							}
						</script>
						<ul class="breadcrumb">

						</ul>
					</div>
					<div class="page-content">
						<!--		<div class="alert alert-info">
						<br>
						<strong>Dear Customer</strong>,&nbsp;
						as per the Central Government directive, from 15Nov2015, there is new levy of Swachh Bharat Cess @0.5%
						with this the effective rate of tax would be 14.5% to include the Swachh Bharath Cess(0.5%).
						The revised tax will be applicable on all fees and charges and disbursement  that are levied by Stayoh.
						<br>
						</div>

						<div class="alert alert-block alert-success">
						<button type="button" class="close" data-dismiss="alert">
						<i class="ace-icon fa fa-times"></i>
						</button>

						<i class="ace-icon fa fa-check green"></i>
						Dear Subscriber, Your subscription validity ends on 28-May-2016.
						Please renew your account on or before
						<strong class="green">28-May-2016 </strong> for uninterrupted service.
						</div>-->

						<div class="">
							<div id="user-profile-3" class="user-profile row">
								<div class="col-sm-offset-1 col-sm-10">
									<!--                            <div class="well well-sm">
									<div class="inline middle blue bigger-110"> </div>
									</div>-->
									<div class="space"></div>
									
										<div class="tabbable">
											<ul class="nav nav-tabs padding-16">
												<li class="active">
													<a data-toggle="tab" href="#register-user"> <i class="green ace-icon fa fa-pencil-square-o bigger-125"></i> Register Hotel </a>
												</li>

												<li>
													<a data-toggle="tab" href="#hotel-Admin"> <i class="blue ace-icon fa fa-key bigger-125"></i> Hotel Admin </a>
												</li>
											</ul>
											<div class="tab-content profile-edit-tab-content">

												<div id="register-user" class="tab-pane in active">
													<div class="space-10"></div>
													<div id="hotel-success-alert" class="alert alert-success" style="display:none"></div>
													<div id="hotel-alert" class="alert alert-danger" style="display:none"></div>
													<form class="form-horizontal" id="registerUserFrm" method="post", enctype="multipart/form-data" onsubmit="return false">

														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-HName">Hotel Name</label>

															<div class="col-sm-9">
																<input type="text" name ="hotelName" id="form-field-HName" autocomplete="off"/>

															</div>
														</div>

														<div class="space-4"></div>

														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-HotDes"> Description</label>

															<div class="col-sm-9">

																<!--<input type="text" name ="hotelLoc" id="form-field-name" autocomplete="off" >-->
																<textarea  name="hotelDesc" id="hotelDesc" cols="19" rows="3"></textarea>
															</div>
														</div>

														<div class="space-4"></div>

														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-HotAdd"> Address</label>

															<div class="col-sm-9">

																<!--<input type="text" name ="hotelLoc" id="form-field-name" autocomplete="off" >-->
																<textarea  name="hotelAddress" id="hotelAddress" cols="19" rows="3"></textarea>
															</div>
														</div>

														<div class="space-4"></div>

														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-icon">Icon Image</label>

															<div class="col-sm-9">
																<input type="file" name="hotelIcon" id="hotelIcon" accept="image/*"  >
																<img id="blah" src="#" alt="your image" style="display: none"/>

															</div>
														</div>
														<div class="space-4"></div>

														<div class="form-group">
														<div class="col-sm-9">
															<button type="button" style="left: 34%; position: relative;" data-toggle="modal" data-target="#splashModal" id="select_splash">
                                								Splash Image
                            								</button>
                            								<div id="selectedImage"></div>
                            								</div>
                            								<input type="hidden" id="hotelSplash" name="hotelSplash">
														</div>

														<div class="form-group" style="display: none">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-permission">Permission</label>

															<div class="col-sm-9" style="padding-top: 10px;">
																<input type="radio" name="permission" id="form-field-permission">
																ReadOnly
																<input type="radio" name="permission" id="form-field-permission">
																ReadWrite
																<input type="radio" name="permission" id="form-field-permission">
																Full Permission
															</div>
														</div>

														<div class="modal-footer">
															<input type="hidden" id="baseurl" name="baseurl" value="/">
															<button class="btn btn-mini btn-grey" onclick="addHotel();">
																<i class="ace-icon fa fa-check-circle"></i>
																Add Hotel
															</button>
														</div>

													</form>
												</div>
												<div id="hotel-Admin" class="tab-pane">
													<div class="space-10"></div>
													<div id="admin-success-alert" class="alert alert-success" style="display:none"></div>
													<div id="admin-alert" class="alert alert-danger" style="display:none"></div>
													<form class="form-horizontal" id="admin-form" >
														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right">Hotel Code</label>

															<div class="col-sm-9">
																<input type="text" name ="hotelCodeAdm" id="hotelCodeAdm" autocomplete="off" readonly="readonly">

															</div>
														</div>
														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-name">Name</label>

															<div class="col-sm-9">
																<input type="text" name ="name" id="name" autocomplete="off">

															</div>
														</div> 
														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-admName">User Id</label>

															<div class="col-sm-9">
																<input type="text" name ="adminUName" id="adminUName" autocomplete="off">

															</div>
														</div>
														<div class="space-4"></div>
														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-pass">Email</label>
															<div class="col-sm-9">
																<input type="text" name="email" id="email"  autocomplete="off">
															</div>
														</div>

														<div class="space-4"></div>

														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right" for="form-field-mobile">Mobile</label>

															<div class="col-sm-9">
																<input type="text" name="mobile" id="mobile"  maxlength="10" pattern="[0-9]{10}">
															</div>
														</div>

														<div class="space-4"></div>

														<div class="form-group">
															<label class="col-sm-3 control-label no-padding-right">Permission</label>

															<div class="col-sm-9">
																<select id="permission" name="permission">
																	<option value="Read-Only">Read-Only</option>
																	<option value="Read-Write">Read-Write</option>
																</select>
															</div>
														</div>

														<div class="modal-footer">
															<!--<input type="hidden" id="baseurl" name="baseurl" value="/">-->
															<button type="submit" class="btn btn-mini btn-grey" id="add_hotel_admin">
																<i class="ace-icon fa fa-check-circle"></i>
																Apply change
															</button>
														</div>
													</form>
												</div>
												
											<div class="modal fade" id="splashModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    							<div class="modal-dialog" role="document">
                        							<div class="modal-content">
                            						<div class="modal-header">
                                						<h4 class="modal-title" id="myModalLabel">Choose Splash Icon</h4>
                            						</div>
                           							<div class="modal-body" id="splash_icon_div">
                           							</div>
                           							 <div class="modal-footer">
                                						<button type="button" id="cancel_splash_modal" class="btn btn-default" data-dismiss="modal">
                                    					Cancel
                                						</button>
                               						<button type="button" id="save_splash_modal" class="btn btn-primary" data-dismiss="modal">
                                    					Save
                               						 </button>
                            				</div>
                        </div>
                    </div>
                </div>
                
                
											</div>
										</div>
									
								</div><!-- /.span -->
							</div><!-- /.user-profile -->
						</div>

					</div>
				</div>
			</div>

		</div>

		<div class="footer">
			<div class="footer-inner">
				<div class="footer-content">
					<span> <span class="text-muted">Stayoh Admin Panel</span> � 2016-2017 </span>
					&nbsp; &nbsp;
				</div>
			</div>
		</div>

		<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"> <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i> </a>

		<!--[if !IE]> -->
		<script src="admin/assets/js/jquery.js" type="text/javascript"></script>
		<!-- <![endif]-->
		<!--[if IE]>
		<script src="/admin/assets/js/jquery1x.js" type="text/javascript"></script>
		<![endif]-->
		<script type="text/javascript">
			if ('ontouchstart' in document.documentElement)
				document.write("<script src='../../../../admin/assets/js/jquery.mobile.custom.js'>" + "<" + "/script>");
		</script>
		<script src="admin/assets/js/bootstrap.js"></script>
		<script src="admin/assets/js/jquery-ui.custom.js"></script>
		<script src="admin/assets/js/jquery.ui.touch-punch.js"></script>
		<script src="admin/assets/js/ace.js"></script>
		<script src="/admin/assets/plugins/validators/jquery.validate.min.js"></script>
		<script src="admin/assets/js/toastr.min.js"></script>
		<script src="admin/assets/scripts/suser.js" type="text/javascript"></script>
		<script src="admin/assets/scripts/admHotel.js" type="text/javascript"></script>

		<script type="text/javascript">
			jQuery(document).ready(function() {
				getAllSplashIcons();
				
				var name=localStorage.getItem("name");
				if(name.length>16){
					name = name.substring(0, 16)+"..";
				}
				document.getElementById("uname-span").innerHTML = "<small>Welcome,</small>" + name;
				
				toastr.options = {
					"closeButton" : true,
					"debug" : false,
					"positionClass" : "toast-bottom-right",
					"onclick" : null,
					"showDuration" : "1000",
					"hideDuration" : "1000",
					"timeOut" : "5000",
					"extendedTimeOut" : "1000",
					"showEasing" : "swing",
					"hideEasing" : "linear",
					"hideMethod" : "fadeOut"
				};
				
				$("#cancel_splash_modal").click(function () {
			        $('div[id^="selectedImage"]').html('');
			        $("li[id^='vc_']").css('border', "1px solid #ddd");
			        $('#hotelSplash').val('');
			    });

				$('#admin-form').validate({ 
	                errorElement: 'span',
	                rules: {
	                	adminUName: "required",
	                	name: "required",
	                	mobile:{
	                	      required:true,
	                	      maxlength:12,
	                	      number: true
	                	      }
	                },
	                messages: {
	                	adminUName: "Required !",
	                	name: "Required !",
	                	mobile: {
	                	      required:"Required !",
	                	      maxlength:"Invalid mobile number !",
	                	      number: "Invalid mobile Number"
	                	      }
	                },
	                submitHandler: function (form) { 
	                	addAdminDetails();
	                }
	            });
				
			});

		</script>

	</body>
</html>