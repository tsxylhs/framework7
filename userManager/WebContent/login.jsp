<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html> 
<html>
	<head>
		<meta charset="UTF-8">
		<title>登录</title>
		<link rel="stylesheet" type="text/css" href="css/base.css"/>
		<link rel="stylesheet" type="text/css" href="css/login.css"/>
		<link rel="stylesheet" type="text/css" href="css/_component.css"/>
		<script src="js/login.js" type="text/javascript"></script>
	</head>
	<body>
		<section>
			<h1>用户登录</h1>
			<h6 id="message">${message}</h6>
			<form action="lar.servlet?param=login" method="post">
			<fieldset id="">
				<legend hidden>登录</legend>
				<label for="userName">用户名：</label><input type="text" name="userName" id="userName"><br>
				<label for="password">密&nbsp;码：</label><input type="password" name="password" id="password"><br>
				<input type="checkbox" id="loginSelect" name="loginSelect">一分钟内免登录<br>
				<nav>
					<button type="button" id="btn_register" class="whiteButton">注册</button>
					<button type="reset" class="whiteButton">重置</button>
					<button type="submit" id="btn_login" class="whiteButton">登录</button>
				</nav>
			</fieldset>
			</form>
		</section>
	</body>
</html>