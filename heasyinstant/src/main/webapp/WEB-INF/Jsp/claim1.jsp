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
<link href="<c:url value="/css/style1.css" />" rel="stylesheet">

</head>
<body>


	
	<div>
	
    <h1>PolClaims List Table</h1>
   <!--  <a href="/new">View PolClaims List</a> -->
    <form action="/polclaimsmodel" method="get">
    Protocol:<input type="text" name="txtprotocol"/>
     Chassis_CODE:<input type="text" name="txtchasiscode"/>
    Search:<input type="submit" name="subtn"  value="Click"/>
    <input type="hidden" name="pof" value="2"/>
     
     </form>
     </div>
	 <br/><br/>
	 <div>
    <table border="1" width="10%" cellpadding="10" >
        
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
          
           
            <c:forEach var="product" items="${polclaimlist}" varStatus="loopCounter">   
           <%--  <c:out value="outer loop count: ${loopCounter.count}"/> --%> 
            <tr>
              <td>${product.PROTOCOL}</td>
                <td>${product.PARENT}</td>
                <td>${product.COUNTRY_CODE}</td>
                <td>${product.STATUS}</td>
                <td>${product.TYPE}</td>
                <td>${product.CLOSED}</td>
                <td>${product.PARENT}</td>
                <td>${product.ARCHIVED}</td>
                <td>${product.CREATED}</td>
                <td>${product.MODIFIED}</td>
                <td>${product.CHASSIS_CODE}</td>
                <td>${product.DEALER_CODE}</td>
                <td>${product.DEALER_NAME}</td>
                <td>${product.DEALER_MAIL}</td>
                <td>${product.DEALER_PHONE}</td>
                <td>${product.REQUEST_DESCRIPTION}</td>
                <td>${product.REQUESTED_AMOUNT}</td>
                <td>${product.OPERATOR_CODE}</td>
                <td>${product.OPERATOR_NAME}</td>
                <td>${product.RESPONSE_DESCRIPTION}</td>
                <td>${product.ERROR_TYPE}</td>
                <td>${product.ERROR_CODE}</td>
                <td>${product.MCX_CODE}</td>
                <td>${product.REG_CAMPAIGN}</td>
                <td>${product.CREDITED_AMOUNT}</td>
                <td>${product.REG_CAMPAIGN_DEBT}</td>
                <td>${product.DEBT_AMOUNT}</td>
                <td>${product.CLOSED_CRED}</td>
                <td>"${product.CLOSED_DEBT}</td>
                
             
            </tr>
            </c:forEach>
            
  
    </table>
</div>
	
		


</body>
</html>