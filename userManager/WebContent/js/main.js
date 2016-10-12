(function main_init(){
	function init(){
		let xhr=new XMLHttpRequest();
		xhr.open("get","user.servlet?param=initMenu&id="+document.querySelector("#input_userid").value,true);
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				let json=JSON.parse(xhr.responseText);
				let ul=document.querySelector("#ul_menu");
				for(let i=0,len=json.list.length;i<len;i++){
					let li=document.createElement("li");
					let a=document.createElement("a");
					a.href=json.list[i].url;
					a.target="main_iframe";
					let text=document.createTextNode(json.list[i].name);
					a.appendChild(text);
					li.appendChild(a);
					ul.appendChild(li);
				}
			}
		};
		xhr.send(null);
	}
	window.addEventListener("load",init,false);
})();