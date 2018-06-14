var letao;
$(function () {
    letao = new Letao();
    letao.initCars();
    letao.checkBoxClick();
    letao.deleted();
    letao.editd();
    letao.spanClick();
})
var Letao = function () {

}
Letao.prototype = {
    initCars: function () {
        $.ajax({
            url: '/cart/queryCart',
            success: function (backData) {
                if (backData.error) {
                    location.href = './login.html';
                    return;
                }
                var result = template('carsTem', backData);
                $('.content').html(result);
                letao.checkBoxClick();

            }
        })
    },
    checkBoxClick: function () {
        getPrice();
        $('.content').on('click', 'input[type=checkbox]', function () {
            getPrice();
        })

        function getPrice() {
            var $arr = $('input[type=checkbox]:checked');
            var sum = 0;
            for (var i = 0; i < $arr.length; i++) {
                sum += $($arr[i]).data('price') * $($arr[i]).data('num');
            }
            $('.mainfooter span').html('订单总额: $' + sum.toFixed(2));
        }
    },
    deleted: function () {
        $('.content').on('click', '.btn-delete', function () {
            var that = this
            mui.confirm('是否确定删除', '温馨提示', ['yes', 'no'], function (e) {
                if (e.index == 0) {
                    $.ajax({
                        url: "/cart/deleteCart",
                        data: {
                            id: $(that).parent().data('id'),
                        },
                        success: function (backData) {
                            if (backData.success) {
                                letao.initCars();
                            }
                        }
                    })
                } else {
                    letao.initCars();
                }

            })
        })

    },
    editd: function () {
        $('.content').on('click', '.btn-edit', function () {
            var fanwei = $(this).data('fanwei');
            var num = $(this).data('num');
            var size = $(this).data('size');
            var id = $(this).parent().data('id');
            var arr = [];
            fanwei = fanwei.split('-');
            for (var i = +fanwei[0]; i <= fanwei[1]; i++) {
                arr.push(i);
            }
            var html = template('editTmp', {
                arr: arr,
                num: num,
                id: id,
            });
            // 4. 去掉模板的回车符和换行
            html = html.replace(/(\r)?\n/g, "");

            mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {

                if (e.index == 0) {
                    size = $('.btn-size.active').html();
                    num = mui('.mui-numbox').numbox().getValue()
                    $.ajax({
                        url: "/cart/updateCart",
                        type: 'post',
                        data: {
                            size: size,
                            num: num,
                            id: id
                        },
                        success: function (backData) {


                        }
                    })
                }
                letao.initCars();
            });
            mui('.mui-numbox').numbox();





        })
    },
    spanClick: function () {
        $('body').on('click', '.btn-size ', function () {
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
}