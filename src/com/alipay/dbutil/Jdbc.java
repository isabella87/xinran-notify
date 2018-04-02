package com.alipay.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Jdbc {

	String dbUrl = "jdbc:oracle:thin:@192.168.30.201:1521:banhui1";// "192.168.30.201:1521:banhui1";
	String theUser = "p2p";
	String thePw = "Ban9HU3iT4oN2g";
	Connection c = null;
	Statement conn;
	ResultSet rs = null;

	public Jdbc() {
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver").newInstance();
			c = DriverManager.getConnection(dbUrl, theUser, thePw);
			conn = c.createStatement();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public boolean executeUpdate(String sql) {
		try {
			conn.executeUpdate(sql);
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	public ResultSet executeQuery(String sql) {
		rs = null;
		try {
			rs = conn.executeQuery(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}

	public void close() {
		try {
			conn.close();
			c.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
