package com.alipay.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ProxoolDBManager implements IDBManager {
	private boolean autoCommit = true;

	private boolean oldAutoCommit;

	private String alias;

	public ProxoolDBManager(String dbAlias, boolean autoCommit) {
		this.alias = dbAlias;
		this.autoCommit = autoCommit;
		if (!alias.startsWith("proxool")) {
			alias = "proxool." + alias;
		}
	}

	public void closeConnection(Connection conn) {
		try {
			conn.setAutoCommit(oldAutoCommit);
			conn.close();
		} catch (Exception e) {
		}
	}

	public Connection getConnection() throws SQLException {
		Connection conn = null;
		try {
			// Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
			// Class.forName("net.sourceforge.jtds.jdbc.Driver");
			conn = DriverManager.getConnection(alias);
			/*
			 * oldAutoCommit=conn.getAutoCommit();
			 * conn.setAutoCommit(autoCommit);
			 */
			conn.setAutoCommit(false);
		} catch (SQLException e) {
			throw e;
		}
		return conn;
	}

	public void beginTransaction(Connection conn) {
		;
	}

	public void commit(Connection conn) {
		try {
			conn.commit();
		} catch (SQLException e) {
		}
	}

	public void rollback(Connection conn) {
		try {
			conn.rollback();
		} catch (SQLException e) {
		}
	}
}
