(function(pageModule,operationModule){
	function updateRole(){
		let checks=document.getElementsByName("id_check");
		let param="";
		let count=0;
		for(let i=0,len=checks.length;i<len;i++){
			if(checks[i].checked==true){
				param+=checks[i].id;
				count++;
			}
		}
		if(count==0){
			alert("请选择要修改的数据！");
		}else if(count>1){
			alert("一次只能修改一行数据");
		}else if(count==1){
			window.location.href="userRole.servlet?param=update&id="+param;
		}		
	}
	function updateUser(){
		let checks=document.getElementsByName("id_check");
		let param="";
		let count=0;
		for(let i=0,len=checks.length;i<len;i++){
			if(checks[i].checked==true){
				param+=checks[i].id;
				count++;
			}
		}
		if(count==0){
			alert("请选择要修改的数据！");
		}else if(count>1){
			alert("一次只能修改一行数据");
		}else if(count==1){
			let tr=document.querySelector("#row_"+param);
			let rows=tr.childNodes;
			let array=[];
			for(let i=0,len=rows.length;i<len;i++){
				if(rows[i].nodeType=="1"){
					array.push(rows[i]);
				}
			}
			document.querySelector("#id").value=array[0].firstElementChild.id;
			document.querySelector("#userName").value=array[1].firstChild.textContent;
			document.querySelector("#password").value=array[2].firstChild.textContent;
			document.querySelector("#telephone").value=array[3].firstChild.textContent;
			document.querySelector("#user_show").hidden=true;
			document.querySelector("#user_add").hidden=false;
			document.querySelector("#table_row_id").hidden=false;
			document.querySelector("#span_nav").hidden=false;
			document.querySelector("#span_name").textContent="修改用户";
		}
	}

	window.addEventListener("load",()=>{
		let base_url="user.servlet";
		let page_url="user.servlet?param=init";
		pageModule.init(page_url);
		operationModule.init(base_url);
		
		document.querySelector("#btn_addUser").addEventListener("click",()=>{
			document.querySelector("#span_nav").hidden=false;
			document.querySelector("#span_name").textContent="新增用户";
			document.querySelector("#user_show").hidden=true;
			document.querySelector("#user_add").hidden=false;
			document.querySelector("#table_row_id").hidden=true;
			document.querySelector("#userName").value="";
			document.querySelector("#password").value="";
			document.querySelector("#telephone").value="";
		},false);
		document.querySelector("#btn_return").addEventListener("click",()=>{
			document.querySelector("#user_show").hidden=false;
			document.querySelector("#user_add").hidden=true;
			document.querySelector("#span_nav").hidden=true;
			document.querySelector("#span_name").textContent="";
		},false);
		document.querySelector("#btn_updateUser").addEventListener("click",updateUser,false);
		document.querySelector("#btn_updateRole").addEventListener("click",updateRole,false);
	},false);
})(window.managerPageModule,window.managerOperationModule);