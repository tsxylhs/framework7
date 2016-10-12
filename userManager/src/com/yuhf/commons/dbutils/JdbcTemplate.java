package com.yuhf.commons.dbutils;

import java.sql.Connection;
import java.sql.ParameterMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

public class JdbcTemplate {
	
	private static Logger log=Logger.getLogger(JdbcTemplate.class);

	public static int[] batchUpdate(Connection connection,String sql,int paramNum,Object...param){
		int[] result;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			for(int i=0,len=param.length;i<len;i++){
				for(int j=0;j<paramNum;i++){
					psmt.setObject(j+1, param[j]);
				}
			}			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	public static int update(Connection connection,String sql,Object...param){
		int rs=0;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			ParameterMetaData metaData = psmt.getParameterMetaData();
			int count=metaData.getParameterCount();
			if(param!=null&&param.length>0&&count>0&&param.length==count){
				for(int i=0,len=param.length;i<len;i++){
					psmt.setObject(i+1, param[i]);
				}
			}
			rs=psmt.executeUpdate();
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		}
		return rs;		
	}
	
	public static ResultSet queryForResultSet(Connection connection,String sql,Object...param){
		ResultSet rs=null;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			ParameterMetaData metaData = psmt.getParameterMetaData();
			int count=metaData.getParameterCount();
			if(param!=null&&param.length>0&&count>0&&param.length==count){
				for(int i=0,len=param.length;i<len;i++){
					psmt.setObject(i+1, param[i]);
				}
			}
			rs=psmt.executeQuery();
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		}
		return rs;
	}
	public static ResultSet queryForResultSet(Connection connection,String sql){
		ResultSet rs=null;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			rs=psmt.executeQuery();
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		}
		return rs;
	}	
	public static <T> T query(Connection connection,String sql,ResultSetHandler<T> rsh){
		ResultSet rs=null;
		T t=null;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			rs=psmt.executeQuery();
			t=rsh.handler(rs);
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		} catch (Exception e) {
			log.fatal("convert error..."+e.getMessage());
		}
		return t;
	}	
	public static <T> T query(Connection connection,String sql,ResultSetHandler<T> rsh,Object...param){
		ResultSet rs=null;
		T t=null;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			ParameterMetaData metaData = psmt.getParameterMetaData();
			int count=metaData.getParameterCount();
			if(param!=null&&param.length>0&&count>0&&param.length==count){
				for(int i=0,len=param.length;i<len;i++){
					psmt.setObject(i+1, param[i]);
				}
			}
			rs=psmt.executeQuery();
			t=rsh.handler(rs);
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		} catch (Exception e) {
			log.fatal("convert error..."+e.getMessage());
		}
		return t;
	}	
	public static int countQuery(Connection connection,String sql,Object...param){
		int rs=0;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			ParameterMetaData metaData = psmt.getParameterMetaData();
			int count=metaData.getParameterCount();
			if(param!=null&&param.length>0&&count>0&&param.length==count){
				for(int i=0,len=param.length;i<len;i++){
					psmt.setObject(i+1, param[i]);
				}
			}
			ResultSet resultSet=psmt.executeQuery();
			if(resultSet.next()){
				rs=resultSet.getInt(1);
			}
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		}
		return rs;
	}
	public static int countQuery(Connection connection,String sql){
		int rs=0;
		try {
			PreparedStatement psmt=connection.prepareStatement(sql);
			ResultSet resultSet=psmt.executeQuery();
			if(resultSet.next()){
				rs=resultSet.getInt(1);
			}
		} catch (SQLException e) {
			log.fatal("SQL Exception..."+e.getMessage());
		}
		return rs;
	}
}















