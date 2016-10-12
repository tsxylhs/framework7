package edu.yuhf.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/init.servlet")
public class InitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Cookie[] cookies=request.getCookies();
		String name="";
		if(null!=cookies&&cookies.length>0){
			for(int i=0,len=cookies.length;i<len;i++){
				if("name".equals(cookies[i].getName())){
					name=cookies[i].getValue();
					break;
				}
			}
		}
		if(!"".equals(name)){
			request.getSession().setAttribute("user", name);
			request.getRequestDispatcher("views/main.jsp").forward(request, response);
		}else{
			request.getRequestDispatcher("login.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
