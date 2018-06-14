var letao;
$(function () {
    letao = new Letao();
    letao.initVerify();
})
var Letao = function () {

}
Letao.prototype = {
    initVerify: function () {
        $('.btn-login').click(function () {
            var userName = $('.userName').val();
            var password = $('.password').val();


            if (!userName) {
                mui.toast('请输入用户名', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (!password) {
                mui.toast('请输入密码', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            }
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: {
                    username: userName,
                    password: password,
                },
                success: function (backData) {
                    if(backData.success){
                        window.location.href='./user.html';
                    }else {
                        mui.toast(backData.message, {
                            duration: 'short',
                            type: 'div'
                        })
                    }                 
                }
            })
        })
    }
}