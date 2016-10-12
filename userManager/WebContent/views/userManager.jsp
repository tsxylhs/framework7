<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>用户管理页面</title>
		<link rel="stylesheet" type="text/css" href="css/base.css"/>
		<link rel="stylesheet" type="text/css" href="css/xManager.css"/>
		<link rel="stylesheet" type="text/css" href="css/_table.css"/>
		<link rel="stylesheet" type="text/css" href="css/_component.css"/>
		<script src="js/managerOperation.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/managerPage.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/userManager.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
	<nav id="nav_page">
		<a href="lar.servlet?param=init" target="_parent">首页</a>&nbsp;>>&nbsp;用户信息管理
		<span id="span_nav" hidden>&nbsp;>>&nbsp;</span>
		<span id="span_name"></span>
	</nav>
	<section id="user_show">
		<nav id="nav_query">
			<label for="keyword">用户名：</label><input type="text" name="keyword" id="keyword" value="${requestScope.page.keyword}">
			<button type="button" id="btn_query" class="whiteButton">查询</button>
		</nav>
		<section>
			<table class="standardTable">
				<tbody>
					<tr>
						<th><input type="checkbox" id="all"></th>
						<th>name</th>
						<th>password</th>
						<th>telephone</th>
					</tr>
					<c:forEach items="${requestScope.page.list}" var="user">
					<tr id="row_${user.id}">
						<td data-label="id" style="text-align:center;">
							<input type="checkbox" id="${user.id}" name="id_check">
						</td>
						<td data-label="name">${user.name}</td>
						<td data-label="password">${user.password}</td>
						<td data-label="telephone">${user.telephone}</td>
					</tr>					
					</c:forEach>
				</tbody>
			</table>
		</section>
		<nav id="nav_operation">
			<div id="div_operation">
				<button type="button" id="btn_addUser" class="whiteButton">新增</button>
				<button type="button" id="btn_updateUser" class="whiteButton">修改</button>
				<button type="button" id="btn_delete" class="whiteButton">删除</button>
				<button type="button" id="btn_updateRole" class="whiteButton">修改角色</button>
			</div>
			<div id="div_page">
				当前页数：<h5 id="currentPage">${requestScope.page.currentPage}</h5>&nbsp;
				总页数：<h5 id="totalPage">${requestScope.page.totalPage }</h5>&nbsp;
				总行数：<h5>${requestScope.page.totalRow}</h5>&nbsp;
				<button type="button" id="firstPage" class="whiteButton">首页</button>
				<button type="button" id="prePage" class="whiteButton">上一页</button>
				&nbsp;
				<select id="jumpPage">
					<c:forEach begin="1" end="${requestScope.page.totalPage}" var="page">
						<c:if test="${requestScope.page.currentPage==page}">
							<option value="${page}" selected>${page}</option>
						</c:if>
						<c:if test="${requestScope.page.currentPage!=page}">
							<option value="${page}">${page}</option>
						</c:if>
					</c:forEach>
				</select>
				&nbsp;
				<input type="text" id="input_page" value="${requestScope.page.currentPage}" style="margin-top:0px;">
				<button id="btn_jumpPage"  class="whiteButton">GO</button>
				&nbsp;
				<button type="button" id="nextPage" class="whiteButton">下一页</button>
				<button type="button" id="lastPage" class="whiteButton">末页</button>
			</div>
			<div style="clear:both;"></div>
		</nav>
	</section>
	<section id="user_add" hidden style="width:500px;margin:10px auto">
		<form action="user.servlet?param=doAdd" method="post">
		<fieldset id="" style="border:0px">
		<legend hidden>新增</legend>
		<table class="noBorderTable">
		<tr id="table_row_id">
			<td><label for="id">id：</label></td>
			<td><input readonly type="text" name="id" id="id" value=""></td>
		</tr>
		<tr>
			<td><label for="userName">用户名：</label></td>
			<td><input type="text" name="userName" id="userName" value=""></td>
		</tr>
		<tr>
			<td><label for="password">密&nbsp;码：</label></td>
			<td><input type="password" name="password" id="password" value=""></td>
		</tr>
		<tr>
			<td><label for="telephone">电&nbsp;话：</label></td>
			<td><input type="text" name="telephone" id="telephone" value=""></td>
		</tr>
		</table>
			<div style="margin-top:10px;padding-left:80px">
				<button class="whiteButton" type="reset">重置</button>
				<button class="whiteButton" type="submit" id="btn_login">提交</button>
				<button class="whiteButton" type="button" id="btn_return">返回</button>
			</div>
		</fieldset>
	</form>
	</section>
	</body>
</html>

