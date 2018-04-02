package com.alipay.dbutil;

import com.alipay.common.IParamReader;

public class DBPool implements IParamReader {

	public void readParams() {
		DBInit.initDB();
	}

	public void destroyParams() {

	}
	
	public void reloadParam(){}

}
