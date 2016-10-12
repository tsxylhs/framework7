package edu.yuhf.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.JdbcTemplate;
import com.yuhf.commons.mapper.ListRoleMapper;
import com.yuhf.commons.mapper.ListUserMapper;
import com.yuhf.commons.mapper.MapRoleMapper;

import edu.yuhf.dao.iface.RoleDao;
import edu.yuhf.entity.Page;
import edu.yuhf.entity.Role;
import edu.yuhf.entity.User;

public class RoleJdbcDaoImpl implements RoleDao {

	@Override
	public Map<String,Role> queryAll() {
		String sql="select * from role";
		Map<String,Role> map=JdbcTemplate.query(DBConnection.getConnection(), sql, new MapRoleMapper(), new Object[]{});
		return map;
	}

	@Override
	public Map<String, Role> queryByUserId(int userId) {
		String sql="select r.id,r.name,r.remark from users u inner join user_role ur on u.id=ur.userId inner join role r on ur.roleId=r.id where u.id=?";
		Map<String,Role> map=JdbcTemplate.query(DBConnection.getConnection(), sql, new MapRoleMapper(), new Object[]{userId});
		for(String s:map.keySet()){
			map.get(s).setChecked(true);
		}
		return map;
	}

	@Override
	public boolean deleteUserRole(int userId) {
		boolean flag=false;
		String sql="delete user_role where userid=?";
		int count=JdbcTemplate.update(DBConnection.getConnection(), sql, new Object[]{userId});
		if(count>0){
			flag=true;
		}
		return flag;
	}

	@Override
	public boolean updateRole(String userId,String[] ids) {
		boolean flag=false;
		String sql="insert into user_role values(user_role_id.nextval,?,?)";
		try {
			PreparedStatement psmt=DBConnection.getConnection().prepareStatement(sql);
			for(int i=0;i<ids.length;i++){
				psmt.setInt(1,Integer.valueOf(userId));
				psmt.setInt(2,Integer.valueOf(ids[i]));
				psmt.addBatch();
			}
			int[] counts=psmt.executeBatch();
			if(counts.length>0){
				flag=true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public void getTotalRow(Page<Role> page) {
		int count=0;
		String sql="select count(*) from role";
		Connection connection=DBConnection.getConnection();
		if(!"".equals(page.getKeyword())){
			sql+=" where name like ?";
			try {
				PreparedStatement psmt=connection.prepareStatement(sql);
				psmt.setString(1, "%"+page.getKeyword()+"%");
				ResultSet rs=psmt.executeQuery();
				if(rs.next()){
					count=rs.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally{
				DBConnection.closeConnection(connection);
			}
		}else{
			count=JdbcTemplate.countQuery(connection, sql);
		}
		page.setTotalRow(count);		
		
	}

	@Override
	public void queryByPage(Page<Role> page) {
		List<Role> list=null;
		Connection connection=DBConnection.getConnection();
		ListRoleMapper roleMapper=new ListRoleMapper();
		String sql="";
		Object[] param=null;
		if(!"".equals(page.getKeyword())){
			sql="select * from (select t.*,rownum rn from(select * from role where name like ? order by id) t where rownum<=?*?) tt where rn>?*(?-1)";
			Object[] param0={"%"+page.getKeyword()+"%",page.getRowPage(),page.getCurrentPage(),page.getRowPage(),page.getCurrentPage()};
			param=param0;
		}else{
			sql="select * from (select t.*,rownum rn from(select * from role order by id) t where rownum<=?*?) tt where rn>?*(?-1)";
			Object[] param0={page.getRowPage(),page.getCurrentPage(),page.getRowPage(),page.getCurrentPage()};
			param=param0;
		}
		list=JdbcTemplate.query(connection, sql, roleMapper, param);
		page.setList(list);
		
	}

	@Override
	public Role queryById(String id) {
		String sql="select * from role where id=?";
		List<Role> list=JdbcTemplate.query(DBConnection.getConnection(), sql, new ListRoleMapper(), new Object[]{id});
		return list.get(0);
	}

	@Override
	public boolean update(Role role) {
		boolean flag=false;
		String sql="update role set name=?,remark=? where id=?";
		int count=JdbcTemplate.update(DBConnection.getConnection(), sql, new Object[]{role.getName(),role.getRemark(),role.getId()});
		if(count==1){
			flag=true;
		}
		return flag;
	}

	@Override
	public Role addRole(Role role) {
		String sql="insert into role values(user_id.nextval,?,?)";
		try {
			PreparedStatement psmt=DBConnection.getConnection().prepareStatement(sql,new String[]{"id"});
			psmt.setString(1, role.getName());
			psmt.setString(2,role.getRemark());
			psmt.executeUpdate();
			ResultSet rs=psmt.getGeneratedKeys();
			if(rs.next()){
				role.setId(rs.getInt(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
		}
		return role;
	}

	@Override
	public boolean deleteRole(String ids) {
		String sql="delete role where id=?";
		String[] arrays=ids.split(",");
		boolean flag=false;
		try {
			PreparedStatement psmt=DBConnection.getConnection().prepareStatement(sql);
			for(int i=0,len=arrays.length;i<len;i++){
				psmt.setInt(1, Integer.valueOf(arrays[i]));
				psmt.addBatch();
			}
			int[] counts=psmt.executeBatch();
			if(counts.length>0){
				flag=true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flag;
	}
	

}
