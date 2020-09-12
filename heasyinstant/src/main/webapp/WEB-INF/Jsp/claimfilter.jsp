<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>    
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<%@ page import="java.util.Hashtable"%>
<%@ page import="java.util.List"%>

<html>
<head>
<%-- <link href="<c:url value="/css/bootstrap.min.css" />" rel="stylesheet"> --%>
<script src="<c:url value="/js/bootstrap.min.js" />"></script>
<link href="<c:url value="/css/style1.css" />" rel="stylesheet">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>PolFilter Page</title>
</head>
<body>
<div align="center"  >
<h1>PolFilter Page</h1>
 <%-- <form >
 <h1><PolFilter Page</h1>
    Protocol:<input type="text" name="txtprotocol"/>
    Chassis_CODE:<input type="text" name="txtchasiscode"/>
    Search:<input type="submit" name="subtn"  value="Search"/>
    <input type="hidden" name="pof" value="2"/>
     <table>
     </table>
     </form>
 --%>    <br/><br/>
     
       <table border="1" width="10%" cellpadding="10"  class="table">
        
            <tr>
                
                <th>PROTOCOL</th>
                <th>PARENT</th>
                <th>COUNTRY CODE</th>
                <th>STATUS</th>
                <th>TYPE</th>
                <th>CLOSED</th>
                <th>ARCHIVED</th>
                <th>CREATED</th>
                <th>MODIFIED</th>
                <th>CHASSIS CODE</th>
                <th>DEALER CODE</th>
                <th>DEALER NAME</th>
                <th>DEALER MAIL</th>
                <th>DEALER PHONE</th> 
                <th>REQUEST DESCRIPTION</th>
                <th>REQUESTED AMOUNT</th>
                <th>OPERATOR CODE</th>
                <th>OPERATOR NAME</th>
                <th>RESPONSE DESCRIPTION</th>
                <th>ERROR TYPE</th>
                <th>ERROR CODE</th>
                <th>MCX CODE</th>
                <th>REG CAMPAIGN</th>
                <th>REG CAMPAIGN_DEBT</th>
                <th>DEBT AMOUNT</th> 
                <th>CLOSED CRED</th> 
                <th>CLOSED DEBT</th>     
            </tr>
          
           
             <c:forEach var="product1" items="${polclaimsdata}" varStatus="loopCounter"> 
            <c:out value="outer loop count: ${loopCounter.count}"/> 
            <tr>
              <td>${product1.PROTOCOL}</td>
                <td>${product1.PARENT}</td>
                <td>${product1.COUNTRY_CODE}</td>
                <td>${product1.STATUS}</td>
                <td>${product1.TYPE}</td>
                <td>${product1.CLOSED}</td>
                <td>${product1.PARENT}</td>
                <td>${product1.ARCHIVED}</td>
                <td>${product1.CREATED}</td>
                <td>${product1.MODIFIED}</td>
                <td>${product1.CHASSIS_CODE}</td>
                <td>${product1.DEALER_CODE}</td>
                <td>${product1.DEALER_NAME}</td>
                <td>${product1.DEALER_MAIL}</td>
                <td>${product1.DEALER_PHONE}</td>
                <td>${product1.REQUEST_DESCRIPTION}</td>
                <td>${product1.REQUESTED_AMOUNT}</td>
                <td>${product1.OPERATOR_CODE}</td>
                <td>${product1.OPERATOR_NAME}</td>
                <td>${product1.RESPONSE_DESCRIPTION}</td>
                <td>${product1.ERROR_TYPE}</td>
                <td>${product1.ERROR_CODE}</td>
                <td>${product1.MCX_CODE}</td>
                <td>${product1.REG_CAMPAIGN}</td>
                <td>${product1.CREDITED_AMOUNT}</td>
                <td>${product1.REG_CAMPAIGN_DEBT}</td>
                <td>${product1.DEBT_AMOUNT}</td>
                <td>${product1.CLOSED_CRED}</td>
                <td>"${product1.CLOSED_DEBT}</td>
                </tr>
            </c:forEach>
            </table>
</div>   
</body>
</html>