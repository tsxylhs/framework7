package com.yuhf.commons.mapper;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import com.yuhf.commons.dbutils.ResultSetHandler;

import edu.yuhf.entity.Role;

public class MapRoleMapper implements ResultSetHandler<Map<String,Role>> {

	@Override
	public Map<String, Role> handler(ResultSet rs) throws Exception {
		Map<String,Role> map=new HashMap<String,Role>();
		while(rs.next()){
			Role role=new Role(rs.getInt(1),rs.getString(2),rs.getString(3));
			map.put(String.valueOf(role.getId()), role);
		}
		return map;
	}

}
