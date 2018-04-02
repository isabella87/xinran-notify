package com.alipay;

import com.alipay.dbutil.QueryUtil;

public class BaseService {
	private static final String DB_ALIAS = "default";
	private static final String DB_TYPE = "mysql";
	protected final static QueryUtil queryUtil = QueryUtil.getInstance(DB_ALIAS, DB_TYPE);

}
