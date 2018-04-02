IsReg = true;

$(function() {

	$("input[id^=submitBtn]").on("click", submitForm);
	$("#yzmImg").on("click", changeYZM).click();
	$("#getMobileCodeBtn").on("click", getMobileCode);
});

function getMobileCode() {

	if (validateMobile()) {
		Sys.put(GetMCodeURL, {
			mobile : $.trim($("#mobile").val())
		}, function(data) {
			console.log(data)
			if (data.result) {
				$("#mobileCodeErrorTips").html('手机激活码已发送，请注意查收').showInline();
			} else {
				$("#mobileErrorTips").html('<span class="ban_infobox_cue_warn">'+data.message+'</span>').showInline();
			}
		},"JSON");
	}
}

function changeYZM() {
	$(this).attr('src', YzmURL + '?_t=' + new Date().getTime());
}

function submitForm() {

	var index = $(this).attr("id").substring($(this).attr("id").length - 1);
	var $form = $("#regForm" + index);
	var isValid = true;
	
	if(index == 2&&$form.find("input[name='mobile']").length==0){
		$("#mobile").clone().removeAttr("id").attr("type","hidden").insertBefore($("#realName"));
	}

	$form.find("input").each(
			function() {
				if ($(this).attr("type") == "button" || $(this).attr("type") == "hidden" )
					return;
				var id = $(this).attr("id");
				var valiMethod = "validate" + id.substring(0, 1).toUpperCase()
						+ id.substring(1);
				if (!eval("(" + valiMethod + ")()")) {
					isValid = false;
				}
			});
	
	if (isValid) {
		
		$.ajax({
			url : eval('(URL' + index + ')'),
			data : $form.serializeObject(),
			method : $form.attr('method')||'post',
			success : function(data){
				if(!data) {Sys.errorDlg('验证激活码失败！');return;}
				if (data.result) {
					gotoStep(parseInt(index) + 1);
				}else{
					Sys.errorDlg(data.message);
				}
			},
			dataType : "JSON"
		});
		
	}
}

function gotoStep(step) {

	$("div[id^=regDiv]").hide();
	$("#regDiv" + step).show();
}