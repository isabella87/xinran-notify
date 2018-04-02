<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!--[if lt IE 10]>
<div class="ban_info_cue ban_page_info"><div class="ban_wrapper">推荐使用IE10及以上版本或Chrome、Firefox等高级浏览器。360等多核心浏览器请切换到极速模式。IE7及以下版本无法正常浏览本站，请立即升级。</div></div>
<![endif]-->
<div class="scrollify" data-div-name="menu"></div>
<div class="ban_top">
	<div class="ban_wrapper">

		<div class="ban_tel">客服热线：<span class="ban_tel_num">021 6546 1161</span></div>
	    <%-- <div class="ban_follow">
	    	<a href="http://blog.sina.com.cn/banbankblog" target="_blank" title="关注萌承博客" class="ban_follow_a">
	    		<a:img cssClass="ban_follow_img" src="ban_sblog.png" title="关注萌承博客" /></a>

	    	<a href="http://weibo.com/banhuit" target="_blank" title="关注萌承微博" class="ban_follow_a">
	    		<a:img cssClass="ban_follow_img" src="ban_sina.png" title="关注萌承微博" /></a>

	    	<div class="ban_follow_a" style=" width:auto">
		    	<a:img cssClass="ban_follow_img" src="ban_wx.png" title="关注萌承微信" />
		    	<span style="padding-right: 8px; position: relative; top: -10px;">扫码关注官方微信</span>
		        <ul class="ban_follow_info">
		          <li class="ban_follow_info_li">
		            <h3 class="ban_follow_info_t">服务号</h3>
		            <a:img cssClass="ban_follow_info_img" src="weixin1.png" /></li>
		          <li class="ban_follow_info_li">
		            <h3 class="ban_follow_info_t">订阅号</h3>
		            <a:img cssClass="ban_follow_info_img" src="weixin2.png" /></li>
		        </ul>
	      </div>
	      <div class="ban_follow_a"  style=" width:auto">
	      <a href="/portal2/download.html" target="_blank" title="下载萌承手机客户端"  style=" text-decoration: none"><a:img src="ban_app.png"  cssClass="ban_follow_img" /><span style="padding-right: 8px; position: relative; top: -10px; color: #fbd609;">下载手机APP</span></a>
            <ul class="ban_follow_info">
             <!--<li class="ban_follow_info_li">
                <h3 class="ban_follow_info_t" style="font-size: 16px">IOS版</h3>
                <img id="iosAppImgh" src="" class="ban_follow_info_img"/> 
              </li>
               --> 
              <li class="ban_follow_info_li">
                <h3 class="ban_follow_info_t" style="font-size: 16px">安卓版</h3>
                <a:img src="ban_app_img.png" cssClass="ban_follow_info_img"/>
              </li>
            </ul>
          </div>
	    </div> --%>

		<!-- <div class="ban_top_login"><a href="#" class="ban_top_login_a">登录</a></div>
	    <div class="ban_top_reg"><a href="#" class="ban_top_reg_a">注册</a></div>
	    <div class="ban_top_help"><a href="#" class="ban_top_help_a">帮助</a></div>-->

		<div class="ban_top_login" id="div_logout">  </div>
		<div class="ban_top_help"><a id="a_help" href="<%=rootPath %>/xinran/info/about21.html" class="ban_top_help_a">帮助</a>  </div>
		<div class="ban_top_reg" id="div_reg">   </div>
		<a id="topMsgA" style="display:none" href="<%=rootPath %>/message/message-list.html" class="ban_top_newsicon"></a>
		<div class="ban_top_id"   id="div_login">   </div>

	</div>
</div>
<div class="ban_head">
	<div class="ban_wrapper ban_headbg">
		<div class="ban_title" title="萌承">
			<a href="/xinran/index.html" class="ban_logo" title="萌承"><img src="themes/default/images/ban_logo3.png" title="萌承Logo" /></a>
		</div>
		<div class="ban_slogan">
			<span class="ban_slogan_stress">上海萌承电子科技有限公司</span>
		</div>
		<div class="ban_nav">
			<div class="ban_nav_switch"></div>
			<ul class="ban_nav_ul">
				<li class="ban_nav_li"><a id="a_portal" href="<%=rootPath %>/xinran/index.html" class="ban_nav_a">首页</a></li>
				<li class="ban_nav_li"><a id="a_maintanin_workers" href="<%=rootPath %>/xinran/worker/soldier-list.html" class="ban_nav_a">点兵点将</a></li>
				<li class="ban_nav_li"><a id="a_maintain" href="<%=rootPath %>/xinran/maintain/info-list.html" class="ban_nav_a">维修资讯</a></li>
				<li class="ban_nav_li"><a id="a_product" href="<%=rootPath %>/xinran/product/product-list.html" class="ban_nav_a">商品展示</a></li>
				<li class="ban_nav_li"><a id="a_service" href="<%=rootPath %>/xinran/service/apply-service.html" class="ban_nav_a">订购服务</a></li>
				<%--
				<li class="ban_nav_li"><a id="a_common_fault" href="javascript:void(0);" class="ban_nav_a">常见故障</a></li>
				 <li class="ban_nav_li"><a id="a_maintenance" href="javascript:void(0);" class="ban_nav_a">维护保养</a></li>
				<li class="ban_nav_li"><a id="a_reference" href="javascript:void(0);" class="ban_nav_a">资料</a></li>
				 --%>
				<li class="ban_nav_li"><a id="a_realize_us" href="<%=rootPath %>/xinran/info/about15.html" class="ban_nav_a">了解我们</a></li>
			</ul>
		</div>
	</div>
</div>

