
var mainUrl  = 'https://api.yinyueke.com/';
var imageUrl = 'http://123.56.14.144:8090/img/';
var newMainUrl = 'http://123.56.31.4:8081/v2/getTeacherInfo';

define(function(require, exports, module) {
    var $ = require('jquery');
    var base=require('base');
    // '.jpg'
    var url_1='http://img-srv.yinyueke.com/',
    // xx,xx
      url_2='http://123.56.14.144:8090/img/200x200/';

    exports.init=function(callback){
        var initStyleClick=require('initStyleClick');
        initStyleClick.initStyle();
        initStyleClick.clickEvent();

        // var access_token=base.getQueryURL('access_token');
        // var access_token="f42bf6b92895a231cbc5866507bdb861be08df11";
        var access_token = "";
        // var url= mainUrl +'v1/teacher/detail';

        var url = 'http://123.56.31.4:8081/v2/getTeacherInfo';
        // url=!access_token?url:url+'?access_token='+access_token;
        // params={'teacherId':base.getQueryURL('teacherId')};
        // params={'teacherId':"51"};
        params={'teacher_id':"1"};
        base.getJsonByPost(url,params,function(data){
        // alert('请求数据成功');
        // banner部分
        var banner=data.banner,banner_html='',banner_list=[];
        if(banner){
            for(i_banner in banner){
                banner_list.push(banner[i_banner]);
            }
            var banner_length=banner_list.length;
            // banner_html+='<li><img src="http://123.56.14.144:8090/img/800x600/'+banner_list[banner_length-1]+'" alt=""></li>';
            banner_html =banner_html + "<li><img src="+ imageUrl + "800x600/" + banner_list[banner_length-1] + " alt=''></li>";
            for (var i_banner_list = 0; i_banner_list < banner_length; i_banner_list++) {
                var i_src=banner_list[i_banner_list];
                // banner_html+='<li><img src="http://123.56.14.144:8090/img/800x600/'+i_src+'" alt=""></li>';
                banner_html = banner_html + "<li><img src="+ imageUrl + "800x600/" + i_src + " alt=''></li>";
            }
            // banner_html+='<li><img src="http://123.56.14.144:8090/img/800x600/'+banner_list[0]+'" alt=""></li>';
            banner_html =  banner_html + "<li><img src ="+ imageUrl + "800x600/" + banner_list[0]+ " alt = ''></li>";
            $('#banner').html(banner_html).css({'width':(banner_length+2)*10+'rem'});

            $('#banner li:eq(1)').addClass('current');
            $('#banner-sort').html('1/'+(banner_length));
            var slide=require('slide');
            console.log(slide);
            // slide.start();
            if (banner_length>=2) {
                slide.touchMove();
            }
        }


        //教师个人信息
        // $('.teacher-icon img').attr('src','http://123.56.14.144:8090/img/100x100/'+data.headIcon);
        $('.teacher-icon img').attr('src',imageUrl + '100x100/' + data.headIcon);
        // link='http://123.56.14.144:8090/img/100x100/'+data.headIcon;
        link = imageUrl + '100x100/'+ data.headIcon;
        $('.teacher-name').html(data.name);
        // $('.teacher-age').html(data.age+'岁').css({'background-image':data.gender=="男"?"url('image/male.png')":"url('image/female.png')"});
        data.subject?$('.teacher-instrument').html(data.subject):$('.teacher-instrument').hide();
        $('.teacher-sex').html(data.gender);
        data.age&&$('.teacher-age').html(data.age+'岁');
        if(data.bio) $('.teacher-introduce').html('个性签名:'+data.bio);


        var course_price,course_age,teacher_school;
        course_price=data.coursePrice?'￥'+data.coursePrice:'---';
        course_age=data.schoolAge?data.schoolAge+'年':'---';
        teacher_school=data.graduateSchool?data.graduateSchool:'---';

        $('.teacher-course-price .teacher-course-content').html(course_price);
        $('.teacher-course-age .teacher-course-content').html(course_age);
        $('.teacher-school .teacher-course-content').html(teacher_school);

        data.classTime?$('.apitude-color-time').html(data.classTime):$('.apitude-color-time').hide();
        data.education?$('.apitude-color-degree').html(data.education):$('.apitude-color-degree').hide();
        data.location?$('.apitude-color-country').html(data.location):$('.apitude-color-country').hide();
        if (data.identTag=='1') $('.identTag.apitude-color').show();
        if (data.eduTag=='1') $('.eduTag.apitude-color').show();
        if (data.qualTag=='1') $('.qualTag.apitude-color').show();

        $('#tuid').val(data.teacherId);
        $('#course_price').val(data.coursePrice);
        $('#subjectName').val(data.subject);
        $('#MyteacherName').val(data.name);

        //个人经历
        var teachHis=data.teachHis,teachHis_html='';
        teachHis=teachHis||[];
        for (var i = 0; i < teachHis.length; i++) {
            var i_teachHis=teachHis[i];
            teachHis_html+='<li><div class="teacher-experience-time">'+i_teachHis.twh_starttime+'</div>';
            teachHis_html+='<div class="teacher-experience-content">'+i_teachHis.twh_experience+'</div></li>';
        }
        $('.teacher-experience-list').html(teachHis_html);
        if(teachHis.length<=0) $('.teacher-experience').css('display','none');

        //主要成就
        var teacherPrize=data.teachPrize,teacherPrize_html='',bigImage_html='';
        teacherPrize=teacherPrize||[];
        var showBig_num=0;
        for (var j = 0; j < teacherPrize.length; j++) {
            var j_teacherPrize=teacherPrize[j];
            teacherPrize_html+='<li><div class="teacher-achievement-time">'+j_teacherPrize.prize_time+'</div>';
            teacherPrize_html+='<div class="teacher-achievement-content">'+j_teacherPrize.title+'</div>';
            teacherPrize_html+='<div class="teacher-achievement-images">';
            teacherPrize_html+='<ul class="teacher-achievement-images-list clearfix">';

            var s_img_name=j_teacherPrize.img_name,
                array_img_name=s_img_name.split('|');
            for (var i_array_img_name = 0; i_array_img_name < array_img_name.length; i_array_img_name++) {
                var i_teacherPrize_src=array_img_name[i_array_img_name];
                if(i_teacherPrize_src){
                    teacherPrize_html+='<li showbig="" sort="'+showBig_num+'"><img src="'+changeSrc(i_teacherPrize_src)+'" alt=""></li>';
                    bigImage_html+='<li sort="'+showBig_num+'"><img src="'+changeSrc(i_teacherPrize_src)+'" alt=""></li>';
                    showBig_num++;
                }
            }
            teacherPrize_html+='</ul></div></li>';
        }
        $('.teacher-achievement-list').html(teacherPrize_html);

        $('.check-big-image-list').html(bigImage_html).css('width',($('.check-big-image-list').children().length)*10+'rem');

        $('.teacher-achievement-images-list').each(function() {
            if ($(this).children('li').length<=0) $(this).parent('.teacher-achievement-images').hide();
            $(this).css('width',2.5333*($(this).children().length)+'rem');
        });
        if (teacherPrize.length<=0) $('.teacher-achievement').css('display','none');
        var image_check=require('image_check');
        image_check.touchMove();
        image_check.checkBig();



        //视频
        var video_html='';

        if (data.videoUrl) {
            for (i_video in data.videoUrl){
                video_html+='<li video_src="'+'https://vod.yinyueke.com/Act-ss-mp4-sd/365cc4de653b405f90f0dd7b1edacba5/43_1.mp4"'+'"><div style="background-image:'+'url('+changeSrc(data.prctureSrc[i_video])+')" class="teacher-movie-detail"><div class="movie-play-button"></div></div>';
                video_html+='<div class="teacher-movie-info">'+data.descContent[i_video]+'</div></li>';
            }
            $('.teacher-movie-list').html(video_html);
            var video=require('video');
            video.videoModule();
        }
        else{
            $('.teacher-movies').css('display','none');
        }


        setTimeout(function(){
            $('body>div,footer,#banner,#banner-sort,.banner-nav .share-tech,.banner-nav .edit-teacher,.banner-nav .page-name').css({'visibility':'visible'});
            $('#banner-module').css('background-color','white');
        },200);

        $('.teacher-follow-num').html(data.follow_num);
        // this.iden();
        (typeof callback =='function')&&callback();

        // alert($('.banner-nav').width());
    });
}
exports.iden=function(){
    var access_token=base.getQueryURL('access_token'),
    url='/v1/userinfo/view?access_token='+access_token;
    if(!access_token) return;
    // var total_follow=0;
    base.getJsonByGet(url,{},function(data){
        var url1='/v1/teacher/relation?access_token='+access_token;

        base.getJsonByGet(url1,{},function(data1){
            var is_follow=0;
            var teacherId=base.getQueryURL('teacherId');
            for (var i = 0; i < data1.length; i++) {
                if (data1[i].mf_followuid==teacherId) is_follow++;
                // total_follow++;
            }
            if (data.role=='student') {
                if (is_follow>0) {
                    //已关注
                    $('.teacher-follow').attr('follow','true')
                    $('.teacher-follow-icon img').attr('src','image/followed.png');
                    $('.teacher-follow span').html('已关注').css({'color':'#8d8d8d'});
                }
                else{
                //没关注
                }
                $('#ident_type').val('student');
                // $('.edit-teacher').hide();
                // $('.page-name').html($('#MyteacherName').val()+'的个人主页');
            }
            else{
                //老师
                $('.teacher-follow-icon,.teacher-follow span').hide();
                $('.teacher-follow-name,.teacher-follow-num').show();

                $('#ident_type').val('teacher');
                // $('footer .choose-class').css({'background-color':'#e1e1e1'});
                // $('.choose-class').hide();
                $('footer').hide();
                // $('.teacher-assessment').css('margin-bottom','10px');

            }
        });

});
}
exports.getWX=function(){
    var access_token=base.getQueryURL('access_token'),
    url='/v1/jssdk/sign ';
    base.getJsonByPost(url,{'url':location.href},function(data){
        // alert('11');
        window.appId = data.appId;
        // window.appId = 'wxa002826d9886cd1c';
        window.timestamp = data.timestamp;
        // window.timestamp = '1477981548';
        window.nonceStr = data.nonceStr;
        // window.nonceStr = '9Fai4lg3g8pdKIAE';
        window.signature = data.signature;
        // window.signature = '3182c35fb47e6eb893d248d1b821df0f3f158303';
        // $('body').append('<script src="js/wx_share.js" type="text/javascript" charset="utf-8"></script>');

        var head= document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= 'js/wx_share.js';
        head.appendChild(script);
    });

}

function changeSrc(src){
    var n_src='';
    if (src.indexOf('.')>=0) {
        n_src=url_1+src;
    }
    if (src.indexOf(',')>=0) {
        n_src=url_2+src;
    }
    return n_src;
}



});
