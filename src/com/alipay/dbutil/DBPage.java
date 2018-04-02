package com.alipay.dbutil;

public class DBPage {
	
	public static String pagingOracle(String sql, int start, int length){
		sql=sql.trim();
		boolean hasUpdate=false;
		if (sql.toLowerCase().endsWith("for update")){
			sql=sql.substring(0, sql.length()-11);
			hasUpdate=true;
		}
		StringBuffer pagingSelect = new StringBuffer( sql.length()+100 );   
		if (start>0) {   
			pagingSelect.append("select * from ( select row_.*, rownum rownum_ from ( ");   
		}   
		else {   
			pagingSelect.append("select * from ( ");   
		}   
		pagingSelect.append(sql);   
		if (start>0) {   
			pagingSelect.append(String.format(" ) row_ where rownum <= %d) where rownum_ > %d",start+length,start));   
		}   
		else {   
			pagingSelect.append(" ) where rownum <= "+length);   
		}
		if (hasUpdate){
			pagingSelect.append(" for update");
		}
		return pagingSelect.toString();
	}
	
	public static String pagingMysql(String sql, int start, int length){
		String limits=" limit ";
		if (start>0){
			//limits+=start+","+(start+length);
			limits+=start+","+length;
		}else{
			limits+=length;
		}
		return sql+limits;
	}
	
	public static String pagingSelect(String dbType,String sql, int start, int length){
		if (dbType.trim().equalsIgnoreCase("mysql")){
			return pagingMysql(sql,start,length);
		}
		if(dbType.trim().equalsIgnoreCase("oracle")){
			return pagingOracle(sql,start,length);
		}
		return pagingOracle(sql,start,length);
	}
}
