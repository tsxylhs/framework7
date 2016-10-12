<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>权限信息管理</title>
		<link rel="stylesheet" type="text/css" href="css/base.css"/>
		<link rel="stylesheet" type="text/css" href="css/xManager.css"/>
		<link rel="stylesheet" type="text/css" href="css/_table.css"/>
		<link rel="stylesheet" type="text/css" href="css/_component.css"/>
		<script src="js/managerOperation.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/managerPage.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/permissionManager.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
	<section id="permission_show">
		<nav id="nav_page"><a href="lar.servlet?param=init" target="_parent">首页</a>&nbsp;>>&nbsp;权限信息管理</nav>
		<nav id="nav_query">
			<label for="keyword">用户名：</label><input type="text" name="keyword" id="keyword" value="${requestScope.page.keyword}">
			<button type="button" id="btn_query" class="whiteButton">查询</button>
		</nav>
		<section>
			<table class="table">
				<tbody>
					<tr id="table_header">
						<th><input type="checkbox" id="all"></th>
						<th>name</th>
						<th>url</th>
						<th>remark</th>
					</tr>
					<c:forEach items="${requestScope.page.list}" var="permission">
					<tr>
						<td data-label="id" style="text-align:center;">
							<input type="checkbox" id="${permission.id}" name="id_check">
						</td>
						<td data-label="name">${permission.name}</td>
						<td data-label="password">${permission.url}</td>
						<td data-label="telephone">${permission.remark}</td>
					</tr>					
					</c:forEach>
				</tbody>
			</table>
		</section>
		<nav id="nav_operation">
			<div id="div_operation">
				<button type="button" id="btn_addUser" class="whiteButton">新增</button>
				<button type="button" id="btn_updateUser" class="whiteButton">修改</button>
				<button type="button" id="btn_deleteUser" class="whiteButton">删除</button>
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
				<input type="text" id="input_page" value="${requestScope.page.currentPage}"><button id="btn_jumpPage"  class="whiteButton">GO</button>
				&nbsp;
				<button type="button" id="nextPage" class="whiteButton">下一页</button>
				<button type="button" id="lastPage" class="whiteButton">末页</button>
			</div>
			<div style="clear:both;"></div>
		</nav>
	</section>
	<section id="permission_add" hidden>
		<form action="permission.servlet?param=doAdd" method="post">
		<fieldset id="">
		<legend>新增权限</legend>
			<label for="permissionName">权限名：</label><input type="text" name="permissionName" id="permissionName"><br>
			<label for="url">url：</label><input type="text" name="url" id="url"><br>
			<label for="remark">说&nbsp;明：</label><input type="text" name="remark" id="remark"><br>
			<nav>
				<button type="reset">重置</button>
				<button type="submit" id="btn_login">提交</button>
			</nav>
		</fieldset>
	</form>
	</section>
	</body>
</html>

