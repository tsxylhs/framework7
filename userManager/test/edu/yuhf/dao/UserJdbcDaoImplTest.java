package edu.yuhf.dao;

import java.util.List;

import org.junit.Test;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.TransactionManager;

import edu.yuhf.dao.iface.UserDao;
import edu.yuhf.entity.Page;
import edu.yuhf.entity.User;

public class UserJdbcDaoImplTest {

	UserDao userDao = new UserJdbcDaoImpl();
	
	public void testLoginCheck(){
		TransactionManager tx=new TransactionManager(DBConnection.getConnection());
		tx.beginTransaction();
			System.out.println(userDao.loginCheck("admin", "12"));
		tx.commitAndClose();
	}
	

	public void testQuery(){
		List<User> list=userDao.queryAll();
		for(User user:list){
			System.out.println(user.getName());
		}
	}
	

	public void testGetTotalRow(){
		Page<User> page=new Page<>();
		userDao.getTotalRow(page);
		System.out.println(page.getTotalRow());
	}
	@Test
	public void testQueryByPage(){
		Page<User> page=new Page<>();
		page.setCurrentPage(1);
		page.setKeyword("Ñó");
		userDao.queryByPage(page);
		for(User user:page.getList()){
			System.out.println(user.getName());
		}
	}
	public void testUpdate(){
		User user=new User(21,"admin02","1234","4321");
		System.out.println(userDao.update(user));
	}
	public void testDelete(){
		userDao.delete("11,12");
	}
	
	public void testAddUser(){
		User user=new User(0,"admin01","adfd","21344");
		User user0=userDao.addUser(user);
		System.out.println("new user id:"+user0.getId());
	}
}
