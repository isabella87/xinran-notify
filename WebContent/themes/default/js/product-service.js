"use strict";

//worker
//var UploadWorkerService = function() {
//    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/maintenance-worker',uploadWorkerInfo.p,uploadWorkerInfo.m.toUpperCase());
//};
//Object.extends(UploadWorkerService, Sys.service.BaseService);
//Sys.service.register('UploadWorkerService', UploadWorkerService);
//
//var UploadWorkerFileService = function() {
//    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/maintenance-worker/file',uploadWorkerFileInfo.p,uploadWorkerFileInfo.m.toUpperCase());
//};
//Object.extends(UploadWorkerFileService, Sys.service.BaseService);
//Sys.service.register('UploadWorkerFileService', UploadWorkerFileService);

var ApplyWorker = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '//maintenance-worker',ApplyWorkerInfo.p,ApplyWorkerInfo.m.toUpperCase());
};
Object.extends(ApplyWorker, Sys.service.BaseService);
Sys.service.register('ApplyWorker', ApplyWorker);

var WorkerService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/list',WorkerInfo);
}
Object.extends(WorkerService, Sys.service.BaseService);
Sys.service.register('WorkerService', WorkerService);

var AllWorkerService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/list?pn='+ page.curr+(page.isMainPage?'&isMainPage=true':''));
}
Object.extends(AllWorkerService, Sys.service.BaseService);
Sys.service.register('AllWorkerService', AllWorkerService);

var TopWorkerService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/top');
}
Object.extends(TopWorkerService, Sys.service.BaseService);
Sys.service.register('TopWorkerService', TopWorkerService);

var WorkerDetail = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/'+WorkerDetailInfo.mmId);
}
Object.extends(WorkerDetail, Sys.service.BaseService);
Sys.service.register('WorkerDetail', WorkerDetail);

var WorkerDelService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/'+WorkerDetailInfo.mmId+'/del','POST');
};
Object.extends(WorkerDelService, Sys.service.BaseService);
Sys.service.register('WorkerDelService', WorkerDelService);

var WorkerUpService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/'+WorkerDetailInfo.mmId+'/up','POST');
};
Object.extends(WorkerUpService, Sys.service.BaseService);
Sys.service.register('WorkerUpService', WorkerUpService);

var WorkerDownService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/maintenance-worker/'+WorkerDetailInfo.mmId+'/down','POST');
};
Object.extends(WorkerDownService, Sys.service.BaseService);
Sys.service.register('WorkerDownService', WorkerDownService);


//商品服务
var UploadProductService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/major-product',uploadProductInfo.p,uploadProductInfo.m.toUpperCase());
};
Object.extends(UploadProductService, Sys.service.BaseService);
Sys.service.register('UploadProductService', UploadProductService);

var UploadProductFileService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/major-product/file',uploadProductFileInfo.p,uploadProductFileInfo.m.toUpperCase());
};
Object.extends(UploadProductFileService, Sys.service.BaseService);
Sys.service.register('UploadProductFileService', UploadProductFileService);

var MajorProductService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-product/list',productInfo);
}
Object.extends(MajorProductService, Sys.service.BaseService);
Sys.service.register('MajorProductService', MajorProductService);

var AllMajorProductService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-product/list?pn='+ page.curr+(page.isMainPage?'&isMainPage=true':''));
}
Object.extends(AllMajorProductService, Sys.service.BaseService);
Sys.service.register('AllMajorProductService', AllMajorProductService);

var ProductDetail = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-product/'+productDetailInfo.mpId);
}
Object.extends(ProductDetail, Sys.service.BaseService);
Sys.service.register('ProductDetail', ProductDetail);

var ProductDelService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-product/'+productDetailInfo.mpId+'/del','POST');
};
Object.extends(ProductDelService, Sys.service.BaseService);
Sys.service.register('ProductDelService', ProductDelService);

var ProductUpService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-product/'+productDetailInfo.mpId+'/up','POST');
};
Object.extends(ProductUpService, Sys.service.BaseService);
Sys.service.register('ProductUpService', ProductUpService);

var ProductDownService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-product/'+productDetailInfo.mpId+'/down','POST');
};
Object.extends(ProductDownService, Sys.service.BaseService);
Sys.service.register('ProductDownService', ProductDownService);

//维修服务
var ApplyService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+ '/major-service',ApplyServiceInfo.p,ApplyServiceInfo.m.toUpperCase());
};
Object.extends(ApplyService, Sys.service.BaseService);
Sys.service.register('ApplyService', ApplyService);

var MajorTopTenService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-service/top','GET');
}
Object.extends(MajorTopTenService, Sys.service.BaseService);
Sys.service.register('MajorTopTenService', MajorTopTenService);

var MajorServiceService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-service/list',serviceInfo);
}
Object.extends(MajorServiceService, Sys.service.BaseService);
Sys.service.register('MajorServiceService', MajorServiceService);

var ServiceDetail = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-service/'+serviceDetailInfo.msId);
}
Object.extends(ServiceDetail, Sys.service.BaseService);
Sys.service.register('ServiceDetail', ServiceDetail);

var SubmitService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-service/'+serviceDetailInfo.msId+'/submit','POST');
};
Object.extends(SubmitService, Sys.service.BaseService);
Sys.service.register('SubmitService', SubmitService);

var CompletedService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-service/'+serviceDetailInfo.msId+'/completed',serviceDetailInfo,'POST');
};
Object.extends(CompletedService, Sys.service.BaseService);
Sys.service.register('CompletedService', CompletedService);

var AcceptService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/major-service/'+serviceDetailInfo.msId+'/accept',serviceDetailInfo,'POST');
};
Object.extends(AcceptService, Sys.service.BaseService);
Sys.service.register('AcceptService', AcceptService);

//订单服务
var CreateOrderService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order',ProductDetailInfoForOrder.p,'PUT');
};
Object.extends(CreateOrderService, Sys.service.BaseService);
Sys.service.register('CreateOrderService', CreateOrderService);

var OrderService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order/list',orderInfo);
}
Object.extends(OrderService, Sys.service.BaseService);
Sys.service.register('OrderService', OrderService);

var OrderDetail = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order/'+orderDetailInfo.poId);
}
Object.extends(OrderDetail, Sys.service.BaseService);
Sys.service.register('OrderDetail', OrderDetail);

var OrderDelService = function() {
    Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order/'+orderDetailInfo.poId+'/del','POST');
};
Object.extends(OrderDelService, Sys.service.BaseService);
Sys.service.register('OrderDelService', OrderDelService);

var OrderSubmitService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order/'+orderDetailInfo.poId+'/submit','POST');
};
Object.extends(OrderSubmitService, Sys.service.BaseService);
Sys.service.register('OrderSubmitService', OrderSubmitService);

var OrderDownService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order/'+orderDetailInfo.poId+'/down','POST');
};
Object.extends(OrderDownService, Sys.service.BaseService);
Sys.service.register('OrderDownService', OrderDownService);

var OrderPayService = function() {
	Sys.service.BaseService.call(this, Sys.config.xrSrvUrl+'/product-order/'+orderDetailInfo.poId+'/pay','POST');
};
Object.extends(OrderPayService, Sys.service.BaseService);
Sys.service.register('OrderPayService', OrderPayService);


