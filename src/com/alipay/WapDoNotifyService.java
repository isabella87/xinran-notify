package com.alipay;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;


public class WapDoNotifyService extends BaseService{

	
	private final static Logger logger = Logger.getLogger(WapDoNotifyService.class);
	
	
	/**
	 * 构造sql并执行更新操作
	 * @param paramsList
	 *            name:value   第一个值是主键
	 * @return
	 */
	public boolean doWapNotify(List<String> paramsList,int type) {
		
		switch(type){
		case 1:
			return doServiceWapNotify(paramsList);
		case 2:
			return doOrderWapNotify(paramsList);
		}
		return false;
	}
	
public boolean doServiceWapNotify(List<String> paramsList) {
		
		StringBuffer sb = new StringBuffer();
		sb.append("UPDATE ZFB_SERVICE SET ");

//		String[] params = new String[paramsList.size()];
		for (int i = 1; i < paramsList.size(); i++) {
			String[] nameValue = paramsList.get(i).split(",");
			sb.append(nameValue[0]).append("=").append(nameValue[1]).append(",");
//			params[i - 1] = nameValue[1];
		}
		String sqlEnd = " DATEPOINT2= NOW() WHERE ZS_ID =" + paramsList.get(0).split(",")[1];
		String sql = sb.toString() + sqlEnd;

//		params[paramsList.size() - 1] = paramsList.get(0).split(",")[1];

		//更改业务表数据状态
		String updateTsSql = "UPDATE MAJOR_SERVICE SET STATUS = 99 ,UPDATE_TIME = NOW() "
				+ " WHERE MS_ID = (SELECT MS_ID FROM ZFB_SERVICE WHERE ZS_ID = "+paramsList.get(0).split(",")[1] +" )";
		try {
			logger.debug("write to :"+sql);
			int c = queryUtil.executeUpdate(sql);  //更新命令表数据
			queryUtil.executeUpdate(updateTsSql);//更新业务表数据
			if (c > 0) {
				return true;
			}
		} catch (SQLException e) {
			logger.debug(e);
			e.printStackTrace();
		}
		return false;
	}

public boolean doOrderWapNotify(List<String> paramsList) {
	
	StringBuffer sb = new StringBuffer();
	sb.append("UPDATE ZFB_ORDER SET ");

//	String[] params = new String[paramsList.size()];
	for (int i = 1; i < paramsList.size(); i++) {
		String[] nameValue = paramsList.get(i).split(",");
		sb.append(nameValue[0]).append("=").append(nameValue[1]).append(",");
//		params[i - 1] = nameValue[1];
	}
	String sqlEnd = " DATEPOINT2= NOW() WHERE ZO_ID =" + paramsList.get(0).split(",")[1];
	String sql = sb.toString() + sqlEnd;

//	params[paramsList.size() - 1] = paramsList.get(0).split(",")[1];

	//更改业务表数据状态
	String updateTsSql = "UPDATE PRO_ORDER SET STATUS = 99 ,UPDATE_TIME = NOW() "
			+ " WHERE PO_ID = (SELECT PO_ID FROM ZFB_ORDER WHERE ZO_ID = "+paramsList.get(0).split(",")[1] +" )";
	try {
		logger.debug("write to :"+sql);
		int c = queryUtil.executeUpdate(sql);  //更新命令表数据
		queryUtil.executeUpdate(updateTsSql);//更新业务表数据
		if (c > 0) {
			return true;
		}
	} catch (SQLException e) {
		logger.debug(e);
		e.printStackTrace();
	}
	return false;
}
	
	public static void main(String[] args){
		List<String> paramsList = new ArrayList<String>();
		paramsList.add("zs_id,24");
		paramsList.add("done,2");
//		paramsList.add("datepoint2,2017-08-23 10:42:51");
		paramsList.add("trade_no,12345678");
		paramsList.add("seller_id,123456");
		
		boolean c = new WapDoNotifyService().doWapNotify(paramsList,1);
		System.out.println(c);
	}
}
