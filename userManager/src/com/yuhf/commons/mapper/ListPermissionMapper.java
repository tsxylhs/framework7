package com.yuhf.commons.mapper;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.yuhf.commons.dbutils.ResultSetHandler;

import edu.yuhf.entity.Permission;

public class ListPermissionMapper implements ResultSetHandler<List<Permission>>{

	@Override
	public List<Permission> handler(ResultSet rs) throws Exception {
		List<Permission> list=new ArrayList<Permission>();
		while(rs.next()){
			Permission permission=new Permission(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4));
			list.add(permission);
		}
		return list;
	}
}
