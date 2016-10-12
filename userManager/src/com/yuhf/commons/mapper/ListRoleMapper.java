package com.yuhf.commons.mapper;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.yuhf.commons.dbutils.ResultSetHandler;

import edu.yuhf.entity.Role;

public class ListRoleMapper implements ResultSetHandler<List<Role>> {

	public List<Role> handler(ResultSet rs) throws Exception {
		List<Role> list=new ArrayList<>();
		while(rs.next()){
			Role role=new Role(rs.getInt(1),rs.getString(2),rs.getString(3));
			list.add(role);
		}
		return list;
	}

}
