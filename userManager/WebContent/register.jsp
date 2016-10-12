<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html> 
<html>
	<head>
		<meta charset="UTF-8">
		<title>用户注册</title>
		<link rel="stylesheet" type="text/css" href="css/base.css"/>
		<link rel="stylesheet" type="text/css" href="css/register.css"/>
		<link rel="stylesheet" type="text/css" href="css/_component.css"/>
		<script type="text/javascript" src="js/register.js"></script>
	</head>
	<body>
		<section>
			<h1>用户注册</h1>
			<h6 id="message">${message}</h6>
			<form action="lar.servlet?param=register" method="post">
			<fieldset id="">
				<legend hidden>注册</legend>
				<table>
					<tr>
						<td><label for="userName">用户名：</label></td>
						<td><input type="text" name="userName" id="userName"></td>
						<td><span id="userName_message"></span></td>
					</tr>
					<tr>
						<td><label for="password">密&nbsp;码：</label></td>
						<td><input type="password" name="password" id="password"></td>
						<td><span id="password_message"></span></td>
					</tr>
					<tr>
						<td><label for="rePassword">再输入密码：</label></td>
						<td><input  type="password" name="rePassword" id="rePassword"></td>
						<td><span id="rePassword_message"></span></td>
					</tr>					
					<tr>
						<td><label for="telephone">电话号码：</label></td>
						<td colspan="1"><input type="text" name="telephone" id="telephone"></td>
					</tr>
				</table>
					<nav>
						<button type="submit" id="btn_register" class="whiteButton">注册</button>
						<button type="reset" class="whiteButton">重置</button>
					</nav>

			</fieldset>
			</form>
		</section>
	</body>
</html>