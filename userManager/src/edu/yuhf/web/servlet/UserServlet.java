package edu.yuhf.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.TransactionManager;

import edu.yuhf.dao.PermissionJdbcDaoImpl;
import edu.yuhf.dao.RoleJdbcDaoImpl;
import edu.yuhf.dao.UserJdbcDaoImpl;
import edu.yuhf.dao.iface.PermissionDao;
import edu.yuhf.dao.iface.RoleDao;
import edu.yuhf.dao.iface.UserDao;
import edu.yuhf.entity.Page;
import edu.yuhf.entity.Permission;
import edu.yuhf.entity.User;


@WebServlet("/user.servlet")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private UserDao userDao=new UserJdbcDaoImpl();
	private PermissionDao permissionDao=new PermissionJdbcDaoImpl();
	private RoleDao roleDao=new RoleJdbcDaoImpl();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		
		String param=request.getParameter("param");
		String ids=request.getParameter("ids");
		String id=request.getParameter("id");
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
		String telephone=request.getParameter("telephone");
		
		String currentPage=null==request.getParameter("currentPage")?"":request.getParameter("currentPage");
		String keyword=null==request.getParameter("keyword")?"":request.getParameter("keyword");
		
		PrintWriter out=response.getWriter();
		if("queryName".equals(param)){
			String newUserName=new String(userName.getBytes("ISO8859-1"),"UTF-8");
			Map<String,Object> map=new HashMap<>();
			if(userDao.queryByName(newUserName)){
				map.put("result", "true");
			}else{
				map.put("result", "false");
			}
			String json=JSONObject.toJSONString(map);
			out.print(json);
		}
		if("initMenu".equals(param)){
			Map<String,Object> map=new HashMap<>();
			List<Permission> list=permissionDao.getUserPermission(Integer.valueOf(id),true);
			map.put("message", "操作完成");
			map.put("list", list);
			String json=JSONObject.toJSONString(map);
			out.println(json);
		}
		if("init".equals(param)){
			Page<User> page=new Page<User>();
			if("".equals(currentPage)){
				currentPage="1";
			}
			page.setCurrentPage(Integer.valueOf(currentPage));
			String newKeyword="";
			if(!"".equals(keyword)){
				newKeyword=new String(keyword.getBytes("ISO8859-1"),"UTF-8");
			}
			page.setKeyword(newKeyword);
			userDao.getTotalRow(page);
			page.setTotalPage(page.getTotalRow()%page.getRowPage()==0?page.getTotalRow()/page.getRowPage():page.getTotalRow()%page.getRowPage()+1);
			
			userDao.queryByPage(page);
			request.setAttribute("page", page);
			request.getRequestDispatcher("views/userManager.jsp").forward(request, response);
		}
		if("update".equals(param)){
			User user=userDao.queryById(id);
			request.setAttribute("user", user);
			request.getRequestDispatcher("views/updateUser.jsp").forward(request, response);
		}
		if("doUpdate".equals(param)){
			User user=new User(Integer.valueOf(id),userName,password,telephone);
			if(userDao.update(user)){
				out.println("<script>alert('update success!');window.location.href='user.servlet?param=init'</script>");
			}else{
				out.println("<script>alert('update error!');window.location.href='user.servlet?param=init'</script>");
			}
		}

		if("add".equals(param)){
			request.getRequestDispatcher("views/addUser.jsp").forward(request, response);
		}
		if("doAdd".equals(param)){
			User user=new User(0,userName,password,telephone);
			User user0=userDao.addUser(user);
			if(user0.getId()!=0){
				out.println("<script>alert('add success!');window.location.href='user.servlet?param=init'</script>");
			}else{
				out.println("<script>alert('add error!');window.location.href='user.servlet?param=init'</script>");
			}
			out.flush();
			out.close();
		}

		if("doDelete".equals(param)){
			boolean flag=false;
			String[] idParams=ids.split(",");
			TransactionManager tm=new TransactionManager(DBConnection.getConnection());
			tm.beginTransaction();
				for(int i=0,len=idParams.length;i<len;i++){
					roleDao.deleteUserRole(Integer.valueOf(idParams[i]));
				}
				flag=userDao.delete(ids);
			tm.commitAndClose();
			if(flag){
				out.println("<script>alert('delete success!');window.location.href='user.servlet?param=init'</script>");
			}else{
				out.println("<script>alert('delete error!');window.location.href='user.servlet?param=init'</script>");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
