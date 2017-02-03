define(function(require, exports, module) {
	var $ = require('jquery');
	var base = require('base');
	var access_token=base.getQueryURL('access_token');
	exports.floatEvent=function(){
		var touchStartY,
			obj=$('.banner-nav'),
		    banner_nav_height=obj.height();
		
		$(window).scroll(function() {
			if ($('body').scrollTop()<=200) obj.show();
		});

		$('body').on('touchstart',function(e) {
		    var _touch = e.originalEvent.targetTouches[0];
		    touchStartY= _touch.pageY;
		});
	 
		$('body').on('touchmove',function(e) {
			// base.stopBubble(e);
		    var _touch = e.originalEvent.changedTouches[0],
		    	_y= _touch.pageY;
		    	if(_y-touchStartY<=-6){//页面乡下
				    // obj.show().css({'position':'fixed'});
			    	// showPadding();
			    	obj.show();
			    }
			    if (_y-touchStartY>=6) {//页面向上
			    	if ($('body').scrollTop()<=200) return;
			    	obj.hide();
			    }

				// touchStartY=_y;
		    

		});
		$('body').on('touchend',function(e) {

		});

		// function showPadding(){
		// 	if (!base.isAndriod()&&access_token) {
		// 		obj.css('padding-top','calc(20px + 0.32rem)')
		// 	}
		// }
	}
});