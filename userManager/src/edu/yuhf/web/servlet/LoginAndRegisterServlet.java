package edu.yuhf.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.yuhf.dao.PermissionJdbcDaoImpl;
import edu.yuhf.dao.UserJdbcDaoImpl;
import edu.yuhf.dao.iface.PermissionDao;
import edu.yuhf.dao.iface.UserDao;
import edu.yuhf.entity.Permission;
import edu.yuhf.entity.User;


@WebServlet("/lar.servlet")
public class LoginAndRegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	UserDao userDao=new UserJdbcDaoImpl();
	PermissionDao permissionDao=new PermissionJdbcDaoImpl();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8"); 
		
		String param=request.getParameter("param");
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
		String telephone=request.getParameter("telephone");
		String loginSelect=request.getParameter("loginSelect");
		PrintWriter out=response.getWriter();
		if("init".equals(param)){
			User user=(User)request.getSession().getAttribute("user");
			if(null!=user){
				//get user permission
				Map<String,Permission> map=permissionDao.getUserPermission(user.getId());
				request.setAttribute("userPermissions",map);
				request.getRequestDispatcher("views/main.jsp").forward(request, response);
			}else{
				request.getRequestDispatcher("login.jsp").forward(request, response);
			}
		}
		if("login".equals(param)){
			User user=userDao.loginCheck(userName, password,true);
			if(null!=user){
				//set cookie
				if("on".equals(loginSelect)){
					Cookie cookie=new Cookie("name",userName);
					cookie.setMaxAge(60);
					response.addCookie(cookie);
				}
				//get user permission
				Map<String,Permission> map=permissionDao.getUserPermission(user.getId());
				request.setAttribute("userPermissions",map);
				request.getSession().setAttribute("user", user);
				request.getRequestDispatcher("views/main.jsp").forward(request, response);
			}else{
				request.setAttribute("message", "user name or password error!");
				request.getRequestDispatcher("login.jsp").forward(request, response);
			}
		}
		if("register".equals(param)){
			User user=userDao.addUser(new User(0,userName,password,telephone));
			if(user!=null){
				out.println("<script>alert('注册成功');window.location.href='lar.servlet?param=login'</script>");
			}else{
				out.println("<script>alert('注册失败，请稍后再试');window.location.href='lar.servlet?param=register'</script>");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
