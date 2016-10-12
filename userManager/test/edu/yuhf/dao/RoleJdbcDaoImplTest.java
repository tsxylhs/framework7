package edu.yuhf.dao;

import java.util.Map;

import org.junit.Test;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.TransactionManager;

import edu.yuhf.dao.iface.RoleDao;
import edu.yuhf.entity.Page;
import edu.yuhf.entity.Role;

public class RoleJdbcDaoImplTest {

	
	RoleDao roleDao=new RoleJdbcDaoImpl();
	@Test
	public void testQueryByPage(){
		Page<Role> page=new Page<>();
		page.setCurrentPage(1);
		page.setKeyword("");
		roleDao.queryByPage(page);
		for(Role role:page.getList()){
			System.out.println(role.getName());
		}
	}
	public void testAllQuery(){
		TransactionManager tm=new TransactionManager(DBConnection.getConnection());
		tm.beginTransaction();
		Map<String,Role> allMap=roleDao.queryAll();
		Map<String,Role> checkedMap=roleDao.queryByUserId(2);
		tm.commitAndClose();
		System.out.println("用户拥有的权限");
		for(String s:checkedMap.keySet()){
			System.out.print(checkedMap.get(s).getName()+","+checkedMap.get(s).isChecked());
			System.out.println("\t");
		}
		System.out.println("所有的权限");
		for(String s:allMap.keySet()){
			System.out.print(allMap.get(s).getName()+","+allMap.get(s).isChecked());
			System.out.println("\t");
		}	
		allMap.putAll(checkedMap);
		System.out.println("合并后的权限");
		for(String s:allMap.keySet()){
			System.out.print(allMap.get(s).getName()+","+allMap.get(s).isChecked());
			System.out.println("\t");
		}		
	}
	
	public void testQueryAll(){
		Map<String,Role> map=roleDao.queryAll();
		for(String s:map.keySet()){
			System.out.println(map.get(s).getName());
		}
	}
	
	public void testQueryByUserId(){
		Map<String,Role> map=roleDao.queryByUserId(2);
		for(String s:map.keySet()){
			System.out.println(map.get(s).getName());
		}
	}
}
