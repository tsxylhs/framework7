(function login(){
	function init(){
		document.querySelector("#btn_login").addEventListener("click",function(){
			document.querySelector("#message").textContent="";
		},false);
		document.querySelector("#btn_register").addEventListener("click",()=>{
				window.location.href="forward.servlet?param=register";
		},false);
	}
	window.addEventListener("load",init,false);
})();