package com.alipay;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.alipay.api.response.AlipayTradeQueryResponse;

public class CheckPayService extends BaseService {

	private final static Logger logger = Logger
			.getLogger(CheckPayService.class);

	/**
	 * 构造sql并执行更新操作
	 * 
	 * @param paramsList
	 *            name:value 第一个值是主键
	 * @return
	 */
	public boolean checkPay(AlipayTradeQueryResponse alipay_response) {
		logger.debug(alipay_response);
		if(!alipay_response.getCode().equals("10000")){
			return false;
		}
		String outTranNo = alipay_response.getOutTradeNo();
		String querySql = "SELECT ZS_ID,TOTAL_AMOUNT,MS_ID,DATEPOINT,TRADE_NO FROM  ZFB_SERVICE WHERE NOW()>DATE_ADD(DATEPOINT, INTERVAL +30 MINUTE) AND DONE = 0 AND OUT_TRADE_NO =  "
				+ outTranNo;
		List<Map<String, String>> list = null;
		try {
			list = queryUtil.executeQuery(querySql);

			String zsId = null;
			for (Map<String, String> paramsMap : list) {
				zsId = paramsMap.get("ZS_ID");
				paramsMap.get("TOTAL_AMOUNT");
				paramsMap.get("MS_ID");
				paramsMap.get("DATEPOINT");
				paramsMap.get("TRADE_NO");

			}
			StringBuffer sb = new StringBuffer();
			sb.append("UPDATE ZFB_SERVICE SET ")
			.append("TRADE_NO=").append(alipay_response.getTradeNo()).append(",")
			.append("BUYER_LOGON_ID='").append(alipay_response.getBuyerLogonId()).append("',")
			.append("BUYER_PAY_AMOUNT=").append(alipay_response.getBuyerPayAmount()).append(",")
			.append("BUYER_ID=").append(alipay_response.getBuyerUserId()).append(",")
			//.append("TRAN_NO=").append(alipay_response.getCode()).append(",")
			.append("INVOICE_AMOUNT=").append(alipay_response.getInvoiceAmount()).append(",")
			//.append("TRAN_NO=").append(alipay_response.getPointAmount()).append(",")
			.append("RECEIPT_AMOUNT=").append(alipay_response.getReceiptAmount()).append(",")
			.append("TRADE_STATUS='").append(alipay_response.getTradeStatus()).append("',")
			.append("TOTAL_AMOUNT=").append(alipay_response.getTotalAmount()).append(",")
			.append("GMT_PAYMENT='").append(alipay_response.getSendPayDate()).append("',")
			;
			String sqlEnd = " DATEPOINT2= NOW() WHERE ZS_ID =" + zsId;
			String sql = sb.toString() + sqlEnd;

			// 更改业务表数据状态
			String updateTsSql = "UPDATE MAJOR_SERVICE SET STATUS = 99 ,UPDATE_TIME = NOW() "
					+ " WHERE MS_ID = (SELECT MS_ID FROM ZFB_SERVICE WHERE ZS_ID = "
					+ zsId + " )";
			logger.debug("write to :" + sql);
			
			int c = queryUtil.executeUpdate(sql); // 更新命令表数据
			queryUtil.executeUpdate(updateTsSql);// 更新业务表数据
			if (c > 0) {
				return true;
			}
		} catch (SQLException e) {
			logger.debug(e);
			e.printStackTrace();
		}
		return false;
	}

	public static void main(String[] args) {
		List<String> paramsList = new ArrayList<String>();
		paramsList.add("zs_id,24");
		paramsList.add("done,2");
		// paramsList.add("datepoint2,2017-08-23 10:42:51");
		paramsList.add("trade_no,12345678");
		paramsList.add("seller_id,123456");

		System.out.println(true);
	}
}
