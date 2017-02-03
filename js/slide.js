define(function(require, exports, module) {
	var $ = require('jquery');
	var base=require('base');
	var interval1;

	exports.start=function(){
		var _obj=this;
		interval1=setInterval(function(){
			_obj.toNext();
		},3000);
	}
	//结束动画
	function endInterval(){
		clearInterval(interval1);
	}
	exports.toNext=function(){
		// if($('#banner').is(":animated")) return;
	  	var banner_length=$('#banner li').length,
	  		current_li=$('#banner li.current').index(),
	  		next_li=current_li+1,
	  		next_position='-'+next_li*10;

	 	if (next_li==(banner_length-1)) {
	 		next_li=1;
	 		$('#banner').animate({'left':'-'+(banner_length-1)*10+'rem'},1000,function(){
	 			$('#banner').css({'left':'-10rem'});
	 		});
	 	}
	 	else{
	 		$('#banner').animate({'left':'-'+next_li*10+'rem'},1000);
	 	}
	  	$('#banner li:eq('+next_li+')').addClass('current').siblings().removeClass('current');
	  	$('#banner-sort').html(next_li+'/'+(banner_length-2));
	 }

	 exports.toPre = function() {
	 	// if($('#banner').is(":animated")) return;
		var banner_length=$('#banner li').length,
	  		current_li=$('#banner li.current').index(),
	  		next_li=current_li-1,
	  		next_position='-'+next_li*10;

		if (next_li==0) {
	 		next_li=banner_length-2;
	 		$('#banner').animate({'left':'0rem'},1000,function(){
	 			$('#banner').css({'left':'-'+(banner_length-2)*10+'rem'});
	 		});
	 	}
	 	else{
	 		$('#banner').animate({'left':next_position+'rem'},1000);
	 	}
	  	$('#banner li:eq('+next_li+')').addClass('current').siblings().removeClass('current');
	  	$('#banner-sort').html(next_li+'/'+(banner_length-2));
	}
	exports.touchMove=function(){
		var touchStartX,obj=this;
		
		$('#banner').on('touchstart',function(e) {
		    var _touch = e.originalEvent.targetTouches[0];
		    touchStartX= _touch.pageX;
		    // endInterval();
		});
	 
		$('#banner').on('touchmove',function(e) {
		    base.stopBubble(e);
		    
		});
		$('#banner').on('touchend',function(e) {
			var _touch = e.originalEvent.changedTouches[0];
		    var _x= _touch.pageX;
		    if (_x-touchStartX<-4) {
		      obj.toNext();
		    }
		    if (_x-touchStartX>4) {
		      obj.toPre();
		    }
		    // obj.start();
		});
	}
	exports.init=function(data){
		//初始化
	}
});