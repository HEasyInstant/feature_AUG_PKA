<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<%@ page import="java.sql.*"%>

	<%
String username = request.getParameter("username");   
String password1 = request.getParameter("password1");
try{

 Class.forName("com.mysql.jdbc.Driver");

//String connectionURL="jdbc:mysql://localhost:3306/test?useSSL=false";
String connectionURL="jdbc:postgresql://127.0.0.1:5432/postgres";

String userName="postgres";
String password="piyush";
Connection conn = DriverManager.getConnection(connectionURL, userName, password);
PreparedStatement pst = conn.prepareStatement("Select username,password from users where username=? and password=?");
pst.setString(1, username);
pst.setString(2, password1);
ResultSet rs = pst.executeQuery();  

if(rs.next()){          
 out.println("Valid login credentials");

String redirectURL = "http://localhost:8082/home";
response.sendRedirect(redirectURL);

}
    
 else
    out.println("Invalid login credentials");            
}
catch(Exception e){       
out.println("Something went wrong !! Please try again");   
		out.println(e.getMessage());
}      

%>

</body>
</html>