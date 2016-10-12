package edu.yuhf.dbutils;

import java.sql.Connection;

import org.junit.Test;

import com.yuhf.commons.dbutils.DBConnection;

public class DBConnectionTest {

	@Test
	public void testGetConnection(){
		Connection connection=DBConnection.getConnection();
		//DBConnection.closeConnection(connection);
	}
}
