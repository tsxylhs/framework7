package edu.yuhf.dao;

import java.util.Map;

import org.junit.Test;

import edu.yuhf.dao.iface.PermissionDao;
import edu.yuhf.entity.Permission;

public class PermissionJdbcDaoImplTest {

	PermissionDao permissionDao=new PermissionJdbcDaoImpl();
	@Test
	public void testGetUserPermission(){
		Map<String,Permission> map=permissionDao.getUserPermission(1);
		for(String s:map.keySet()){
			System.out.println(s);
			System.out.println(map.get(s).getName());
		}
	}
}
