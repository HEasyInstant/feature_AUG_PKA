<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>    
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<%@ page import="java.util.Hashtable"%>
<%@ page import="java.util.List"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Pol List Table view</title>
<link href="<c:url value="/css/tableview.css" />" rel="stylesheet">
</head>
<body>
<div class="caption">Inventory</div>	
<div id="table">
	<div class="header-row row">
    <span class="cell primary">Vehcile</span>
    <span class="cell">Exterior</span>
     <span class="cell">Interior</span>
    <span class="cell">Engine</span>
    <span class="cell">Trans</span>
  </div>
  <div class="row">
	<input type="radio" name="expand">
    <span class="cell primary" data-label="Vehicle">2013 Subaru WRX</span>
    <span class="cell" data-label="Exterior">World Rally Blue</span>
     <span class="cell" data-label="Interior">Black</span>
     <span class="cell" data-label="Engine">2.5L H4 Turbo</span>
    <span class="cell" data-label="Trans"><a href="">5 Speed</a></span>
  </div>
  <div class="row">
	<input type="radio" name="expand">
    <span class="cell primary" data-label="Vehicle">2013 Subaru WRX STI</span>
    <span class="cell" data-label="Exterior">Crystal Black Silica</span>
     <span class="cell" data-label="Interior">Black</span>
     <span class="cell" data-label="Engine">2.5L H4 Turbo</span>
     <span class="cell" data-label="Trans">6 Speed</span>
  </div>
  <div class="row">
	<input type="radio" name="expand">
    <span class="cell primary" data-label="Vehicle">2013 Subaru BRZ</span>
    <span class="cell" data-label="Exterior">Dark Grey Metallic</span>
     <span class="cell" data-label="Interior">Black</span>
     <span class="cell" data-label="Engine">2.0L H4</span>
     <span class="cell" data-label="Trans">6 Speed</span>
  </div>
  <div class="row">
	<input type="radio" name="expand">
    <span class="cell primary" data-label="Vehicle">2013 Subaru Legacy</span>
    <span class="cell" data-label="Exterior">Satin White Pearl</span>
     <span class="cell" data-label="Interior">Black</span>
     <span class="cell" data-label="Engine">2.5L H4</span>
     <span class="cell" data-label="Trans">Auto</span>
  </div>
  <div class="row">
	<input type="radio" name="expand">
    <span class="cell primary" data-label="Vehicle">2013 Subaru Legacy</span>
    <span class="cell" data-label="Exterior">Twilight Blue Metallic</span>
     <span class="cell" data-label="Interior">Black</span>
     <span class="cell" data-label="Engine">2.5L H4</span>
     <span class="cell" data-label="Trans">Auto</span>
  </div>
  <div class="row">
	<input type="radio" name="expand">
    <span class="cell primary" data-label="Vehicle">2013 Subaru Forester</span>
    <span class="cell" data-label="Exterior">Ice Silver Metallic</span>
     <span class="cell" data-label="Interior">Black</span>
     <span class="cell" data-label="Engine">2.5L H4 Turbo</span>
     <span class="cell" data-label="Trans">Auto</span>
  </div>
</div>


</body>
</html>