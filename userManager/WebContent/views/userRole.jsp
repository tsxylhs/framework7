<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>用户角色管理</title>
<link rel="stylesheet" type="text/css" href="css/base.css"/>
<link rel="stylesheet" type="text/css" href="css/userRole.css"/>
<link rel="stylesheet" type="text/css" href="css/_component.css"/>
</head>
<body>
<section>
<nav id="nav_page"><a href="lar.servlet?param=init" target="_parent">首页</a>&nbsp;>>&nbsp;<a href="javascript:window.history.back();">用户信息管理</a>&nbsp;>>&nbsp;用户角色管理</nav>
<nav>
	<h2>用户id：${requestScope.user.id}&nbsp;用户名：${requestScope.user.name}</h2>
</nav>
<article>
	<form action="userRole.servlet?param=doUpdate" method="post">
		<c:forEach items="${requestScope.map}" var="keyAndValue" varStatus="status">
			<c:if test="${keyAndValue.value.checked==true }">
				<span>
				<input type="checkbox" checked name="checkName" id="${keyAndValue.value.id }" value="${keyAndValue.value.id }">
				<label for="${keyAndValue.value.id }">${keyAndValue.value.name}</label>
				</span>
			</c:if>
			<c:if test="${keyAndValue.value.checked==false }">
				<span>
				<input type="checkbox" name="checkName" id="${keyAndValue.value.id }" value="${keyAndValue.value.id }">
				<label for="${keyAndValue.value.id }">${keyAndValue.value.name}</label>
				</span>
			</c:if>
		</c:forEach>
		<input type="hidden" name="id" value="${requestScope.user.id}">
		<div><button type="submit" class="whiteButton">提交</button></div>
	</form>
</article>
</section>
</body>
</html>