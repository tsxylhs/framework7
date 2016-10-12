package edu.yuhf.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.yuhf.dao.RoleJdbcDaoImpl;
import edu.yuhf.dao.iface.RoleDao;
import edu.yuhf.entity.Page;
import edu.yuhf.entity.Role;

@WebServlet("/role.servlet")
public class RoleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private RoleDao roleDao=new RoleJdbcDaoImpl();
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		
		String param=request.getParameter("param");
		String ids=request.getParameter("ids");
		String id=request.getParameter("id");
		String roleName=request.getParameter("roleName");
		String remark=request.getParameter("remark");
		
		String currentPage=null==request.getParameter("currentPage")?"":request.getParameter("currentPage");
		String keyword=null==request.getParameter("keyword")?"":request.getParameter("keyword");
		
		PrintWriter out=response.getWriter();
		if("init".equals(param)){
			Page<Role> page=new Page<>();
			if("".equals(currentPage)){
				currentPage="1";
			}
			page.setCurrentPage(Integer.valueOf(currentPage));
			String newKeyword="";
			if(!"".equals(keyword)){
				newKeyword=new String(keyword.getBytes("ISO8859-1"),"UTF-8");
			}
			page.setKeyword(newKeyword);
			roleDao.getTotalRow(page);
			page.setTotalPage(page.getTotalRow()%page.getRowPage()==0?page.getTotalRow()/page.getRowPage():page.getTotalRow()/page.getRowPage()+1);
			
			roleDao.queryByPage(page);
			request.setAttribute("page", page);
			request.getRequestDispatcher("views/roleManager.jsp").forward(request, response);
		}
		if("update".equals(param)){
			Role role=roleDao.queryById(id);
			request.setAttribute("role", role);
			request.getRequestDispatcher("views/updateRole.jsp").forward(request, response);
		}
		if("doUpdate".equals(param)){
			Role role=new Role(Integer.valueOf(id),roleName,remark);
			if(roleDao.update(role)){
				out.println("<script>alert('update success!');window.location.href='role.servlet?param=init'</script>");
			}else{
				out.println("<script>alert('update error!');window.location.href='role.servlet?param=init'</script>");
			}
		}

		if("add".equals(param)){
			request.getRequestDispatcher("views/addRole.jsp").forward(request, response);
		}
		if("doAdd".equals(param)){
			Role role=new Role(0,roleName,remark);
			Role role0=roleDao.addRole(role);
			if(role0.getId()!=0){
				out.println("<script>alert('add success!');window.location.href='role.servlet?param=init'</script>");
			}else{
				out.println("<script>alert('add error!');window.location.href='role.servlet?param=init'</script>");
			}
			out.flush();
			out.close();
		}

		if("doDelete".equals(param)){
			if(roleDao.deleteRole(ids)){
				out.println("<script>alert('delete success!');window.location.href='role.servlet?param=init'</script>");
			}else{
				out.println("<script>alert('delete error!');window.location.href='role.servlet?param=init'</script>");
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
