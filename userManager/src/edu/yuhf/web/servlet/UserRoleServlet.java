package edu.yuhf.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.TransactionManager;

import edu.yuhf.dao.RoleJdbcDaoImpl;
import edu.yuhf.dao.UserJdbcDaoImpl;
import edu.yuhf.dao.iface.RoleDao;
import edu.yuhf.entity.Role;
import edu.yuhf.entity.User;

@WebServlet("/userRole.servlet")
public class UserRoleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private RoleDao roleDao=new RoleJdbcDaoImpl();
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String param=request.getParameter("param");
		String id=request.getParameter("id");
		String[] checks=request.getParameterValues("checkName");
		
		if("update".equals(param)){
			TransactionManager tm=new TransactionManager(DBConnection.getConnection());
			tm.beginTransaction();
			Map<String,Role> allMap=roleDao.queryAll();
			Map<String,Role> checkedMap=roleDao.queryByUserId(Integer.valueOf(id));
			User user=new UserJdbcDaoImpl().queryById(id);
			tm.commitAndClose();
			allMap.putAll(checkedMap);
			request.setAttribute("map", allMap);
			request.setAttribute("user", user);
			request.getRequestDispatcher("views/userRole.jsp").forward(request, response);
		}
		if("doUpdate".equals(param)){
			TransactionManager tm=new TransactionManager(DBConnection.getConnection());
			tm.beginTransaction();
			System.out.println(id+","+checks.toString());
			roleDao.deleteUserRole(Integer.valueOf(id));
			boolean flag=roleDao.updateRole(id, checks);
			tm.commitAndClose();
			PrintWriter out=response.getWriter();
			if(flag){
				out.print("<script>alert('user role update success!');window.location.href='user.servlet?param=init'</script>");
			}else{
				out.print("<script>alert('user role update error!');window.location.href='user.servlet?param=init'</script>");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
