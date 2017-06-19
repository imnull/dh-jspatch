(function(win){

win.jspatch = {
	isObject: function(v){
		return v && Object.prototype.toString.call(v) == '[object Object]';
	},
	isFunction: function(v){
		return typeof(v) == 'function';
	}
};


})(window);

// Promise AJAX
(function(win){


	function AJAX(url, method, data, success, failed){
		method = (method || 'GET').toUpperCase();
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = success;
		xhr.onerror = failed;

		var fd = null;
		if(jspatch.isObject(data)){
			fd = new FormData();
			for(var p in data){
				fd.append(p, data[p]);
			}				
		}
		xhr.send(fd);
	}


	function ajaxp(url, method, data, asJson){
		var promise = new Promise(function (resolve, reject){

			AJAX(url, method, data, function(e){
				if(!asJson){
					resolve(this.responseText);
				} else {
					try { resolve(JSON.parse(this.responseText)); }
					catch(e){ console.error('JSON parse error:', this.responseText); resolve(null); }
				}
			}, function(e){})
		
		});
		return promise;
	}

	function ajaxGet(url){ return ajaxp(url, 'GET', null); }
	function ajaxPost(url, data){ return ajaxp(url, 'POST', data); }
	function ajaxJson(url, data, method){ return ajaxp(url, method ? method : jspatch.isObject(data) ? 'POST' : 'GET', data, !0); }

	jspatch.ajaxp = ajaxp;
	jspatch.ajaxGet = ajaxGet;
	jspatch.ajaxPost = ajaxPost;
	jspatch.ajaxJson = ajaxJson;


})(window);