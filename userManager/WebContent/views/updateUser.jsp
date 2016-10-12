<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>修改用户</title>
</head>
<body>
	<form action="user.servlet?param=doUpdate" method="post">
	<fieldset id="">
		<legend>修改</legend>
		<label for="id">id：</label><input readonly type="text" name="id" id="id" value="${requestScope.user.id}"><br>
		<label for="userName">用户名：</label><input type="text" name="userName" id="userName" value="${requestScope.user.name}"><br>
		<label for="password">密&nbsp;码：</label><input type="password" name="password" id="password" value="${requestScope.user.password}"><br>
		<label for="telephone">电&nbsp;许：</label><input type="text" name="telephone" id="telephone" value="${requestScope.user.telephone}"><br>
		<nav>
			<button type="reset">重置</button>
			<button type="submit" id="btn_login">提交</button>
		</nav>
	</fieldset>
	</form>
</body>
</html>