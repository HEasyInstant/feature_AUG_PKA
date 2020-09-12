<!DOCTYPE html>
<html  lang="en"  xmlns="http://www.w3.org/1999/xhtml"
      xmlns:thm="http://www.thymeleaf.org">

<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<div align="center">
    <h1>PolClaims List</h1>
    <a href="/new">View PolClaims List</a>
    <br/><br/>
    <table border="1" width="70%"cellpadding="10" >
        
            <tr>
               <!--  <th>Count</th> -->
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
          
          <%-- <c:forEach var="product" items="${polclaimdata}">  --%>
           
            <tr thm:each="product,iterationStatus:${polclaimdatas}">
            <%--   <td thm:text="${iterationStatus.count}">1</td> --%>
                <td thm:text="${product.getPROTOCOL()}"></td>
                <td thm:text="${product.getPARENT()}"></td>
                <td thm:text="${product.COUNTRY_CODE}"></td>
                <td thm:text="${product.getCOUNTRY_CODE()}"></td>
                 <td thm:text="${product.getSTATUS()}"></td>
                <td thm:text="${product.getTYPE()}"></td>
                <td thm:text="${product.getCLOSED()}"></td>
                <td thm:text="${product.getARCHIVED()}"></td>
                <td thm:text="${product.getCREATED()}"></td>
                <td thm:text="${product.getMODIFIED()}"></td>
                <td thm:text="${product.getCHASSIS_CODE()}"></td>
                <td thm:text="${product.getDEALER_CODE()}"></td>
                <td thm:text="${product.getDEALER_NAME()}"></td>
                <td thm:text="${product.getDEALER_MAIL()}"></td>
                <td thm:text="${product.getDEALER_PHONE()}"></td>
                <td thm:text="${product.getREQUEST_DESCRIPTION()}"></td>
                <td thm:text="${product.getREQUESTED_AMOUNT()}"></td>
                <td thm:text="${product.getOPERATOR_CODE()}"></td>
                <td thm:text="${product.getOPERATOR_NAME()}"></td>
                <td thm:text="${product.getRESPONSE_DESCRIPTION()}"></td>
                <td thm:text="${product.getERROR_TYPE()}"></td>
                <td thm:text="${product.getERROR_CODE()}"></td>
                <td thm:text="${product.getMCX_CODE()}"></td>
                <td thm:text="${product.getREG_CAMPAIGN()}"></td>
                <td thm:text="${product.getCREDITED_AMOUNT()}"></td>
                <td thm:text="${product.getREG_CAMPAIGN_DEBT()}"></td>
                <td thm:text="${product.getDEBT_AMOUNT()}"></td>
                <td thm:text="${product.getCLOSED_CRED()}"></td>
                <td thm:text="${product.getCLOSED_DEBT()}"></td>
                
             
            </tr>
            
  
    </table>
</div>   
</body>
</body>
</html>