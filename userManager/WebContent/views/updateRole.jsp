<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>更新角色</title>
</head>
<body>
	<form action="role.servlet?param=doUpdate" method="post">
	<fieldset id="">
		<legend>修改</legend>
		<label for="id">id：</label><input readonly type="text" name="id" id="id" value="${requestScope.role.id}"><br>
		<label for="roleName">角色名：</label><input type="text" name="roleName" id="roleName" value="${requestScope.role.name}"><br>
		<label for="remark">说&nbsp;明：</label><input type="text" name="remark" id="remark" value="${requestScope.role.remark}"><br>
		<nav>
			<button type="reset">重置</button>
			<button type="submit" id="btn_login">提交</button>
		</nav>
	</fieldset>
	</form>
</body>
</html>