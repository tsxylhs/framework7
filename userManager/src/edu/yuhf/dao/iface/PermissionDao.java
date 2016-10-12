package edu.yuhf.dao.iface;

import java.util.List;
import java.util.Map;

import edu.yuhf.entity.Permission;

public interface PermissionDao {
	public Map<String,Permission> getUserPermission(int userId);
	public List<Permission> getUserPermission(int userId,boolean flag);
}
