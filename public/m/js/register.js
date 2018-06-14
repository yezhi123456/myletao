var letao;
$(function () {
    letao = new Letao();
    letao.getVcode();
    letao.complate();
})
var Letao = function () {

}
var vcode;
Letao.prototype = {
    getVcode: function () {
        $('.yzm button').click(function () {
            $.ajax({
                url: '/user/vCode',
                success: function (backdata) {
                    vcode = backdata.vCode;
                    console.log(vcode);

                }
            })
        })
    },
    complate: function () {
        $('.btn-zhuce').click(function () {
            var userName = $('.userName').val();
            var password1 = $('.password1').val();
            var password2 = $('.password2').val();
            var mobile = $('.mobile').val();
            if (!userName) {
                mui.toast('请输入用户名', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (!mobile) {
                mui.toast('请输入手机号码', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (!password1) {
                mui.toast('请输入密码', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (!password2) {
                mui.toast('请再次输入密码', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (password1!=password2) {
                mui.toast('两次密码必须一致', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            } else if (!vcode) {
                mui.toast('请输入验证码', {
                    duration: 'short',
                    type: 'div'
                })
                return;
            }
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: {
                    username: userName,
                    password: password1,
                    mobile: mobile,
                    vCode: vcode,
                },
                success: function (backdata) {
                    if (backdata.success) {
                        mui.toast('注册成功', {
                            duration: 'short',
                            type: 'div'
                        })
                        window.location.href='./login.html'
                    } else if (backdata.error) {
                        mui.toast(backdata.message, {
                            duration: 'short',
                            type: 'div'
                        })
                    }
                }
            })
        })


    }
}