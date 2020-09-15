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
<title>Adding and Removing Text Boxes Dynamically</title>
<script type="text/javascript">
var intTextBox=0;
//FUNCTION TO ADD TEXT BOX ELEMENT
function addElement()
{
intTextBox = intTextBox + 1;
var contentID = document.getElementById('content');
var newTBDiv = document.createElement('div');
newTBDiv.setAttribute('id','strText'+intTextBox);
newTBDiv.innerHTML = "Text "+intTextBox+": <input type='text' id='" +
intTextBox + "' name='" + intTextBox + "'/>";
contentID.appendChild(newTBDiv);
}
//FUNCTION TO REMOVE TEXT BOX ELEMENT
function removeElement()
{
if(intTextBox != 0)
{
var contentID = document.getElementById('content');
contentID.removeChild(document.getElementById('strText'+intTextBox));
intTextBox = intTextBox-1;
}
}
</script>


</head>
<body>
<p>Demo of Adding and Removing Text Box Dynamically using JavaScript</p>
<p><a href="javascript:addElement();" >Add</a> <a
href="javascript:removeElement();" >Remove</a></p>
<div id="content"></div>

</body>
</html>