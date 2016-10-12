<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>新增角色</title>
</head>
<body>
	<form action="role.servlet?param=doAdd" method="post">
	<fieldset id="">
		<legend>新增</legend>
		<label for="roleName">角色名：</label><input type="text" name="roleName" id="roleName"><br>
		<label for="remark">说&nbsp;明：</label><input type="text" name="remark" id="remark"><br>
		<nav>
			<button type="reset">重置</button>
			<button type="submit" id="btn_login">提交</button>
		</nav>
	</fieldset>
	</form>
</body>
</html>