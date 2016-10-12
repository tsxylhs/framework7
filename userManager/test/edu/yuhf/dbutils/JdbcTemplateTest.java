package edu.yuhf.dbutils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.junit.Test;

import com.yuhf.commons.dbutils.DBConnection;
import com.yuhf.commons.dbutils.JdbcTemplate;
import com.yuhf.commons.mapper.ListUserMapper;

import edu.yuhf.entity.User;

public class JdbcTemplateTest {

	public void testQuery(){
		String sql="select * from users where id=?";
		ResultSet rs=JdbcTemplate.queryForResultSet(DBConnection.getConnection(), sql, new Object[]{2});
		try {
			while(rs.next()){
				System.out.println(rs.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testQuery1(){
		String sql="select * from users where id=?";
		ListUserMapper userMapper=new ListUserMapper();
		List<User> list=JdbcTemplate.query(DBConnection.getConnection(),sql,userMapper,new Object[]{2});
		/*
		List<User> list=DBHelper.query(DBConnection.getConnection(), sql, (rs)->{
				List<User> list0=new ArrayList<>();
				while(rs.next()){
					User user=new User(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4));
					list0.add(user);
				}
				return list0;
		}, new Object[]{2});
		*/
		for(User user:list){
			System.out.println(user.getName());
		}
	}
}
