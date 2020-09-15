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
<title>Insert title here</title>
<%-- <link href="<c:url value="/css/bootstrap.min.css" />" rel="stylesheet">
<script src="<c:url value="/js/bootstrap.min.js" />"></script>
 --%>
</head>
<body>
<form>
<script type="text/javascript" language="JavaScript">
var intTextBox=0;
function generateTextBox(value){
intTextBox = intTextBox + 1;
var testdiv = document.getElementById('
testdiv');
var newTBDiv = document.createElement('div');
newTBDiv.setAttribute('id','strText'+intTextBox);
newTBDiv.innerHTML = "Text "+intTextBox+":
<input type='text' value='" +
value + "' id='" +
intTextBox + "' name='" + intTextBox + "'/>";
testdiv.appendChild(newTBDiv);
return true;
}
</script>
Generate Textbox:
<br>
Test combo box::
<select id="selectValue" name="selectValue" OnChange="return
generateTextBox(this.options[this.selectedIndex].text)">
<option value="">Select a reason</option>
<option value="1">example 1 </option>
<option value="2">example 2 </option>
<option value="3">example 3 </option>
<option value="4">example 4 </option>
<option value="5">example 5 </option>
</select>
<div id="testdiv"></div>
</form>


</body>
</html>