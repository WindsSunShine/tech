define(function(require, exports, module) {
	var $ = require('jquery');
	var base=require('base');
	exports.touchMove=function(){
		var touchStartX;
		
		$('.teacher-achievement-images-list').on('touchstart',function(e) {
		    var _touch = e.originalEvent.targetTouches[0];
		    touchStartX= _touch.pageX;
		});
	 
		$('.teacher-achievement-images-list').on('touchmove',function(e) {
			// base.stopBubble(e);
		    var _touch = e.originalEvent.changedTouches[0],
		    	_x= _touch.pageX,
		    	font_size=parseInt(document.documentElement.style.fontSize),
		    	circle_width=9.2*font_size;
		    	obj=$(this),
		    	_left=parseInt(obj.css('left')),
		    	_width=parseInt(obj.css('width')),
		    	_offset_x=_x-touchStartX;
		    // 向右
		    if (circle_width>_width) return;
		    var next_left=_left+_x-touchStartX
		    if (_offset_x>0&&(_left+_offset_x)>=0) {
		    	// obj.css({'left':'0px'});
		    	next_left=0;
		    }
		    if (_offset_x<0&&(_left+_offset_x)<=(circle_width-_width)) {
		    	// obj.css({'left':circle_width-_width+'px'});
		    	next_left=circle_width-_width;
		    }

		    obj.css({'left':next_left+'px'});
		});
		$('.teacher-achievement-images-list').on('touchend',function(e) {

		});
	}
	exports.checkBig=function(){
		//显示
		$('li[showBig]').click(function(){
			var obj=$(this),
				_sort=obj.attr('sort');
			$('.check-big-image-list li').removeClass('current');
			$('.check-big-image-list').css({'left':'-'+parseInt(_sort)*10+'rem'}).children().eq(_sort).addClass('current');
			showBig();
		});
		//隐藏
		$('.check-big-image').click(function(){
			hideBig();
		});
		$('.check-big-image li img').click(function(e){
			base.stopBubble(e);
		});

		var touchStartX;
		$('.check-big-image-list').on('touchstart',function(e) {
			// e.preventDefault();
		    var _touch = e.originalEvent.targetTouches[0];
		    touchStartX= _touch.pageX;
		});
	 
		$('.check-big-image-list').on('touchmove',function(e) {
		    base.stopBubble(e);
		});
		$('.check-big-image-list').on('touchend',function(e) {
			// e.preventDefault();
			var _touch = e.originalEvent.changedTouches[0];
		    var _x= _touch.pageX;
		    var max_length=$('.check-big-image-list li').length-1;
		    var current=$('.check-big-image-list li.current').index(),_next;
		    if (_x-touchStartX<-10) {
		    	if (current==max_length) return;
		    	$('.check-big-image-list').animate({'left':'-'+(current+1)*10+'rem'});
		    	_next=current+1;
		    }
		    if (_x-touchStartX>10) {
		    	if (current==0) return;
		    	$('.check-big-image-list').animate({'left':'-'+(current-1)*10+'rem'});
		    	_next=current-1;
		    }
		    $('.check-big-image-list li:eq('+_next+')').addClass('current').siblings().removeClass('current');
		});

		function showBig(){
			$('.check-big-image').show();
			// $('body').css({'overflow-y':'hidden'});
		}
		function hideBig(){
			$('.check-big-image').hide();
			// $('body').css({'overflow-y':'scroll'});
		}
	}
});