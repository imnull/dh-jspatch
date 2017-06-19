# dh-jspatch
特定js方法补丁

全局定义对象 jspatch 用于装载所有函数。没有其他库依赖，在浏览器中直接引入即可使用。


## Promise方式的AJAX请求
	
	jspatch.ajaxp(url, method, data, asJson);
	jspatch.ajaxGet(url);
	jspatch.ajaxPost(url, data);
	jspatch.ajaxJson(url, data, method);

例如：
	<script type="text/javascript">

	jspatch.ajaxGet('data.json').then(function(r){
		console.log(r);	//返回文本结果
	});

	jspatch.ajaxJson('test.php', { name: 'mk', age: 18 }).then(function(r){
		console.log(r);	//自动切换至POST，并尝试返回JSON结果
	});

	</script>
