/**
 * 
 */
package com.alipay.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alipay.WapDoNotifyService;

/**
 * 执行基础配置动作的类
 * 
 * @author 
 *
 */
public final class BaseConfigurator {
	/**
	 * 
	 */
	private BaseConfigurator() {
		assert false;
	}

	/**
	 * 执行配置动作, 通过类路径中读取{@code wappay.properties}来加载所有配置项
	 */
	public static void configure() {
		getLog().debug("initializing all properties");

		Configuration.setProperties(defaultProperties());
	}

	/**
	 * 获取默认配置
	 * 
	 */
	private static Map<String, String> defaultProperties() {
		final Map<String, String> ret = new HashMap<String, String>();

		final java.util.Properties props = new java.util.Properties();
		try {
			props.load(BaseConfigurator.class.getResourceAsStream("/wappay.properties"));
		} catch (IOException ex) {
			getLog().warn("cannot load properties", ex);
		}

		for (final String key : props.stringPropertyNames()) {
			ret.put(StringUtils.lowerCase(key), props.getProperty(key));
		}

		return ret;
	}

	/**
	 * 获取日志对象
	 * 
	 * @return 关联的日志对象
	 */
	private static Log getLog() {
		return LogFactory.getLog(BaseConfigurator.class);
	}

	public static void main(String[] args) throws IOException {
		/*final java.util.Properties props = new java.util.Properties();
		props.putAll(defaultProperties());
		props.store(new java.io.FileWriter(new java.io.File("/wappay.properties")),
				"Basic properties");*/
//		BaseConfigurator.configure();
		new WapDoNotifyService();
		System.out.println(Configuration.APP_ID);
		System.out.println(Configuration.getString(Configuration.APP_ID));
		System.out.println("DONE");
	}
}
