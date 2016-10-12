package edu.yuhf.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.JdbcTemplate;
import com.yuhf.commons.mapper.ListUserMapper;

import edu.yuhf.dao.iface.UserDao;
import edu.yuhf.entity.Page;
import edu.yuhf.entity.User;

public class UserJdbcDaoImpl implements UserDao {

	public boolean loginCheck(String userName, String password) {
		boolean flag=false;
		String sql="select count(*) from users where name=? and password=?";
		int count=JdbcTemplate.countQuery(DBConnection.getConnection(), sql, new Object[]{userName,password});
		if(count==1){
			flag=true;
		}
		return flag;
	}

	public User loginCheck(String userName, String password,boolean flag) {
		String sql="select * from users where name=? and password=?";
		List<User> list=JdbcTemplate.query(DBConnection.getConnection(), sql, new ListUserMapper(),new Object[]{userName,password});
		if(list.size()==1){
			return list.get(0);
		}else{
			return null;
		}
	}
	
	@Override
	public List<User> queryAll() {
		String sql="select * from users";
		Connection connection=DBConnection.getConnection();
		ListUserMapper userMapper=new ListUserMapper();
		List<User> list=JdbcTemplate.query(connection, sql, userMapper);
		return list;
	}

	@Override
	public User addUser(User user) {
		String sql="insert into users values(user_id.nextval,?,?,?)";
		try {
			PreparedStatement psmt=DBConnection.getConnection().prepareStatement(sql,new String[]{"id"});
			psmt.setString(1, user.getName());
			psmt.setString(2,user.getPassword());
			psmt.setString(3, user.getTelephone());
			psmt.executeUpdate();
			ResultSet rs=psmt.getGeneratedKeys();
			if(rs.next()){
				user.setId(rs.getInt(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
		}
		return user;
	}

	@Override
	public boolean delete(String ids) {
		String sql="delete users where id=?";
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

	@Override
	public User queryById(String id) {
		String sql="select * from users where id=?";
		List<User> list=JdbcTemplate.query(DBConnection.getConnection(), sql, new ListUserMapper(), new Object[]{id});
		return list.get(0);
	}

	@Override
	public boolean update(User user) {
		boolean flag=false;
		String sql="update users set name=?,password=?,telephone=? where id=?";
		int count=JdbcTemplate.update(DBConnection.getConnection(), sql, new Object[]{user.getName(),user.getPassword(),user.getTelephone(),user.getId()});
		if(count==1){
			flag=true;
		}
		return flag;
	}

	@Override
	public void queryByPage(Page<User> page) {
		List<User> list=null;
		Connection connection=DBConnection.getConnection();
		if(!"".equals(page.getKeyword())){
			String sql="select * from (select t.*,rownum rn from(select * from users where name like ? order by id) t where rownum<=?*?) tt where rn>?*(?-1)";
			PreparedStatement psmt;
			try {
				psmt = connection.prepareStatement(sql);
				psmt.setString(1, "%"+page.getKeyword()+"%");
				psmt.setInt(2, page.getRowPage());
				psmt.setInt(3, page.getCurrentPage());
				psmt.setInt(4, page.getRowPage());
				psmt.setInt(5, page.getCurrentPage());
				ResultSet rs=psmt.executeQuery();
				list=new ListUserMapper().handler(rs);
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			} finally{
				DBConnection.closeConnection(connection);
			}
		}else{
			String sql="select * from (select t.*,rownum rn from(select * from users order by id) t where rownum<=?*?) tt where rn>?*(?-1)";
			ListUserMapper userMapper=new ListUserMapper();
			Object[] param={page.getRowPage(),page.getCurrentPage(),page.getRowPage(),page.getCurrentPage()};
			list=JdbcTemplate.query(connection, sql, userMapper, param);
		}
		page.setList(list);
	}

	@Override
	public void getTotalRow(Page<User> page) {
		int count=0;
		String sql="select count(*) from users";
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
	public boolean queryByName(String name) {
		boolean flag=false;
		String sql="select * from users where name=?";
		List<User> list=JdbcTemplate.query(DBConnection.getConnection(), sql, new ListUserMapper(), new Object[]{name});
		if(list.size()>0){
			flag=true;
		}
		return flag;
	}

}
