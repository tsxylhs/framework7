package com.yuhf.commons.dbutils;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.log4j.Logger;

public class TransactionManager {
	
	private Logger log=Logger.getLogger(TransactionManager.class);
	private Connection connection;
	
	public TransactionManager(Connection connection) {
		this.connection = connection;
	}
	
	public void beginTransaction(){
		try {
			connection.setAutoCommit(false); 
			log.debug("beginTransaction...");
		} catch (SQLException e) {
			log.fatal("begin transaction error..."+e.getMessage());
		}
	}
	
	public void commitAndClose(){
		try {
			connection.commit(); 
			log.debug("commitAndClose...");
		} catch (SQLException e) {
			log.fatal("commit error..."+e.getMessage());
		}finally{
			DBConnection.closeConnection(connection);
		}
	}
	
	public void rollbackAndClose(){
		try {
			connection.rollback();
		} catch (SQLException e) {
			log.fatal("rollback error..."+e.getMessage());
		}finally{
			DBConnection.closeConnection(connection);
		}
	}
}
