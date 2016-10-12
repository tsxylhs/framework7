var managerPageModule=(function(){
	function btnState(){
		if(document.querySelector("#currentPage").textContent==1){
			document.querySelector("#prePage").disabled=true;
			document.querySelector("#firstPage").disabled=true;
		}
		if(document.querySelector("#currentPage").textContent==document.querySelector("#totalPage").textContent){
			document.querySelector("#nextPage").disabled=true;
			document.querySelector("#lastPage").disabled=true;
		}
	}
	function forward(url,currentPage,keyword){
		window.location.href=arguments[0]+'&currentPage='+arguments[1]+'&keyword='+arguments[2];
	}
	function init(url){
		let keyword=document.querySelector("#keyword").value;
		btnState();
		document.querySelector("#nextPage").addEventListener("click",()=>{
			forward(url,parseInt(document.querySelector("#currentPage").textContent)+1,keyword)
			btnState();
		},false);
		document.querySelector("#prePage").addEventListener("click",()=>{
			forward(url,parseInt(document.querySelector("#currentPage").textContent)-1,keyword);
			btnState();
		},false);
		document.querySelector("#firstPage").addEventListener("click",()=>{
			forward(url,1,keyword);
			btnState();
		},false);
		document.querySelector("#lastPage").addEventListener("click",()=>{
			forward(url,document.querySelector("#totalPage").textContent,keyword);
			btnState();
		},false);
		document.querySelector("#jumpPage").addEventListener("change",()=>{
			forward(url,document.querySelector("#jumpPage").value,keyword);
			btnState();
		},false);
		document.querySelector("#btn_jumpPage").addEventListener("click",()=>{
			let page=document.querySelector("#input_page").value;
			if(page>document.querySelector("#totalPage").textContent){
				alert("输入的页数非法！");
				forward(url,document.querySelector("#totalPage").textContent,keyword);
			}else if(page<1){
				alert("输入的页数非法！");
				forward(url,1,keyword);
			}else{
				forward(url,document.querySelector("#input_page").value,keyword);
				btnState();
			}
		},false);
		//查询
		document.querySelector("#btn_query").addEventListener("click",()=>{
			window.location.href="user.servlet?param=init&keyword="+document.querySelector("#keyword").value;
		},false);
	}
	return{
		init:init
	};
})();