(function register(){
	function init(){
		document.querySelector("#userName").addEventListener("blur",()=>{
			let xhr=new XMLHttpRequest();
			xhr.open("get","user.servlet?param=queryName&userName="+document.querySelector("#userName").value,true);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					let json=JSON.parse(xhr.responseText);
					let message=document.querySelector("#userName_message");
					if(json.result=="true"){
						message.style.color="red";
						message.textContent="用户名已经被占用";
					}else{
						message.style.color="green";
						message.textContent="该名称可以使用";
					}
				}
			};
			xhr.send(null);
		},false);
		document.querySelector("#userName").addEventListener("focus",()=>{
			document.querySelector("#userName_message").textContent="";
		},false);
		document.querySelector("#password").addEventListener("blur",()=>{
			let value=document.querySelector("#password").value;
			let message=document.querySelector("#password_message");
			if(value.length<6||value==""){
				message.style.color="red";
				message.textContent="密码不能为空且长度不能低于6位";
			}else{
				message.style.color="green";
				message.textContent="密码强度达到要求";				
			}
		},false);
		document.querySelector("#password").addEventListener("focus",()=>{
			document.querySelector("#password_message").textContent="";
		},false);
		document.querySelector("#rePassword").addEventListener("blur",()=>{
			let value=document.querySelector("#password").value;
			let reValue=document.querySelector("#rePassword").value;
			let message=document.querySelector("#rePassword_message");
			if(value!=reValue&&value!=""){
				message.style.color="red";
				message.textContent="两次输入的密码不同，请再次输入";
			}else{
				message.style.color="green";
				message.textContent="两次输入的密码相同，请继续";				
			}
		},false);
	}
	window.addEventListener("load",init,false);
})();