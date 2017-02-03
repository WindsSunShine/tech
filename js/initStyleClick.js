define(function(require, exports, module) {
	var $ = require('jquery');
	var base=require('base');
	exports.initStyle=function(){
		var type=$('#ident_type').val();
		var access_token=base.getQueryURL('access_token');
		if(base.isMicromessenger()){
			// alert('这是微信')
			//赵老师
			// $('.page-name').css({'padding-left': '0.4rem','background-image':'none'});
			// $('.page-back,.edit-teacher,.teacher-follow').hide();
			//编辑
			$('footer .choose-class').css({'background-color':'#e1e1e1'});
		}
		if (access_token) {
			// if(!base.isAndriod()) $('.banner-nav').css('padding-top','calc(20px + 0.32rem)');
		}

	}
	exports.clickEvent=function(){
		//返回事件
		function returnPage(){
			$('.page-back').click(function(){
				if(base.isMicromessenger()) return;
				else Native.webBackClick();
			});
		}
		// 分享事件
		function shareWXQQ(){
			$('.share-tech').click(function(){
				if(base.isMicromessenger()){
					//引导分享
					$('.share_wx').show();
					setTimeout(function(){
						$('.share_wx').hide();
					},2000);
				}
				else{
					Native.webShareClick();
				}
			});
		}
		function edit(){
			$('.edit-teacher').click(function(){
				if(base.isMicromessenger()) return;
				else{
					Native.webEditorClick();
				}
			});
		}
		//关注点击事件
		function follow_click(){
			$('.teacher-follow').click(function(){
				if(base.isMicromessenger()) return;
				if($('.teacher-follow').attr('follow')) return;
				var url='/v1/follow/create?access_token='+base.getQueryURL('access_token');
				base.getJsonByPost(url,{'tuid':$('#tuid').val()},function(data){
					if(data&&data.id){
						$('.teacher-follow-icon img').attr('src','image/followed.png');
        				$('.teacher-follow span').html('已关注').css({'color':'#8d8d8d'});
        				Native.webFocusOnClick();
					}
				});
			});
		}
		//联系客服
		function customer_service(){
			$('.customer-service').click(function(){
				if(base.isMicromessenger()) window.location.href='tel:13641047453';
				else Native.webContactService();
			});
			
		}
		//选课
		function chooseClass(){
			$('.choose-class').click(function(){
				if(base.isMicromessenger()) return;
				if($('#ident_type').val()=='teacher') return;
				else{
					var tuid=$('#tuid').val(),
						course_price=$('#course_price').val(),
						subjectName=$('#subjectName').val(),
						MyteacherName=$('#MyteacherName').val();
					Native.webCourseSelection('{"tuid":"'+tuid+'","course_price":"'+course_price+'","subjectName":"'+subjectName+'","MyteacherName":"'+MyteacherName+'"}');
				}
			});
		}

		// returnPage();
		// shareWXQQ();
		edit();
		follow_click();
		customer_service();
		chooseClass();
	}
});