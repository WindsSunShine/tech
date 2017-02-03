// teacher-movie-list clearfix
define(function(require, exports, module) {
	var $ = require('jquery');
	var base=require('base');
	exports.videoModule=function(){
		//点击显示
		$('.teacher-movie-list li').click(function(){
			var video_src=$(this).attr('video_src');
			$('.check-video').show();
			$('.check-video video').attr('src',video_src);
			// $('body').css({'overflow-y':'hidden'});
		});
		//隐藏
		$('.check-video').click(function(){
			$(this).hide();
			document.getElementById("video").pause();;
			// $('body').css({'overflow-y':'scroll'});
		});;
		$('.video-round').click(function(e){
			base.stopBubble(e);
		});
	}

});