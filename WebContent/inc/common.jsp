<%@page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<%
	    String rootPath = request.getContextPath();
	if(rootPath.contains("/")){
		rootPath = rootPath.substring(0, rootPath.lastIndexOf("/"));
	}
	%>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" /> -->
	<%-- <meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="edge" />
	<meta name="Keywords" content="石玖信息科技,电子信息,电子信息服务专家,电脑销售,电脑维修" />
	<meta name="Description" content="石玖信息科技是专注家电销售与维修的互联网电子信息平台,通过整合多方资源,安全高效地实现家电的搭配与维修。客服热线02165461161" />
	<link rel="icon" href="<%=rootPath%>/web/favicon.png" />
	<link rel="shortcut icon" href="<%=rootPath%>/web/favicon.png" /> --%>
	<link rel="stylesheet" type="text/css" href="themes/default/css/lin.css" />
	<title>石玖信息科技，电子科技业信息服务专家</title>
	<a:csss />
	<a:scripts />
	
</head>



