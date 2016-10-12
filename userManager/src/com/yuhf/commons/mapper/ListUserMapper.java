package com.yuhf.commons.mapper;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.yuhf.commons.dbutils.ResultSetHandler;

import edu.yuhf.entity.User;

public class ListUserMapper implements ResultSetHandler<List<User>> {

	@Override
	public List<User> handler(ResultSet rs) throws Exception {
		List<User> list0=new ArrayList<>();
		while(rs.next()){
			User user=new User(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4));
			list0.add(user);
		}
		return list0;
	}

}
