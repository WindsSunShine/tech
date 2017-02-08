define(function(require, exports, module) {
	var $ = require('jquery');
	// 阻止冒泡
	exports.stopBubble=function(e) {
		e = e || window.event;
		if(e.targetTouches&&e.targetTouches.length==1){
			e.preventDefault();
		}
		if(e.stopPropagation) { //W3C阻止冒泡方法
			e.stopPropagation();
		} else {
			e.cancelBubble = true; //IE阻止冒泡方法
		}
	}
	exports.getJsonByPost=function(url,params,callback){
						console.log("url="+url);
		$.ajax({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        data: params,
	        async: true
	    })
	    .done(function(data) {
					console.log(data);
	        callback(data);
	    });
	}
	exports.getJsonByGet=function(url,params,callback){
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			data: params,
			async: true
		})
		.done(function(data) {
			callback(data);
		});
	}
	//地址栏参数
	exports.getQueryURL=function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}
	exports.isMicromessenger=function(){
		var ua=navigator.userAgent.toLowerCase();
		return ua.indexOf('mqqbrowser')>-1||ua.indexOf('micromessenger')>-1||ua.indexOf('qq')>-1;
	}
	exports.isAndriod=function(){
		var ua=navigator.userAgent.toLowerCase();
		return ua.indexOf('android') > -1;
	}
});
