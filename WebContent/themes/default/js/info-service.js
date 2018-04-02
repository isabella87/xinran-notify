"use strict";


var AccInfoAllService = function(infoAllServiceInfo) {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/info/all?pn='+infoAllServiceInfo.pn);
}
Object.extends(AccInfoAllService, Sys.service.BaseService);
Sys.service.register('AccInfoAllService', AccInfoAllService);

var CreateCmNoticeService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info',CmNoticeDetailInfo.p,CmNoticeDetailInfo.m.toUpperCase());
};
Object.extends(CreateCmNoticeService, Sys.service.BaseService);
Sys.service.register('CreateCmNoticeService', CreateCmNoticeService);

var CmNoticeDelService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info/'+cmNoticeDetailInfo.cnId+'/del','POST');
};
Object.extends(CmNoticeDelService, Sys.service.BaseService);
Sys.service.register('CmNoticeDelService', CmNoticeDelService);

var CmNoticeSubmitService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info/'+cmNoticeDetailInfo.cnId+'/submit','POST');
};
Object.extends(CmNoticeSubmitService, Sys.service.BaseService);
Sys.service.register('CmNoticeSubmitService', CmNoticeSubmitService);

var CmNoticeReturnService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info/'+cmNoticeDetailInfo.cnId+'/down','POST');
};
Object.extends(CmNoticeReturnService, Sys.service.BaseService);
Sys.service.register('CmNoticeReturnService', CmNoticeReturnService);

var CmNoticeRevokeService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info/'+cmNoticeDetailInfo.cnId+'/revoke','POST');
};
Object.extends(CmNoticeRevokeService, Sys.service.BaseService);
Sys.service.register('CmNoticeRevokeService', CmNoticeRevokeService);

var CmNoticePublishService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info/'+cmNoticeDetailInfo.cnId+'/publish','POST');
};
Object.extends(CmNoticePublishService, Sys.service.BaseService);
Sys.service.register('CmNoticePublishService', CmNoticePublishService);

var CmNoticeaDetailService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/info/'+cmNoticeDetailInfo.cnId,'GET');
};
Object.extends(CmNoticeaDetailService, Sys.service.BaseService);
Sys.service.register('CmNoticeaDetailService', CmNoticeaDetailService);


var InfoService = function(type) {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/info/' + type + '/top');
};
Object.extends(InfoService, Sys.service.BaseService);

var Info4Service = function() {
    InfoService.call(this, 4);
}
Object.extends(Info4Service, InfoService);
Sys.service.register('Info4', Info4Service);

var Info0Service = function() {
    InfoService.call(this, 0);
}
Object.extends(Info0Service, InfoService);
Sys.service.register('Info0', Info0Service);

var Info7Service = function() {
    InfoService.call(this, 7);
}
Object.extends(Info7Service, InfoService);
Sys.service.register('Info7', Info7Service);

var Info6Service = function() {
    InfoService.call(this, 6);
}
Object.extends(Info6Service, InfoService);
Sys.service.register('Info6', Info6Service);

var Info2Service = function() {
    InfoService.call(this, 2);
}
Object.extends(Info2Service, InfoService);
Sys.service.register('Info2', Info2Service);

var Info3Service = function() {
    InfoService.call(this, 3);
}
Object.extends(Info3Service, InfoService);
Sys.service.register('Info3', Info3Service);

var InfoAllService = function(infoAllServiceInfo) {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/info/all?pn='+page.curr+'&type='+page.type +(page.isMainPage?'&isMainPage=true':''));
}
Object.extends(InfoAllService, InfoService);
Sys.service.register('InfoAllService', InfoAllService);

var InfoDetailService = function(infoDetailServiceInfo) {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+infoDetailServiceInfo.url);
}
Object.extends(InfoDetailService, InfoService);
Sys.service.register('InfoDetailService', InfoDetailService);

var IosAppUrlService = function(){
	Sys.service.BaseService.call(this,Sys.config.xrSrvUrl+ '/app/ios-app-url');
}
Object.extends(IosAppUrlService,Sys.service.BaseService);
Sys.service.register('IosAppUrl',IosAppUrlService);
