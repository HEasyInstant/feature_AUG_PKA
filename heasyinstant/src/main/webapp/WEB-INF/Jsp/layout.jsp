<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%-- <title><tiles:getAsString name="title" /></title> --%>

</head>
<body>
<table width="100%">
<tr>
<td colspan="2" style="background:#f4b642">
                <tiles:insertAttribute name="header" />
            </td>
</tr>
<tr>
<td width="20%" nowrap="nowrap"  style="background: #ffffff">
                 <tiles:insertAttribute name="menu" />
             </td>
<td width="80%" style="background-image:url(img/free-concierge-and-hotel-blue-vectors.jpg); background-repeat: no-repeat;">
                 <tiles:insertAttribute name="body" />
             </td>
</tr>
<tr>
<td colspan="2"  style="background: #000000" >
                 <tiles:insertAttribute name="footer" />
            </td>
</tr>
</table>

</body>
</html>