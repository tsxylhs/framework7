package com.yuhf.commons.dbutils;

import java.sql.ResultSet;

public interface ResultSetHandler<T> {
	public T handler(ResultSet rs) throws Exception;
}
