(function(pageModule,operationModule){
	window.addEventListener("load",()=>{
		let base_url="role.servlet";
		let page_url="role.servlet?param=init";
		pageModule.init(page_url);
		operationModule.init(base_url);
	},false);
})(window.managerPageModule,window.managerOperationModule);