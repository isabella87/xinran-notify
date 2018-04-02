package com.alipay.dbutil;

import java.io.UnsupportedEncodingException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.logicalcobwebs.proxool.ProxoolException;
import org.logicalcobwebs.proxool.configuration.PropertyConfigurator;


public class DBInit {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(DBInit.class);
	
	static String dbFilePath = "/conf/proxool_db.properties";
	public static boolean initDB(){
		String path = DBInit.class.getClassLoader().getResource("").getPath()+dbFilePath;
		try {
				path = java.net.URLDecoder.decode(path,"utf-8");
				PropertyConfigurator.configure(path); 
		} catch (UnsupportedEncodingException e) {
			logger.error("数据库配置读取错误：",e);
			return false;
		} catch (ProxoolException e) {
			logger.error("数据库连接配置错误：",e);
			return false;
		} 
		return true;
	}
}
