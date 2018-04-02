"use strict";
/**
 * 调用xrsrv开始
 */

var AccountService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account');
};
Object.extends(AccountService, Sys.service.BaseService);
Sys.service.register('Account', AccountService);

var SignOutService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account/sign-out', 'POST');
}
Object.extends(SignOutService, Sys.service.BaseService);
Sys.service.register('SignOut', SignOutService);


var SwitchSignOutService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account/sign-out', 'POST');
}
Object.extends(SwitchSignOutService, Sys.service.BaseService);
Sys.service.register('SwitchSignOut', SwitchSignOutService);

var AccSigin = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+'/account/sign-in',accSigninInfo,'POST');
};
Object.extends(AccSigin, Sys.service.BaseService);
Sys.service.register('AccSigin', AccSigin);

var RegService = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+regServiceInfo.action,regServiceInfo.params,regServiceInfo.method.toUpperCase());
};
Object.extends(RegService, Sys.service.BaseService);

Sys.service.register('RegService', RegService);

var RegSendOrgMobileCode = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+'/reg/send-corp-mobile-code',RegSendOrgMobileCodeInfo,'PUT');
};
Object.extends(RegSendOrgMobileCode, Sys.service.BaseService);

Sys.service.register('RegSendOrgMobileCode', RegSendOrgMobileCode);

var RegSendUserMobileCode = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+'/reg/send-user-mobile-code',regSendPersonMobileCodeInfo,'PUT');
};
Object.extends(RegSendUserMobileCode, Sys.service.BaseService);

Sys.service.register('RegSendUserMobileCode', RegSendUserMobileCode);

//个人及机构信息这个服务会通过userType 1个人 ，2机构 返回数据
var AccInfo = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account/user-info');
};
Object.extends(AccInfo, Sys.service.BaseService);
Sys.service.register('AccInfo', AccInfo);

var AccUpdateAccInfo = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account/user-info',accUpdateAccInfoParam,'POST');
};
Object.extends(AccUpdateAccInfo, Sys.service.BaseService);
Sys.service.register('AccUpdateAccInfo', AccUpdateAccInfo);

var AccUpdatePwd = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+ '/account/update-password',accUpdatePwdInfo,'POST');
};
Object.extends(AccUpdatePwd, Sys.service.BaseService);
Sys.service.register('AccUpdatePwd', AccUpdatePwd);

var AccUpdateMobile = function(accUpdatePwdInfo) {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account/update-mobile',accUpdateMobileInfo,'POST');
};
Object.extends(AccUpdateMobile, Sys.service.BaseService);
Sys.service.register('AccUpdateMobile', AccUpdateMobile);

var AccSendNewVcode = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/account/send-new-vcode',accSendNewVcodeInfo,'PUT');
};
Object.extends(AccSendNewVcode, Sys.service.BaseService);
Sys.service.register('AccSendNewVcode', AccSendNewVcode);

var SendLostPwdCode = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+'/account/send-lost-pwd-active-code',SendLostPwdCodeInfo,'PUT');
};
Object.extends(SendLostPwdCode, Sys.service.BaseService);

Sys.service.register('SendLostPwdCode', SendLostPwdCode);

var ResetPwd = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+'/account/reset-pwd',ResetPwdInfo,'POST');
};
Object.extends(ResetPwd, Sys.service.BaseService);

Sys.service.register('ResetPwd', ResetPwd);

var AccUpdateRecommendMobile = function() {
    Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+ '/account/recomm-info',accUpdateRecMobileInfo,'POST');
};
Object.extends(AccUpdateRecommendMobile, Sys.service.BaseService);
Sys.service.register('AccUpdateRecommendMobile', AccUpdateRecommendMobile);

var SurveyService = function() {
    Sys.service.BaseService.call(this, Sys.config.p2pSrvUrl+'/account/survey');
}
Object.extends(SurveyService, Sys.service.BaseService);
Sys.service.register('SurveyService', SurveyService);



