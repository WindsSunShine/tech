// alert(signature);
// alert(signature);
wx.config({
    debug: false,
    appId:appId,
    timestamp:timestamp,
    nonceStr: nonceStr,
    signature:signature,
    jsApiList: [ 
    // 所有要调用的 API 都要加到这个列表中
    'checkJsApi',
    'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'
    ]
});
wx.ready(function () {
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl:imgUrl,
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
        },
        success: function (res) {
            // is_share(1);
    // alert('已分享');
        },
        cancel: function (res) {
            // is_share(0);
        },
        fail: function (res) {
             //alert(JSON.stringify(res));
            // is_share(0);

        }
    });
    wx.onMenuShareTimeline({
        title:title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        trigger: function (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            // is_share(1);
        },
        cancel: function (res) {
            // is_share(0);
        },
        fail: function (res) {
            // is_share(0);
        }
    });
    wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
           // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    wx.checkJsApi({
       jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ],
        success: function (res) {
              //alert(JSON.stringify(res));
        }
    });

});
