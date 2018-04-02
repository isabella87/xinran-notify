package com.alipay.config;

public class AlipayConfig {
	// 商户appid
	public static String APPID = "2016080800194748";
	// 私钥 pkcs8格式的
	public static String RSA_PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCR1TOmEGOyfaAypQRLtnN8/ie0EW8QaqRMRCDZqi22m8SUNsiWD2t9yYRXg8LAgUX3y/6tLwpPSHohVnKRN6Ll6RrtnXvhtmj1IrznaNpiHiisOdiFW6+kh+wTqBQEbw2lgm/HnrJaAcmfggIF0y9vbg1H2s3m9Us6Nvt4GaNPW24roiUEBaXhEqHbpibwNYZHcz6PeXCTaQkKmKYxxmQ0zRuOrCIGB4hkoPEDgX2WyppYwIs8K0z1T1g7OAQMaP7l6W9kLFYKlgCz7AxBt9/tnS8EjIF/aQA/glcpZMZu8y6N0cVPN9XfSPRQ5mEs8l6MozKXj0NTqjOo8cEbeCilAgMBAAECggEASEZBsqusvWlFW9QsrNlfozLSuotpX9l6U9Hv9fBBd577bfk4sCY0P8L/s9+5RW7MHmMbdPk7Qs/It30AirfoI8nDbr/+BX9BxTvSI13z3WzU+4YvqOgnxIMYnSVPxmLDgKOEgopEGheItWTZW8muWKtSKapnIW+wOMnHF16dcVY9aQF+7YhhS3HWnUsBzAPRwgFj6EAQ1J8b+T0HRrEY084yiRuimngMTbYN/Qh8xTzWAkXzOuJ1G1WZ07P2XdrM27hn/n31Cm/c+M5yDqquAUDsJk9DcKoWWDHUS5kpwSS3rwLoqpCSeHbVWH06zcyQJ6qDkqMj+/h4t+vHyAmIAQKBgQDe5wv1F6ed6bT3m3KPIWG1H4IiddEVsCzRh8xcoPmqwdA3RwMinOh8mGbwvyycmvuwfSE/LaTc6bgb534J6agXszZ5hItpTqWAofckYz7cuLeuXzRvro1fnUsOREIFE47cG2yEQuaOgqQNVLf8CfYwKSwlehp9Ihvsu8V2tMwPMQKBgQCnfJZge5GeYiesp1hsf1W55/rmTVSscVweGOwQB+f3tUP3hFUrX9TXSpGN3L7b1MPaes2JFixFL5LH+1eIf28Zt1LWKn1137cwTSM6Xd4tfCf7ax48MFdpIMOryMgKi3OC+Bzu+LKoZOTbQyjySoZpgAHvH6xV9tE0IhpitbtbtQKBgHZ0uroJVB5rcKyVg4/k4ZPrprDBg9fOxEKltEkVkxjX3ttBdb0TPcnZA/u03PRsuIzWMrDshMyRuDG8GBMUhSvzJWP2uE/CZ9mwOTKxO1r5H0QffDJNxPunD5gJVjx0ZFs8h7LSCsx5SM181Dmw4ZA+kSNpfGI7mjN4pjurYTZBAoGAI6kxU4W78Z8wl2BiQWezVwv/rf2VI8pXNMlVqewlBecAe7kfcUbMSLLF3xC7So84zFINZTzlXC3O8OmhL50CiNUxvAv7/pcNqCkkcQ7/eWvQD4Y1P9eDJQ0m3HK5tRUQGTi+4Frvn08sM0tPcpdPmzL4NnPl+7+7t3/zYkUTiWkCgYEAz94kydHTwl3GB7GT2AmpmrgF4JpuZMHjjzBCNScE47UxWxrzenWxKZpY4DELB33mSAaL/CyEEMAKGDCa4Sh9B9JnoPxtohMFnAjU+UnVYxc9daPGkHJVFqI+/MxVt6pUEf0DlxAGEwUAWxRjztc1a21sLsIVnJLnFVQDXdWPr6I=";
	// 服务器异步通知页面路径 需http://或者https://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://www.mengchengkeji.com/wappay/pay-notify.jsp";
	// 页面跳转同步通知页面路径 需http://或者https://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问 商户可以自定义同步跳转地址
	public static String return_url = "http://www.mengchengkeji.com/m/account/history-service.html";
	// 请求网关地址
	public static String URL = "https://openapi.alipaydev.com/gateway.do";
	// 编码
	public static String CHARSET = "UTF-8";
	// 返回格式
	public static String FORMAT = "json";
	// 支付宝公钥
	public static String ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjN+NCh/RjkQc3JcJTJoTDdenT0C7/87FKb74rLUoLH0qZ86clxsjLTaEW6qKamT9kW/zWM12YFe0zSeuKtMRp+PaxvsreJXiXGA8V0W2BpXB/j83kFwdgGCpKPnyvVFKGH6AiQ2LmRP07LTeZd9/At+Btlb/1CeEXvw8O4eOXYChV3/gzkG6eVBHeeCAuUZ/i/oowkp1ifs5azVi33vjG17Tnt/kuB3JWpnVA+e8JshMlwOlWrNyN36Ve77G4PMce6e8owfLnJGRJSTmPTSUYq4ceyFa9otUJEcHeyoSk2IHwHnVH5RmjNXisVCv+wvzaZeWACow2iAKopRpexqVcwIDAQAB";
	// 日志记录目录
	public static String log_path = "C:/tomcat/log/xrsrv/";
	// RSA2
	public static String SIGNTYPE = "RSA2";
}
