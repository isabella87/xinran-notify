package com.alipay.dbutil;

import java.sql.Connection;
import java.sql.SQLException;

public interface IDBManager {

	public Connection getConnection() throws SQLException;

	public void closeConnection(Connection conn);

	public void beginTransaction(Connection conn);

	public void commit(Connection conn);

	public void rollback(Connection conn);

}
