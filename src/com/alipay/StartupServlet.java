package com.alipay;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;

import com.alipay.config.BaseConfigurator;
import com.alipay.dbutil.DBPool;

public class StartupServlet extends HttpServlet {

	private final static Logger logger = Logger.getLogger(StartupServlet.class);
	
	public void init() throws ServletException{
		new DBPool().readParams();
		BaseConfigurator.configure();
	}
}
