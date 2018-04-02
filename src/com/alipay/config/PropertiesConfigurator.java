/**
 * 
 */
package com.alipay.config;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * @author Administrator
 *
 */
public final class PropertiesConfigurator {
	/**
	 * 
	 */
	private PropertiesConfigurator() {
		assert false;
	}

	/**
	 * 执行配置动作, 从指定的配置文件中加载所有配置项
	 * 
	 * @param configFileName
	 *            指定的配置文件
	 * 
	 * @see #configure(Properties)
	 */
	public static void configure(final String configFileName) {
		getLog().debug("loading configuration from properties file [" + configFileName + "] ...");

		final Properties props = new Properties();

		if (configFileName == null) {
			throw new NullPointerException("stream");
		}

		final InputStream stream;
		try {
			stream = new java.io.FileInputStream(configFileName);
		} catch (FileNotFoundException e) {
			getLog().error("cannot open wappay config file [" + configFileName + "]", e);
			return;
		}

		try {
			props.loadFromXML(stream);
		} catch (IOException e) {
			throw new IllegalStateException("cannot load wappay configuration from ["
					+ configFileName + "]");
		} finally {
			IOUtils.closeQuietly(stream);
		}

		configure(props);
	}

	/**
	 * 从{@code java.util.Properties}对象中加载配置信息
	 * 
	 * @param props
	 *            包含了配置信息的{@code java.util.Properties}对象
	 */
	public static void configure(final Properties props) {
		final Map<String, String> ret = new HashMap<String, String>();

		for (final String key : props.stringPropertyNames()) {
			ret.put(StringUtils.lowerCase(key), props.getProperty(key));
		}

		Configuration.setProperties(ret);
	}

	/**
	 * 获取日志对象
	 * 
	 * @return 关联的日志对象
	 */
	private static Log getLog() {
		return LogFactory.getLog(PropertiesConfigurator.class);
	}
}
