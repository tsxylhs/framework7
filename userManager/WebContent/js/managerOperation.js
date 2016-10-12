var managerOperationModule=(function(){
	let url="";
	function selectAll(){
		let all=document.querySelector("#all");
		let checks=document.getElementsByName("id_check");
		for(let i=0,len=checks.length;i<len;i++){
			if(all.checked==true){
				checks[i].checked=true;
			}else{
				checks[i].checked=false;
			}
		}
	}
	function deleteObject(){
		let checks=document.getElementsByName("id_check");
		let param="";
		for(let i=0,len=checks.length;i<len;i++){
			if(checks[i].checked==true){
				if(param==""){
					param+=checks[i].id;
				}else{
					param+=",";
					param+=checks[i].id;
				}
			}
		}
		if(param==""){
			alert("请选择要删除的数据！");
		}else{
			window.location.href=url+"?param=doDelete&ids="+param;
		}
	}

	function init(base_url){
		this.url=base_url;
		document.querySelector("#btn_delete").addEventListener("click",deleteObject,false);
		document.querySelector("#all").addEventListener("change",selectAll,false);
	}
	return{
		init:init
	}
})();
