package com.yuhf.commons.mapper;

import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import com.yuhf.commons.dbutils.ResultSetHandler;

import edu.yuhf.entity.Permission;

public class MapPermissionMapper implements ResultSetHandler<Map<String,Permission>> {

	@Override
	public Map<String, Permission> handler(ResultSet rs) throws Exception {
		Map<String,Permission> map=new HashMap<String,Permission>();
		while(rs.next()){
			Permission permission=new Permission(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4));
			map.put(String.valueOf(permission.getId()), permission);
		}
		return map;
	}

}
