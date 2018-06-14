var letao;
$(function () {
    letao = new Letao();
    letao.initPm();
    letao.loginOut();
})
var Letao = function () {

}
Letao.prototype = {
    initPm: function () {
        $.ajax({
            url: '/user/queryUserMessage',
            success: function (backData) {
                if (backData.error) {
                    window.location.href = './login.html';
                    return;
                }
                $('.mui-media-body span').html(backData.username);
                $('.mui-media-body .mui-ellipsis').html(backData.mobile);

            }
        })
    },
    loginOut: function () {
        $('.loginOut').click(function () {
            $.ajax({
                url: '/user/logout',
                success: function (backData) {
                    if(backData.success){
                        location.href='./login.html';
                    }
                }
            })
        })
    }
}