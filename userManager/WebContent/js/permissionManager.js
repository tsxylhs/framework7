(function(pageModule,operationModule){
	window.addEventListener("load",()=>{
		let base_url="permission.servlet";
		let page_url="permission.servlet?param=init";
		pageModule.init(page_url);
		operationModule.init(base_url);
	},false);
})(window.managerPageModule,window.managerOperationModule);