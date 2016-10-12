package edu.yuhf.dao.iface;

import java.util.Map;

import edu.yuhf.entity.Page;
import edu.yuhf.entity.Role;

public interface RoleDao {

	public Map<String,Role> queryAll();
	public Map<String,Role> queryByUserId(int userId);
	public boolean deleteUserRole(int userId);
	public boolean updateRole(String userId,String[] ids);
	public void getTotalRow(Page<Role> page);
	public void queryByPage(Page<Role> page);
	public Role queryById(String id);
	public boolean update(Role role);
	public Role addRole(Role role);
	public boolean deleteRole(String ids);
}
