<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>管理系统首页</title>
		<link rel="stylesheet" type="text/css" href="css/base.css"/>
		<link rel="stylesheet" type="text/css" href="css/_component.css"/>
		<link rel="stylesheet" type="text/css" href="css/main.css"/>
		<script type="text/javascript" src="js/main.js"></script>
	</head>
	<body>
		<header>
			<button class="whiteButton" style="height:40px;margin:5px">退出</button>
			<button class="whiteButton" style="height:40px;margin:5px">锁定</button>
		</header>
		<section>
			<nav id="menu">
				<h6>功能菜单</h6>
				<ul>
					<c:forEach items="${requestScope.userPermissions}" var="permission">
						<li>
							<a href="${permission.value.url}" target="main_iframe">${permission.value.name}</a>
						</li>
					</c:forEach>
				</ul>
				<ul id="ul_menu">
				</ul>
			</nav>
			<article>
				<iframe name="main_iframe" src="views/welcome.html"></iframe>
			</article>
		</section>
		<footer>
			Copyright © 2016 yuhuifeng<br>
			基于标准的MVC架构的Web信息管理系统教学用框架
		</footer>
		<input type="hidden" id="input_userid" value="${sessionScope.user.id }">
	</body>
</html>