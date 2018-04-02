//var _JsCurrDate = new Date();
var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    
    getButton: function(event){
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },
    
    getCharCode: function(event){
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    
    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    
    getEvent: function(event){
        return event ? event : window.event;
    },
    
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    
    },
    
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    
    getWheelDelta: function(event){
        if (event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    
    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};

(function($) {
	"use stricts";
	
	$.fn.extend({
		showInline : function() {
			$(this).css({
				"display" : "inline"
			});
			return $(this);
		},
		Scroll : function(opt, callback) {
			
			var line = opt.line||2,p = 2;
			var $this = $(this),count = $this.children().size();
			var hideItems = $this.children().filter(function(i){
				if(opt.top&&arrCon(opt.top,i)){
					return false;
				}
				return true;
			}),hideLen = hideItems.length;
			line = line - (count - hideLen);
			ap = hideLen%line==0?hideLen/line:(hideLen-hideLen%line)/line+1;
			
			var play = function(){
				
				hideItems.hide();
				if(line>0){
					for(var i=0;i<hideLen;i++){
						if(p>ap){
							p = 1;i=0;
						}
						if(p - 1 == Math.floor(i/line)){
							hideItems.eq(i).show(opt.speed||100);
						}
					}
				}
				p++;
			}
			
			var s = setInterval(play, opt.timer||5000);
			
			$this.hover(function(){
				window.clearInterval(s)
			},function(){
				s = setInterval(play, opt.timer||5000);
			});
			
			if(typeof callback == 'function')
				eval('('+callback+')()');
			
			function arrCon(l,i){
				
				for(var j=0;j<l.length;j++){
					if(l[j]==i){
						return true;
					}
				}
				return false;
			}
		},
		validateForm:function(cfg){
			if(!cfg) cfg = {};
			var defaults = {
					boxClass : 'ban_box',
					eBoxClass : 'ban_box_cue',
					errMsg : '<div class="ban_box_cue_arrow"></div><p class="ban_box_cue_p">#[msg]</p>',
					reg : new RegExp("\\#\\[msg\\]","g")
			};
			for(var k in defaults){
				cfg[k] = cfg[k]||defaults[k];
			}
			
			if($(this).is('form')){
				return valForm($(this));
			}else if($(this).is('input')){
				return valField($(this));
			}
			
			function valForm(fObj){
				var inputs = fObj.find('input,textarea,select'),r = true,fErrObj;
				inputs.not(':hidden').each(function(i,d){
					r = valField($(d))&&r;
					if(!fErrObj&&!r){
						fErrObj = $(d);
					}
					if(!r ) {
						$(d).focus();
						return;
					}
				});
				if(!r){
					fErrObj.focus();
				}
				
				return r;
			}
			
			function valField($d){
				
				$d.on('keydown',function(){
					$(this).parents("."+cfg.boxClass).find('.'+cfg.eBoxClass).hide();
				});
				$('.'+cfg.eBoxClass).on('click',function(){
					$(this).hide();
				});
				
				var r = true;
				if($d.prop('readonly')){
					return r;
				}
				if($d.hasClass('_required')&&!valRequired($d)) {r = false;return r;}
				if($d.hasClass('_int')&&!valInt($d)) {r = false;return r;}
				if($d.hasClass('_length')&&!valLength($d)) {r = false;return r;}
				if($d.hasClass('_phone')&&!valPhone($d)) {r = false;return r;}
				if($d.hasClass('_idcard')&&!valIdcard($d)) {r = false;return r;}
				if($d.hasClass('_email')&&!valEmail($d)) {r = false;return r;}
				if($d.hasClass('_same')&&!valSame($d)) {r = false;return r;}
				if($d.hasClass('_blank')&&!valBlank($d)) {r = false;return r;}
				if($d.hasClass('_removeBlank')&&!valRemoveBlank($d)) {r = false;return r;}
				if($d.hasClass('_year')&&!valYear($d)) {r = false;return r;}
				if($d.hasClass('_username')&&!valUserName($d)) {r = false;return r;}
				if($d.hasClass('_integer')&&!valInteger($d)) {r = false;return r;}
				if($d.hasClass('_size')&&!valSize($d)) {r = false;return r;}
				if($d.hasClass('_pwd')&&!valPwd($d)) {r = false;return r;}
				if($d.hasClass('_recommendCode')&&!valRecommendCode($d)) {r = false;return r;}
				if($d.hasClass('_removeOtherChar')&&!valRemoveOtherChar($d)) {r = false;return r;}
				return r;
			}
			
			function valPwd(obj){
				var val = obj.val(),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				
				if(!/^[a-z0-9_]+$/gi.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段只能由字母、数字 或下划线组成且不能含有空格！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valRecommendCode(obj){
				var val = obj.val(),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				
				if(!/^[0-9a-zA-Z]*$/g.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段只能由字母、数字组成且不能含有空格！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			
			function valSize(obj){
				
				if(!valInteger(obj)&&!valInt(obj)){
					return false;
				}
				var val = parseFloat($.trim(obj.val())),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass),min = parseFloat(obj.attr('min')),max = parseFloat(obj.attr('max'));
				
				if(val<min||val>max){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段必须大于'+min+'且小于'+max+'！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valInteger(obj){
				var val = $.trim(obj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				
				if(!/^[1-9]\d*$/.test(val)&&val!='0'){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段必须是正整数或0！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valUserName(obj){
				var val = $.trim(obj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				
				if(!/^[\u4e00-\u9fa5a-z0-9_]*$/i.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段必须由字母、数字、下划线或者汉字组成！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valYear(obj){
				
				var val = $.trim(obj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass),min=0,max=99;
				if(isNaN(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段必须是数字！')).showInline();
					return false;
				}
				val = parseFloat(val);
				if(val<min||val>99){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段必须大于'+min+'且小于'+max+'！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valRemoveBlank(obj){
				
				var val = $.trim(obj.val());
				
				if(val!=''){
					obj.val(val.replace(/\s+/g,''));
				}
				
				return true;
				
			}
			
			function valRemoveOtherChar(obj){
				
				var val = $.trim(obj.val());
				var reg = new RegExp("[^A-Za-z0-9]","g");
				if(val!=''){
					obj.val(val.replace(reg,''));
				}
				
				return true;
			}
			
			function valBlank(obj){
				
				var val = $.trim(obj.val()),reg = /\s+/g,eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				if(val!=''&&reg.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'该字段不能含有空格！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valSame(obj){
				
				var val = $.trim(obj.val()),label = obj.parents("."+cfg.boxClass).find('label').text(),target = obj.attr('target'),tObj = $("#"+target),tv = $.trim(tObj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				if(val!=tv){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,label+'不一致！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valEmail(obj){
				var val = $.trim(obj.val()),reg = /\w@\w*\.\w/,eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				if(val!=''&&!reg.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'电子邮箱格式不正确！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			function valIdcard(obj){
				var val = $.trim(obj.val()),reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				/*if(val!=''&&!reg.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'身份证号码格式不正确！')).showInline();
					return false;
				}*/
				if(val!=''&&!IdCardValidate(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'身份证号码格式不正确！')).showInline();
					return false;
				}
				//IdCardValidate
				eBoxObj.hide();
				return true;
			}
			
			function valPhone(obj){
				
				var val = $.trim(obj.val()),reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/,eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				if(val!=''&&!reg.test(val)){
					eBoxObj.html(cfg.errMsg.replace(cfg.reg,'手机号码格式不正确！')).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valRequired(obj){
				var v = $.trim(obj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass),tips = "该字段不能为空！";
				
				if(obj.attr('type')&&obj.attr('type').toUpperCase()=='CHECKBOX'){
					var form = obj.parents('form');
					v = $('input[name="'+obj.attr('name')+'"]:checked').length ;
					tips = "该项为必选项！";
				}
				if(!v||v == ''){
					var errMsg = cfg.errMsg.replace(cfg.reg,tips);
					eBoxObj.html(errMsg).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valInt(obj){
				var v = $.trim(obj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				if(v!=''&&isNaN(v)){
					var errMsg = cfg.errMsg.replace(cfg.reg,'该字段必须为数字！');
					eBoxObj.html(errMsg).showInline();
					return false;
				}
				eBoxObj.hide();
				return true;
			}
			
			function valLength(obj){
				var v = $.trim(obj.val()),eBoxObj = obj.parents("."+cfg.boxClass).find('.'+cfg.eBoxClass);
				if(v!=''&&obj.attr('min')&&obj.attr('max')){
//					if(obj.hasClass('_int')){
//						var max = obj.attr('max'),max = parseFloat(max),min = obj.attr('min'),min = parseFloat(min),v = parseFloat(v);
//						if(v>max || v<min){
//							var errMsg = cfg.errMsg.replace(cfg.reg,'该字段值必须在'+min+'与'+max+'之间！');
//							eBoxObj.html(errMsg).showInline();
//							return false;
//						}
//						
//					}else{
						var max = obj.attr('max'),max = parseFloat(max),min = obj.attr('min'),min = parseFloat(min),v = v.length;
						if(v>max || v<min){
							var errMsg = cfg.errMsg.replace(cfg.reg,'该字段长度必须在'+min+'与'+max+'之间！');
							eBoxObj.html(errMsg).showInline();
							return false;
						}
//					}
				}
				eBoxObj.hide();
				return true;
			}
			
			return false;
		}
	});

	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子   
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X   
	function IdCardValidate(idCard) { 
	    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
	    if (idCard.length == 15) {   
	        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
	    } else if (idCard.length == 18) {   
	        var a_idCard = idCard.split("");                // 得到身份证数组   
	        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
	            return true;   
	        }else {   
	            return false;   
	        }   
	    } else {   
	        return false;   
	    }   
	}   
	/**  
	 * 判断身份证号码为18位时最后的验证位是否正确  
	 * @param a_idCard 身份证号码数组  
	 * @return  
	 */  
	function isTrueValidateCodeBy18IdCard(a_idCard) {   
	    var sum = 0;                             // 声明加权求和变量   
	    if (a_idCard[17].toLowerCase() == 'x') {   
	        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
	    }   
	    for ( var i = 0; i < 17; i++) {   
	        sum += Wi[i] * a_idCard[i];            // 加权求和   
	    }   
	    valCodePosition = sum % 11;                // 得到验证码所位置   
	    if (a_idCard[17] == ValideCode[valCodePosition]) {   
	        return true;   
	    } else {   
	        return false;   
	    }   
	}   
	/**  
	  * 验证18位数身份证号码中的生日是否是有效生日  
	  * @param idCard 18位书身份证字符串  
	  * @return  
	  */  
	function isValidityBrithBy18IdCard(idCard18){   
	    var year =  idCard18.substring(6,10);   
	    var month = idCard18.substring(10,12);   
	    var day = idCard18.substring(12,14);   
	    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	    // 这里用getFullYear()获取年份，避免千年虫问题   
	    if(temp_date.getFullYear()!=parseFloat(year)   
	          ||temp_date.getMonth()!=parseFloat(month)-1   
	          ||temp_date.getDate()!=parseFloat(day)){   
	            return false;   
	    }else{   
	        return true;   
	    }   
	}   
	  /**  
	   * 验证15位数身份证号码中的生日是否是有效生日  
	   * @param idCard15 15位书身份证字符串  
	   * @return  
	   */  
	  function isValidityBrithBy15IdCard(idCard15){   
	      var year =  idCard15.substring(6,8);   
	      var month = idCard15.substring(8,10);   
	      var day = idCard15.substring(10,12);   
	      var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	      // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
	      if(temp_date.getYear()!=parseFloat(year)   
	              ||temp_date.getMonth()!=parseFloat(month)-1   
	              ||temp_date.getDate()!=parseFloat(day)){   
	                return false;   
	        }else{   
	            return true;   
	        }   
	  }   
	//去掉字符串头尾空格   
	function trim(str) {   
	    return str.replace(/(^\s*)|(\s*$)/g, "");   
	}
})(jQuery);

Sys.countDownTime = function(ed) {
	/*var currDate = _JsCurrDate;
	if(typeof serverTime === 'function'){
		currDate = serverTime();
	}*/
	var diff = ed - new Date().getTime();
	//var diff = ed - (currDate.getTime() + new Date().getTime() - _JsCurrDate.getTime());
	//console.log(currDate,new Date(),_JsCurrDate);
	
	if(diff<=0) return diff;
	var days = 0; 
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	
	if(diff>0){
		days = Math.floor(diff/(24*3600*1000));
		diff = diff%(24*3600*1000)
	}
	
	if(diff>0){
		hours = Math.floor(diff/(3600*1000));
		diff = diff%(3600*1000)
	}
	
	if(diff>0){
		minutes = Math.floor(diff/(60*1000));
		diff = diff%(60*1000)
	}
	
	if(diff>0){
		seconds = Math.floor(diff/1000);
		diff = diff%1000
	}
	
	return { days: days, hours: hours, minutes: minutes, seconds: seconds };
};

/**
 * 剩余时间格式化输出
 */
Sys.formatTime = function(t) {
	
	if(t<=0) return '';
	var s = '';
	if (t.days > 0) {
		s = s + (t.days + '天');
		
		if(t.days>0){
			return s;
		}
	}
	if (t.hours >= 0) {
		if(s==''&&t.hours==0){
			s = '';
		}else{
			s += ((t.hours<10?'0'+t.hours:t.hours) + '时');
		}
	}
	
	if (t.minutes >= 0) {
		if(s==''&&t.minutes==0){
			s = '';
		}else{
			s += ((t.minutes<10?'0'+t.minutes:t.minutes) + '分');
		}
	}
	
	if (t.seconds >= 0) {
		if(s==''&&t.seconds==0){
			s = '';
		}else{
			s += ((t.seconds<10?'0'+t.seconds:t.seconds) + '秒');
		}
	}
	
	return s;
	//return (t.days + '天')+(t.hours + '时')+(t.minutes + '分')+(t.seconds + '秒');
}

Sys.getFlByType = function(type){
	
	var _GM = {
			1 : [5,6,7,8,9,10,11,13],
			2 : [1,2,3,4,12,14,15,16,17,18,19,20,21],
			3 : [22,23,24,25,26,27,28,29,30,31]
	}
	
	var _fl = null;
	for(var fl in _GM){
		
		$(_GM[fl]).each(function(i){
			if(type==_GM[fl][i]){
				_fl = fl;
			}
		});
	}
	
	return _fl;
}

Sys.getMtByPname = function(pName){
	
	var _GM = {
			
			'a_1' :['/maintain/maintain-info.html?type=1'],
			'a_2' :['/maintain/maintain-info.html?type=2'],
			'a_3' :['/maintain/maintain-info.html?type=3'],
			'a_4' :['/maintain/maintain-info.html?type=4'],
			
			//head-page selected class
			'a_portal' : ['/index.html','/index-guid.html?type=1','/index-guid.html?type=2','/index-guid.html?type=3'],
			'a_plist' : ['/project/project-list.html','/project/project-view.html','/project/to-pay.html'],
			'a_credit' : ['/creditassign/credit-assign-list.html','/creditassign/credit-assign-view.html','/creditassign/to-credit-pay.html'],
			'a_wyjk' : ['/wyjk/wyjk.html','/wyjk/wyjk1.html'],
			'a_tzgl' : ['/info/on-bbs-list.html'],
			'a_realize_us' : ['/info/on-bbs-view.html','/info/on-bbs-list.html?type=4','/info/on-bbs-list.html?type=2','/info/on-bbs-list.html?type=1',
			            '/info/on-bbs-list.html?type=3','/info/on-bbs-list.html?type=14','about15.html','about16.html','about17.html',
			            'about18.html','about19.html','about20.html','about21.html'],
			            
			'a_maintanin_workers' : ['/worker/soldier-list.html','/worker/soldier-detail.html'],
			'a_product' : ['/product/product-list.html','product/pay-product.html'],
			'a_maintain' : ['/maintain/info-list.html','/maintain/info-detail.html'],
			//'a_common_fault' : ['/maintain/info-list.html?type=2'],
			//'a_maintenance' : ['/maintain/info-list.html?type=3'],
			//'a_reference' : ['/maintain/info-list.html?type=4'],
			
			'a_service' : ['/service/apply-service.html'],
	        //portal   account-left selected class
			'a_accountment' : ['/account/accountment.html'],
			'a_recharge' : ['/account/recharge.html','/account/to-auth.html','/account/recharge-cb.html'],
			'a_withdraw' : ['/account/withdraw.html','/account/to-withdraw.html','/account/withdraw-large-amt.html'],
			'a_income' : ['/account/income.html'],
			'a_tender_income' : ['/account/tender-income.html'],
			'a_history_income' : ['/account/history-income.html'],
			'a_invest' : ['/account/investment.html','/account/project-details.html'], 
			'a_treasure' : ['/account/bhb.html','/account/bhb-details.html','/account/bhb-add-credit-assign.html'],
			'a_credit_assign' : ['/account/credit-assign.html','/account/batch-add-credit-assign.html'],
			'a_account_info' : ['/account/show-org-info.html','/account/edit-account-info.html','/account/account-mobile.html','/account/account-password.html','/account/account-email.html'],
			'a_jxpay_account_info' : ['/account/jxpay-info.html','/account/apply-jxpay-info.html','/account/jxpay-password.html','/account/identity-auth.html','/account/bind-card.html','/account/unbind-card.html'],
			'a_makeup_rec_mobile' : ['/account/makeup-recomm-mobile.html'],
			
			'a_bg_upload_product' :['/product/acc-upload-product.html'],
			'a_bg_product_list' :['/product/acc-product-list.html'],
			'a_bg_history_service' :['/service/acc-service-list.html'],
			'a_bg_history_order' :['/order/acc-order-list.html'],
			'a_bg_create_notice' :['/info/acc-create-info.html'],
			'a_bg_notice_list' :['/info/acc-info-list.html'],
			'a_bg_worker_list' :['/worker/acc-soldier-list.html'],
			
			'a_apply_service' :['/service/acc-apply-service.html'],
			'a_history_service' :['/service/history-acc-service-list.html'],
			'a_pay_service' :['/service/acc-paying-service-list.html'],
			
			'a_history_order' :['/order/history-acc-order-list.html'],
			'a_pay_order' :['/order/acc-paying-order-list.html'],
			 //vip  account-left selected class
			'a_vip_repayment' : ['/account/repayment.html'],
			'a_vip_borow_pro' : ['/account/borrow-project.html','/account/borrow-details.html']
			
	
	}
	
	var _fl = null;
	for(var fl in _GM){
		
		$(_GM[fl]).each(function(i){
			if(pName&&pName.indexOf(_GM[fl][i])>=0){
				if(pName&&pName.indexOf('/info/on-bbs-view.html?type=22')>=0){
					_fl = '';
				}else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=23')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=24')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=25')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=26')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=27')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=28')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=29')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=30')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=31')>=0){
					_fl = '';
			    }else if(pName&&pName.indexOf('/info/on-bbs-list.html?type=13')>=0){
					_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-list.html?type=11')>=0){
					_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=13')>=0){
					_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=5')>=0){
			    	_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=6')>=0){
					_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=7')>=0){
			    	_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=8')>=0){
			    	_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=9')>=0){
					_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=10')>=0){
			    	_fl = 'a_tzgl';
			    }else if(pName&&pName.indexOf('/info/on-bbs-view.html?type=11')>=0){
			    	_fl = 'a_tzgl';
			    }else{
					_fl = fl;
				}
				
			}
		});
	}
	
	return _fl;
}

/**
 * 根据项目的状态ID查询状态显示名称以及按钮的class，返回对象形似：{statusTxt:'',bClassName:''}
 */
Sys.getStatusNameById = function(sId,isInner){
	
	/*if(isInner){
		return {
			statusTxt : '我要出借',
			bClassName : 'ban_button_default',
			showCountDown : 'show'
		};
	}*/
	var o = {
		statusTxt : '',
		bClassName : 'ban_button_default'
	};
	
	if(sId >= 1 && sId <= 30){
		o = {
				statusTxt : '即将发布',
				bClassName : 'ban_button_operate',
				showCountDown : 'show'
			};
	}else if(sId === 40){
		o = {
				statusTxt : '我要出借',
				bClassName : 'ban_button_hilite',
				showCountDown : 'show'
			};
	}else if(sId === 50 || sId === 60 || sId === 70){
		o = {
				statusTxt : '满标',
				bClassName : 'ban_button_default',
				showCountDown : 'end'
			};
	}else if(sId === 80 || sId === 90){
		o = {
				statusTxt : '还款中',
				bClassName : 'ban_button_default',
				showCountDown : 'no'
			};
	}else if(sId === 999){
		o = {
				statusTxt : '已结清',
				bClassName : 'ban_button_default',
				showCountDown : 'no'
			};
	}else if(sId === -1){
		o = {
				statusTxt : '流标',
				bClassName : 'ban_button_default',
				showCountDown : 'no'
			};
	}
	
	return o;
}

Sys.countDown = function(){
	var diffObj = {};
	setInterval(function(){
		$("._refreshDate").each(function(i){
			var extra = $(this).attr('extra');
			if(extra=='end'){
				$(this).html('已截止');
			}else if(extra=='no'){
				$(this).html('');
			}else{
				$(this).html(Sys.formatTime(Sys.countDownTime($(this).attr('name'))));
				/*var k = $(this).attr('name');
				if(!diffObj[i]){
					diffObj[i] = parseInt(k) - serverTime().getTime();
				}
				diffObj[i] = diffObj[i] - 1000;
				$(this).html(Sys.formatTime(_parseDateDiff(diffObj[i])));*/
			}
		});
	}, 1000);
	
	function _parseDateDiff(diff){
		if(diff<=0) return diff;
		var days = 0; 
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		
		if(diff>0){
			days = Math.floor(diff/(24*3600*1000));
			diff = diff%(24*3600*1000)
		}
		
		if(diff>0){
			hours = Math.floor(diff/(3600*1000));
			diff = diff%(3600*1000)
		}
		
		if(diff>0){
			minutes = Math.floor(diff/(60*1000));
			diff = diff%(60*1000)
		}
		
		if(diff>0){
			seconds = Math.floor(diff/1000);
			diff = diff%1000
		}
		
		return { days: days, hours: hours, minutes: minutes, seconds: seconds };
	}
}

/**
 * 项目类型映射表
 */
Sys.ProTypeMapping = {
		1 : '工程贷',
		2 : '银票贷',
		3 : '商票贷',
		4 : '债权转让',
		5 : '新手标',
		8 : '员工宝'
}

/**
 *项目类型、样式及名称对应表
 */
Sys.getProType = function(type,flag,isCredit){
	
	
	if(isCredit){
		return {
				cls :'ban_project_icon_attorn',
				clsSmall : 'ban_project_icon_attorn',
				name : '债权转让',
				firstWord : '转',
				type : 2,
				//base : type===3||type===4?3:1//服务于credit-assign页面
			};
	}
	var s ;
	
	switch (type) {
	case 3://服务于credit-assign页面
	case 4://服务于credit-assign页面
	/*case 6:
		s = {
			type:3,
			cls : 'ban_project_icon_bhb',
			name : '班汇宝',
			firstWord:'宝'
		};
		break;*/
	default://工程贷
		switch (true) {
		case flag===32:
			s = {
				cls : 'ban_project_icon_new ban_project_icon_yuan_color',
				clsSmall : 'ban_project_icon_gcd ban_project_icon_yuan_color',
				name : '员工宝'
			};
			break;
		case (flag & 0x0001) !== 0 :
			s = {
				cls : 'ban_project_icon_new ban_page_list_icon',
				clsSmall : 'ban_project_icon_new ',
				name : '新手标'
			};
			break;
		default:
			s = {
				cls : 'ban_project_icon_gcd ban_page_list_icon',
				clsSmall : 'ban_project_icon_gcd',
				name : '工程贷'
			};
		}
	
		s.type = 1;//服务于credit-assign页面
	}
	
	return s;
}

/**
 * 用户状态映射表
 */
Sys.UserStatusMapping = {
		0 : '未开户',
		4 : '未实名认证',
		5 : '已实名认证',
		6 : '已绑定提现卡'
}

/**
 * 还款情况状态映射表
 */
Sys.UserBonusMapping = {
		0 : '待还',
		1 : '已还',
		2 : '部分还',
		3 : '逾期',
		4 : '展期'
}

/**
 * 班汇宝还款计划类型映射表
 */
Sys.BhbBonusMapping = {
		0 : '利息',
		1 : '本金',
		2 : '普通资金期间分红',
		3 : '第三方担保资金期间分红',
		4 : '普通资金本金',
		5 : '普通资金收益',
		6 : '第三方担保资金本金',
		7 : '第三方担保资金补贴',
		8 : '普通资金盈余分红',
	    9 : '第三方担保资金盈余分红'
}

/***
 * 性别映射
 */
Sys.SexMapping = {
		1 : '男',
		2 : '女'
}

/**
 * 将long类型的money转换成数组，第一个元素是整数部分，第二个部分是小数部分
 */
Sys.money2Array = function(m){
	
	if(!m) return ['0','00'];
	
	m = Sys.formatNumber(m,true,2);
	m = m.split('.');
	
	return m;
}

/**
 * 跳转到指定页面
 * url 待跳转URL
 * exp 不需要跳转的页面 Array
 * inc 需要跳转的页面 Array，当此项不为null时忽视exp参数
 * **/
Sys.toUrl = function(url,exp,inc){
	var currUrl = window.location.href,toGo = true;
	exp = !!inc?null:exp;
	if(exp){
		$(exp).each(function(i,p){
			if(currUrl.indexOf(p)>=0){
				toGo = false;
			}
		});
	}
	if(inc){
		toGo = false;
		$(inc).each(function(i,p){
			toGo = toGo||currUrl.indexOf(p)>=0
		});
	}
	var currPath = currUrl.substring(0,currUrl.lastIndexOf("/")+1);
	if(currUrl!=Sys.mergeUrl(currPath,url)&&toGo){
		window.location.assign(url);
	}
}

Sys.mergeUrl = function(u1,u2){
	
	var len = 0;
	while(u2.indexOf('../')==0){
		len++;
		u2 = u2.replace('../','');
	}
	u1 = (u1.lastIndexOf('/')==u1.length-1)?u1.substring(0,u1.length-1):u1;
	while(len>0&&u1.indexOf('/')>=0){
		u1 = u1.substring(0,u1.lastIndexOf('/'));
		len--;
	}
	return u1+'/'+u2;
}
/**
 * 获取跳转地址
 * srvPath 服务根地址
 * userType 用户类型，1个人，2机构
 * userStatus 用户状态
 * cb 回调函数，参数url=跳转的地址，data2=银联信息
 * **/
Sys.getRedirectUrl = function(userType,userStatus,cb,errorCb){
	
	var _getSysUrl = function(ut,us){
		var u = "";
		/*if(ut==2&&us==0){  //原来针对机构注册跳转的，现在不需要了，只有注册了直接登录
			u = "/regist-org.html?st=4";
		}*/
		return u;
	}
	var url = _getSysUrl(userType,userStatus);
	//userStatus ==3代表已经江西银行存管开户了，进入账户首页-资产概况页面;若userStatus==2，url会返回""空，进入/account/accountment.html 立即开通银行开户操作
	
	if(url==""&&userStatus!=2){
		url = "/account/accountment.html";
	}
	
	if(typeof cb == "function"){
		cb(url);
	}
}

Sys.isIE = !+[1,];

Sys.params2JSON = function(){
	
	var r = {},ser = window.location.search,ser = decodeURI(ser);
	if(!ser||ser=='') return null;
	ser = ser.substring(1);
	
	var sArr = ser.split('&');
	$(sArr).each(function(i,str){
		if(str.indexOf('=')>0) {
			var strArr = str.split('=');
			r[strArr[0]] = strArr[1];
		}
	});
	return r;
}

/**
 * 获取剩余天数
 * et 结束时间
 * st 开始时间，为空则为当前时间
 */
Sys.getBorrowDays = function(et,st){
	var currDate = new Date();
	if(typeof serverTime === 'function'){
		currDate = serverTime();
	}
	
	var ett = new Date(et);
	var stt = st?new Date(st):currDate;
	
	return Sys.truncLocalDay(ett,stt);
}

/**
 * 根据标价计算年化收益
 * unpaidAmt 待收本息
 * bj 转让标价
 * daysRemaining 剩余借款天数
 */
Sys.getLl = function(unpaidAmt,bj,daysRemaining){
	var moneyTemp = unpaidAmt - bj ;
    var v = daysRemaining*bj==0?0:(moneyTemp>=0?(moneyTemp*365*100/(daysRemaining*bj)).toFixed(2):0.00);
    return v;
}
/**
 * 根据折算年化收益计算标价
 * unpaidAmt 待收本息
 * ll 折算年化收益
 * daysRemaining 当前剩余还本天数(剩余借款天数)
 */
Sys.getBj = function(unpaidAmt,ll,daysRemaining){
	
	var v = (365*100*unpaidAmt/(daysRemaining*ll+365*100)).toFixed(2);
	return v;
}

/**
 * 根据数字返回协议数组
 */
Sys.getContractsByNum = function(num){
	
	var cts = [{
		name : '出借居间协议',
		url : '/export/invest_jujian.pdf'
	},{
		name : '借款协议',
		url : '/export/loan.pdf'
	},{
		name : '应收账款质押合同',
		url : '#'
	}];
	
	var numArr = getArrIndex(num),objs = [];
	for(var i=0;i<numArr.length;i++){
		objs.push(cts[numArr[i]]||{});
	}
	return objs;
	
	function getArrIndex(num){
		
		var numArr=[],i=0;
		while(true){
			if(num%2==1) numArr.push(i);
			num = parseInt(num/2);
			i++;
			
			if(num==0){
				break;
			}
		}
		return numArr;
	}
}

function submitJXForm(formId, formParam){
	var form = $('#' + formId);
	if(!form || form.length == 0){
		throw new Error('Cannot find form[id=' + formId + ']');
	}
	
	//console.log('Submit form "' + formId + '", data=' + formParam);
	
	form.empty();
	if(formParam){
		window.log('URL: ' + formParam['FORM_ACTION']);
		window.log('**** FORM DATA ****');
		for(var k in formParam){
			v = formParam[k];
			if (k === 'FORM_ACTION') {
				form.attr('action', v);
			} else {
				var el = $('input[name="' + k + '"]', form);
				if (el.length === 0) {
					el = $('<input name="' + k + '" type="hidden" />');
					el.appendTo(form);
				}
				el.val(v);
				window.log(k + ':[' + v + ']');
			}
		}
		window.log('*******************');
	}
	form.submit();
}

function showJXDialog(title,success,failure){
	dialog({
    	    id: "withdrawDialog",
    	    title: "转到存管银行平台-"+title, 
    	    content: "请您在新打开的存管银行页面进行"+ title +"，"+ title +"完成前请不要关闭该窗口。",
    	    skin: "facebook",
    	    lock: true, 
    	    button: [
    	        {
    	            value: title+"成功",
    	            callback: function(){
    	            	Sys.infoDlg('<span style="font-weight: bold;color: red;">请关闭刚才操作的存管银行界面，再进行下一步操作！</span>',null,function(){
    	            		if(success){
    	            			success();
    	            		}
    	            		window.open('','_new').close();
    	            	});
    	            },
    	            autofocus: true
    	        },
    	        {
    	            value: title+"失败",
    	            callback: function () {
    	            	Sys.infoDlg('<span style="font-weight: bold;color: red;">请关闭刚才操作的存管银行界面，再进行下一步操作！</span>',null,function(){
    	            		if(failure){
    	            			failure();
    	            		}
    	            		window.open('','_new').close();
    	            	});
    	            }
    	        }
    	    ]
    	}).showModal();
}



/**
 * 获取手机验证码按钮效果
 */
Sys.vCodeCountDown = function(btn,maxTime){
	var ct = maxTime||60,t = setInterval(_ct, 1000),text = btn.html();
	_ct();
	function _ct(){
		if(ct==0){
			btn.html(text).addClass('ban_infobox_inbutton').removeClass('ban_infobox_default');
			clearInterval(t);
		}else{
			btn.html(ct+'秒后重试').addClass('ban_infobox_default').removeClass('ban_infobox_inbutton');
		}
		ct--;
	}
}
/**
 * 获取手机验证码按钮效果
 */
Sys.vCodeCountDownForBhb = function(btn,maxTime){
	var ct = maxTime||60,t = setInterval(_ct, 1000),text = btn.html();
	_ct();
	function _ct(){
		if(ct==0){
			btn.html(text).addClass('ban_button_hilite').removeClass('ban_button_default');
			clearInterval(t);
		}else{
			btn.html(ct+'秒后重试').addClass('ban_button_default').removeClass('ban_button_hilite');
		}
		ct--;
	}
}

Sys.formatRate = function(n){
	
	n = Sys.formatNumber(n,true,2);
	n = n.split('.');
	return n[1]=='00'?n[0]:n.join('.');
}

Sys.formatMobile = function(p){
	return p.substring(0,3)+'****'+p.substring(7,11);
}

Sys.isDateInDays = function(t,d){
	var currDate = new Date();
	if(typeof serverTime === 'function'){
		currDate = serverTime();
	}
	
	var dt = new Date(t);
	var dt2 = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()+d);
	
	var ct = currDate;
	var ct2 = new Date(ct.getFullYear(),ct.getMonth(),ct.getDate());
	
	return dt2.getTime()>ct2.getTime();
}

Sys.getPrjStatusNameInBhb = function(sId){
	
	switch (sId) {
	case -1:
		return '流标';
	case 1:
		return '募集中';
	case 2:
		return '满标';
	case 3:
		return '已转让';
	case 4:
		return '还款中';
	case 5:
		return '已结清';

	default:
		return '';
	}
}

Sys.getPureDateTime = function(d){
	
	var y = d.getFullYear();
	var m = d.getMonth();
	var d = d.getDate();
	
	return new Date(y,m,d).getTime();
}

/**
 * @param r 利率
 * @param type 大于24时显示方式
 * @param s bhb项目状态，不论哪个状态（存续还是已结清若利率小于0，图上都不体现，画图只画到0）
 */
Sys.formatBhbRate = function(r,type,s){
	
	if((!r||r<0)) return 0;
	else if(r>24){
		if(type=='small'){
			return '大于24';
		}else{
			return '<i style="font-size:24px">大于</i>24';
		}
	}else return parseFloat(r.toFixed(2));
}

/**
 * 班汇宝融资金额格式化，如果是整数，原样显示；如果有小数，保留两位小数。实例：33.bhbAmt()
 */
Number.prototype.bhbAmt = function(){
	var dec ;
	if(this%1==0) dec = 0;
	else{
		if(this*10%1==0) dec = 1;
		else dec = 2;
	}
	
	return Sys.formatNumber(this,true,dec);
}


Sys.getJxpayResponseCode = function(code){
	switch (code) {
	case '0000':
		return '操作成功';
	case '0001':
		return '脱机认证已提交，请于3个工作日后查询结果';
	case '1111':
		return '未认证';
	case '2222':
		return '认证已提交，正在处理中';
	case '9999':
		return '认证失败,请稍后重试';
	case '9900':
		return '认证失败,请联系发卡行';
	case '9901':
		return '无效的发卡行';
	case '9902':
		return '无效交易';
	case '9903':
		return '无效金额';
	case '9904':
		return '无效卡号';
	case '9905':
		return '客户取消交易';
	case '9906':
		return '无效交易响应';
	case '9907':
		return '此卡已过期';
	case '9908':
		return '密码错误';
	case '9909':
		return '余额不足';
	case '9910':
		return '未开通此功能';
	case '9911':
		return '交易异常,请联系发卡行';
	case '9912':
		return '超出金额限制';
	case '9913':
		return '此卡受限制,请联系发卡行';
	case '9914':
		return '超出取款次数限制';
	case '9915':
		return '超出最大输入密码次数,请联系发卡行';
	case '9916':
		return '交易超时,请重试';
	case '9917':
		return '交易重复,请稍后查询结果';
	case '9918':
		return '密码格式错误';
	case '9919':
		return '银行卡与姓名不符';
	case '9920':
		return '银行卡与证件不符';

	default:
		return '';
	}
	
}

/**
 * 项目类型映射表
 */
Sys.jxTenderStatusMapping = {
	1 : '募集中',
	2 : '还款中',
	4 : '已结清',
	9 : '已撤销'
}

//限额弹窗说明
Sys.getBankCardInfo = function(bankId){
	var bcInfo={};
	
	switch (bankId) {
	case 'bank-gs':
		bcInfo = {
			id : bankId,
			bank : "工商",
			info:[{
                type: "柜面注册存量静态支付密码客户",
                single: "300",
                oneDay: "300"
            },
            {
                type: "电子银行口令卡——无需开通短信认证",
                single: "500",
                oneDay: "500"
            },
            {
                type: "电子银行口令卡——需开通短信认证",
                single: "2000",
                oneDay: "5000"
            },
            {
                type: "办理U盾",
                single: "100万",
                oneDay: "100万"
            }],
			num : 95588
		};
		break;
	case 'bank-zs':
		bcInfo = {
			id : bankId,
	        bank: "招商",
	        info: [{
	                type: "大众版网银",
	                single: "500",
	                oneDay: "500"
	            },
	            {
	                type: "专业版网银",
	                single: "单笔无限额、单日无限额",
	                oneDay: "单笔无限额、单日无限额"
	            }],
	        num:95555
		};
		break;
	case 'bank-zg':
		bcInfo = {
			id : bankId,
	        bank: "中国",
	        info: [{
	                type: "开通手机验证码",
	                single: "5000",
	                oneDay: "5000"
	            },
	            {
	                type: "开通动态口令卡+短信",
	                single: "50万",
	                oneDay: "50万"
	            },
	            {
	                type: "开通U-Key +短信",
	                single: "350万",
	                oneDay: "350万"
	            }],
	        num:95566
		};
		break;
	case 'bank-ny':
		bcInfo = {
			id : bankId,
	        bank: "农行",
	        info: [{
	                type: "网上银行IE证书+动态口令卡客户",
	                single: "1000",
	                oneDay: "3000"
	            },
	            {
	                type: "K令客户 ",
	                single: "10万",
	                oneDay: "50万"
	            },
	            {
	                type: "开通一代K宝",
	                single: "50万",
	                oneDay: "100万"
	            },
	            {
	                type: "开通二代K宝",
	                single: "100万",
	                oneDay: "500万"
	            }],
	        num:95595
		};
		break;
	case 'bank-ms':
		bcInfo = {
			id : bankId,
	        bank:"民生",
	        info:[{
	                type: "无证书客户（个人网上银行大众版）",
	                single: "300",
	                oneDay: "300"
	            },
	            {
	                type: "办理短信验证码或者浏览器证书 ",
	                single: "5000",
	                oneDay: "5000"
	            },
	            {
	                type: "办理OTP或者U宝",
	                single: "20万",
	                oneDay: "50万"
	            }],
	        num:95568
		};
		break;
	case 'bank-pa':
		bcInfo = {
			id : bankId,
	        bank:"平安",
	        info:[{
	                type: "开通网上银行一账通用户（可自助注册）",
	                single: "自行设置，单日500万元",
	                oneDay: "自行设置，单日500万元"
	            },
	            {
	                type: "到柜台办理Ukey",
	                single: "自行设置，单日1亿元",
	                oneDay: "自行设置，单日1亿元"
	            }],
	        num: "95511-3"
		};
		break;
	case 'bank-pf':
		bcInfo = {
			id : bankId,
	        bank:"浦发",
	        info:[{
	                type: "开通动态密码版网上支付功能",
	                single: "20万",
	                oneDay: "20万"
	            },
	            {
	                type: "开通数字证书版网上支付功能",
	                single: "自行设置，无限额",
	                oneDay: "自行设置，无限额"
	            }],
	        num: "95528"
		};
		break;
	case 'bank-js':
		bcInfo = {
			id : bankId,
	        bank:"建设",
	        info:[{
	                type: "手机验证码支付",
	                single: "500",
	                oneDay: "500"
	            },
	            {
	                type: "办理动态口令",
	                single: "5000",
	                oneDay: "5000"
	            },
	            {
	                type: "一代网银盾用户",
	                single: "5万",
	                oneDay: "10万"
	            },
	            {
	                type: "二代网银盾用户",
	                single: "50万",
	                oneDay: "50万"
	            }],
	        num:95533
		};
		break;
	case 'bank-xy':
		bcInfo = {
			id : bankId,
	        bank:"兴业",
	        info:[{
	                type: "网上开通短信口令的用户",
	                single: "5000",
	                oneDay: "5000"
	            },
	            {
	                type: "银行卡开通动态令牌保护的用户",
	                single: "100万",
	                oneDay: "100万"
	            },
	            {
	                type: "开通证书保护的用户",
	                single: "100万",
	                oneDay: "100万"
	            },
	            {
	                type: "柜台开通短信口令的用户",
	                single: "100万",
	                oneDay: "100万"
	            }],
	        num:95561
		};
		break;
	case 'bank-yz':
		bcInfo = {
			id : bankId,
	        bank: "邮政",
	        info:[{
	            type: "开通银行手机短信服务",
	            single: "1万",
	            oneDay: "1万"
	        },
	        {
	            type: "办理电子令牌+手机短信服务",
	            single: "20万",
	            oneDay: "20万"
	        },
	        { 
	            type: "办理USB-Key+手机短信服务",
	            single: "200万",
	            oneDay: "200万"
	        }],
	        num:95580
		};
		break;
	case 'bank-jt':
		bcInfo = {
			id : bankId,
	        bank: "交通",
	        info:[{
	            type: "开通短信密码",
	            single: "20万",
	            oneDay: "20万"
	        },
	        {
	            type: "开通Ukey",
	            single: "100万",
	            oneDay: "100万"
	        }],
	        num:95559
		};
		break;
	case 'bank-zx':
		bcInfo = {
			id : bankId,
	        bank: "中信",
	        info:[{
	            type: "办理文件证书",
	            single: "5000",
	            oneDay: "5000"
	        },
	        {
	            type: "下载手机APP",
	            single: "5万（可调整为单日50万）",
	            oneDay: "5万（可调整为单日50万）"
	        },
	        { 
	            type: "到柜台办理Key证书",
	            single: "自行设置，无限额",
	           oneDay: "自行设置，无限额"
	        }],
	        num:95558
		};
		break;
	case 'bank-bh':
		bcInfo = {
			id : bankId,
	        bank: "渤海",
	        info:[{
	            type: "普通网银转账",
	            single: "10万",
	            oneDay: "10万"
	        },
	        {
	            type: "开通Ukey",
	            single: "2000万",
	            oneDay: "2000万"
	        },
	        { 
	            type: "手机APP跨行转账",
	            single: "10万",
	           oneDay: "10万"
	        }],
	        num:95541
		};
		break;
	case 'bank-nb':
		bcInfo = {
			id : bankId,
	        bank: "宁波",
	        info:[{
	            type: "办理快速通道电子支付密码",
	            single: " 300",
	            oneDay: "300"
	        },
	        {
	            type: "办理动态密码牌/短信动态密码",
	            single: "20万",
	            oneDay: "20万"
	        },
	        { 
	            type: "办理USBKey移动证书",
	            single: "自行设置，无限额",
	           oneDay: "自行设置，无限额"
	        }],
	        num:95574
		};
		break;
	case 'bank-wz':
		bcInfo = {
			id : bankId,
	        bank: "温州",
	        info:[{
	            type: "大众版网银",
	            single: " 300",
	            oneDay: "300"
	        },
	        {
	            type: "大众版网银并办理手机验证码",
	            single: "800",
	            oneDay: "800"
	        },
	        { 
	            type: "专业版网银",
	            single: "自行设置",
	           oneDay: "自行设置"
	        }],
	        num:96699
		};
		break;
	case 'bank-sh':
		bcInfo = {
			id : bankId,
	        bank: "上海",
	        info:[{
	            type: "办理动态密码版个人网银（含文件证书）",
	            single: " 6000",
	            oneDay: "6000"
	        },
	        {
	            type: "办理E盾证书专业版个人网银 ",
	            single: "200万",
	            oneDay: "200万"
	        }],
	        num:95594
		};
		break;
	case 'bank-gd':
		bcInfo = {
			id : bankId,
	        bank: "光大",
	        info:[{
	            type: "办理手机动态密码",
	            single: "10万",
	            oneDay: "10万"
	        },
	        {
	            type: "办理阳光网盾",
	            single: "自行设置，500万以上柜台申请",
	            oneDay: "自行设置，500万以上柜台申请"
	        },
	        { 
	            type: "令牌动态密码",
	            single: "自行设置，500万以上柜台申请",
	            oneDay: "自行设置，500万以上柜台申请"
	        }],
	        num:95599
		};
		break;
	
	}
	
	return bcInfo;
};


/**
 * 根据type获取资金类型展示名称以及资金字段
 */
Sys.getHistoryIncomeItem = function(type){
	var item = {};
	
	if(type===1||type===4||type===5||type===8||type===21){
		item = {
				name : '收入',
				field:'creditAmt'
		}
	}else if(type===2||type===3||type===6||type===7||type===14||type===15||type===18){
		item = {
				name : '支出',
				field:'debitAmt'
		}
	}
	
	return item;
}

/**
 * 根据jx给出的描述转化为系统自己的描述
 * 
 */
Sys.getTradeInstuctionByJxDesc = function(desc){
	var instruction = '';
	if(desc === '资金转入-ChinaPay'){
		instruction = '在线充值';
		
	}else if(desc === '资金转入'){
		instruction = '转账充值';
		
	}else if(desc === '资金转出'){
		instruction = '提现';
		
	}else if(desc === 'P2P融资扣款'){
		instruction = '投标';
		
	}else if(desc === 'P2P到期收益手续费' || desc === 'P2P债权转让资金转入手续费'){
		instruction = '服务费';
		
	}else if(desc === 'P2P到期收益'){
		instruction = '还款';
		
	}else if(desc === 'P2P债权转让资金转入' || 'P2P债权转让资金转出'){
		instruction = '债权转让';
		
	}else if(desc === '红包入账转入'){
		instruction = '商户转账';
		
    }else{
		instruction = desc;
	}
	return instruction;
}




