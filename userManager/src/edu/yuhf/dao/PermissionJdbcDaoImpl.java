package edu.yuhf.dao;

import java.util.List;
import java.util.Map;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.JdbcTemplate;
import com.yuhf.commons.mapper.ListPermissionMapper;
import com.yuhf.commons.mapper.MapPermissionMapper;

import edu.yuhf.dao.iface.PermissionDao;
import edu.yuhf.entity.Permission;

public class PermissionJdbcDaoImpl implements PermissionDao {

	@Override
	public Map<String, Permission> getUserPermission(int userId) {
		StringBuffer sb=new StringBuffer();
		sb.append("select p.id,p.name,p.url,p.remark from users u inner join user_role ur on u.id=ur.userId inner join role_permission rp on ur.roleId=rp.roleId");
		sb.append(" inner join permission p on rp.permissionId=p.id where u.id=?");
		Map<String,Permission> map=JdbcTemplate.query(DBConnection.getConnection(), sb.toString(), new MapPermissionMapper(), new Object[]{userId});
		return map;
	}

	@Override
	public List<Permission> getUserPermission(int userId, boolean flag) {
		StringBuffer sb=new StringBuffer();
		sb.append("select p.id,p.name,p.url,p.remark from users u inner join user_role ur on u.id=ur.userId inner join role_permission rp on ur.roleId=rp.roleId");
		sb.append(" inner join permission p on rp.permissionId=p.id where u.id=?");
		List<Permission> list=JdbcTemplate.query(DBConnection.getConnection(), sb.toString(), new ListPermissionMapper(), new Object[]{userId});
		return list;
	}

}
