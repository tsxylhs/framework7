package com.yuhf.commons.dbutils;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.log4j.Logger;

public class DBConnection {
	
	static Logger log=Logger.getLogger(DBConnection.class);
	
	static final String CLASSNAME;
	static final String URL;
	static final String USERNAME;
	static final String PASSWORD;
	
	private static ThreadLocal<Connection> connections = new ThreadLocal<Connection>();
	
	static{
		Properties prop=new Properties();
		try {
			prop.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("jdbc.properties"));
		} catch (IOException e) {
			log.error("jdbc.properies file not found..."+e.getMessage());
		}
		CLASSNAME=prop.getProperty("jdbc.className");
		URL=prop.getProperty("jdbc.url");
		USERNAME=prop.getProperty("jdbc.userName");
		PASSWORD=prop.getProperty("jdbc.password");
		try {
			Class.forName(CLASSNAME);
		} catch (ClassNotFoundException e) {
			log.fatal("class not found..."+e.getMessage());
		}
	}
	
	public static synchronized Connection getConnection(){
		Connection connection=connections.get();
		try {
			if(null==connection||connection.isClosed()){
				connection=DriverManager.getConnection(URL,USERNAME,PASSWORD);
				connections.set(connection);
				log.debug("ThreadLocal set connection.... ");
			}
		} catch (SQLException e) {
				log.fatal("connection error..."+e.getMessage());
		}			
		log.debug("connection success");
		return connection;
	}
	
	public static void closeConnection(Connection connection){
		try {
			if(null!=connection||!connection.isClosed()){
				connection.close();
			}
		} catch (SQLException e) {
				log.fatal("thread connection close error...."+e.getMessage());
		}
		log.debug("thread connection close success");
		
	}
	
}
