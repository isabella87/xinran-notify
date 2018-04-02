var isReg = (typeof IsReg !="undefined")&&IsReg;//判断是否是注册
$(function(){
	
	$("form input").bind("blur",doValidation);
	$("form input").keydown(hideValidation);
});

function doValidation(){
	if($(this).attr('type')=='button') return;
	var name = $(this).attr("name");
	var valMethodName = "validate"+name.substring(0,1).toUpperCase()+name.substring(1);
	
	var rs = eval("("+valMethodName+")()");
	if(rs&&name!="loginname"&&name!='mobileCode'){
		$("#"+name+"ErrorTips").hide();
	}
}

function hideValidation(){
	var name = $(this).attr("name");
	if(name=="mobileCode") return;
	$("#"+name+"ErrorTips").hide();
}

function validateMobile(){
	var mobile = $.trim($("#mobile").val());
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	if(mobile == "" || !reg.test(mobile)){
		$("#mobileErrorTips").showInline();
		return false;
	}
	$("#mobileErrorTips").hide();
	return true;
}

function validateActiveCode(){
	
	var mobileCode = $.trim($("#activeCode").val());
	if(mobileCode==""){
		$("#mobileCodeErrorTips").html('<span class="ban_infobox_cue_warn">激活码不能为空</span>').showInline();//("<font color=red>激活码不能为空！</font>");
		return false;
	}
	$("#mobileCodeErrorTips").html('短信激活码仅能使用一次,30分钟内有效。').showInline();
	return true;
}

function validateCaptchaCode(){
	
	var yzm = $.trim($("#captchaCode").val());
	if(yzm == ""){
		$("#yzmErrorTips").html('<span class="ban_infobox_cue_warn">验证码不能为空</span>').showInline()//("<font color=red>验证码不能为空！</font>");
		return false;
	}
	$("#yzmErrorTips").hide();
	return true;
}

function validateAgree(){
	
	if(!$("#agree").is(':checked')){
		$("#agreeErrorTips").showInline();
		return false;
	}
	$("#agreeErrorTips").hide();
	return true;
}

function validateRealName(){
	
	var realName = $.trim($("#realName").val());
	var reg = /^[\u4E00-\u9FA5]+$/;
	if(realName == ""){
		$("#realNameErrorTips").html('<span class="ban_infobox_cue_warn">真实姓名不能为空</span>').showInline();//("<font color=red>真实姓名不能为空！</font>");
		return false;
	}else if(!reg.test(realName)){
		$("#realNameErrorTips").html('<span class="ban_infobox_cue_warn">真实姓名必须为中文</span>').showInline();
		return false;
	}else if(realName.length>20){
		$("#realNameErrorTips").html('<span class="ban_infobox_cue_warn">真实姓名长度不能长于20个字符</span>').showInline();
		return false;
	}
	$("#realNameErrorTips").hide();
	return true;
}

function validateIdCard(){
	
	var idCard = $.trim($("#idCard").val());
	var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	if(idCard == ""){
		$("#idCardErrorTips").html('<span class="ban_infobox_cue_warn">身份证号码不能为空</span>').showInline();
		return false;
	}else if(idCard.length!=18){
		$("#idCardErrorTips").html('<span class="ban_infobox_cue_warn">身份证号码必须是18位</span>').showInline();
		return false;
	}else if(!reg.test(idCard)){
		$("#idCardErrorTips").html('<span class="ban_infobox_cue_warn">身份证号码格式不正确</span>').showInline();
		return false;
	}
	$("#idCardErrorTips").hide();
	return true;
}

function validateUserName(){
	var loginname = $.trim($("#userName").val());
	if(loginname == ""){
		$("#userNameErrorTips").html('<span class="ban_infobox_cue_warn">用户名不能为空</span>').showInline();
		return false;
	}else if(loginname.length<4||loginname.length>15){
		$("#userNameErrorTips").html('<span class="ban_infobox_cue_warn">用户名必须在4到15个字符以内</span>').showInline();
		return false;
	}
	
	//如果是注册页面则验证 用户名 是否已被注册
	if(isReg){
		$.ajax({
			url:SrvPath+"/ajax/ajaxValidateLoginName.jsp",
			async:false,//采用同步方式进行返回
			type:"POST",
			data:{loginname:loginname},
			success:function(msg){
				
				var result = eval("("+msg+")");
				if(result.length!=2||!result[1]){
					$("#userNameErrorTips").html('<span class="ban_infobox_cue_warn">用户名已被占用</span>').showInline();
					return false;
				}
				$("#userNameErrorTips").hide();
				return true;
			}
		});
	}
	
	return true;
}

function validatePassword(){
	var password = $.trim($("#password").val());
	if(password == ""){
		$("#passwordErrorTips").html('<span class="ban_infobox_cue_warn">密码不能为空</span>').showInline();
		return false;
	}else if(password.length<6||password.length>18){
		$("#passwordErrorTips").html('<span class="ban_infobox_cue_warn">密码必须在6到18个字符以内</span>').showInline();
		return false;
	}
	$("#passwordErrorTips").hide();
	return true;
}

function validatePassworda(){
	var password = $.trim($("#passworda").val());
	if(password == ""){
		$("#passwordaErrorTips").html('<span class="ban_infobox_cue_warn">确认密码不能为空</span>').showInline();
		return false;
	}else if(password.length<6||password.length>18){
		$("#passwordaErrorTips").html('<span class="ban_infobox_cue_warn">确认密码必须在6到18个字符以内</span>').showInline();
		return false;
	}else if(password!=$.trim($("#password").val())){
		$("#passwordaErrorTips").html('<span class="ban_infobox_cue_warn">确认密码与密码不相符</span>').showInline();
		return false;
	}
	$("#passwordaErrorTips").hide();
	return true;
}

function validateRecommendMobile(){
	
	/*var recommendMobile = $.trim($("#recommendMobile").val());
	if(recommendMobile == "11"){
		return true;
	}
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	if(recommendMobile != "" && !reg.test(recommendMobile)){
		$("#recommendMobileErrorTips").html('<span class="ban_infobox_cue_warn">推荐人手机号码格式不正确</span>').showInline();
		return false;
	}
	$("#recommendMobileErrorTips").hide();*/
	return true;
}

function validateLawName(){
	
	return true;
}

function validateLawIdCard(){
	
	return true;
}

function validateOrgName(){
	
	return true;
}

function validateBussLic(){
	
	return true;
}

function validateTaxLic(){
	
	return true;
}

function validateOrgCodeNo(){
	
	return true;
}

function validateAccUserName(){
	
	return true;
}

function validateAccount(){
	
	return true;
}

function validateAccBank(){
	
	return true;
}


