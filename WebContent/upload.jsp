<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@include file="inc/common.jsp"%>
<!-- <head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head> -->
<body>
<%@include file="inc/head-page.jsp" %>
<div class="ban_article">
<div class="bm_less_head bm_content_bottom">
  <div class="bm_less_head_tab">
		<h2 class="bm_less_head_title" style="margin-left:500px;color: #d70c18;margin-top:10px;">上传将士图片</h2>
	</div>
	<div class="bm_content">
	

<div class="ban_wrapper">
 <div class="ban_main">
<form method="post" action="UploadServlet" enctype="multipart/form-data">

<div class="bm_box">
<br/><br/><br/><br/>
				<div class="bm_boxrow">
					<div class="bm_boximport">
						<label>
							<input type="file" name="uploadFile" style="height:100px;color: #d70c18;"/></label>
							<input type="submit" value="上   传" />
					</div>
				</div>
			</div>
			<br/><br/><br/><br/><br/><br/>
			<div class="bm_button" style="margin-bottom:220px">
				
			</div>
			
	<!-- 选择一个文件:<input type="file" name="uploadFile" /><br/>
	<br/><br/>
	<input type="submit" value="上传" /> -->
</form>
</div>
</div>
</div>
</div>
</div>
<%@include file="inc/foot-page.jsp" %>
</body>
</html>