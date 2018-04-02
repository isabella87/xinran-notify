package com.alipay.common;

import java.io.UnsupportedEncodingException;
import java.util.Date;

public class StringUtils {

	public static boolean isBlank(String s){
		return org.apache.commons.lang3.StringUtils.isBlank(s);
	}

	public static String toString(String s){
		return s==null?"":s;
	}

	public static String toString(Date d){
		return d==null?"":DateUtils.toStandardStr(d);
	}

	public static String toString(Float f){
		return f==null?"":f.toString();
	}

	public static String toString(Double d){
		return d==null?"":d.toString();
	}

	public static String toString(Integer i){
		return i==null?"":i.toString();
	}

	public static String toString(Long l){
		return l==null?"":l.toString();
	}

	public static String toString(Short s){
		return s==null?"":s.toString();
	}

	public static String toString(Object o){
		if (o==null)
			return "";
		if (o instanceof Date)
			return DateUtils.toStandardStr((Date)o);
		if (o instanceof String)
			return ((String)o).trim();
		if (o instanceof Number)
			return ((Number)o).toString();
		return o.toString();
	}

	/**
	 * 截取字符串的方法
	 * @param s			需要截取的字符串
	 * @param length	截取字段的长度
	 * @return			返回截取的字符串
	 */
	public static String subString(String s,int length){
		if(!toString(s).equals("")&&s.length()>length){
				return s.substring(0,length);
		}
		return toString(s);
	}

	public static String join(Object[] objs, char seperator){
		return org.apache.commons.lang3.StringUtils.join(objs,seperator);
	}

	public static String trim(String s){
		if (s==null)
			return null;
		return s.trim();
	}

	public static String line2Br(String s){
		return s!=null?s.replace("\n", "<br>"):"暂无";
	}

	public static String abbreviateMiddle(String str, String middle, int length){
		return org.apache.commons.lang3.StringUtils.abbreviateMiddle(str, middle, length);
	}

	//国标码和区位码转换常量
	private static int GB_SP_DIFF = 160;

	// 存放国标一级汉字不同读音的起始区位码
	private static int[] secPosValueList = { 1601, 1637, 1833, 2078, 2274, 2302,
			2433, 2594, 2787, 3106, 3212, 3472, 3635, 3722, 3730, 3858, 4027,
			4086, 4390, 4558, 4684, 4925, 5249, 5600 };

	// 存放国标一级汉字不同读音的起始区位码对应读音
	private static char[] firstLetter = { 'a', 'b', 'c', 'd', 'e', 'f', 'g',
			'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'w',
			'x', 'y', 'z' };

	public static char getChineseFirstChar(String ch) {
		char result = '-';
		if(StringUtils.isBlank(ch)){
			return result;
		}
		byte[] bytes = new byte[2];
		try {
			bytes = ch.getBytes("GB2312");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		int secPosValue = 0;
		int i;
		for (i = 0; i < bytes.length; i++) {
			bytes[i] -= GB_SP_DIFF;
		}
		secPosValue = bytes[0] * 100 + bytes[1];
		for (i = 0; i < 23; i++) {
			if (secPosValue >= secPosValueList[i]
					&& secPosValue < secPosValueList[i + 1]) {
				result = firstLetter[i];
				break;
			}
		}
		return result;
	}
}
