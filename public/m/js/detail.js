var letao;
var productID;
$(function () {
    letao = new Letao();
    productID = GetUrlByParamName('detailid');
    letao.initGallery();
    letao.initData();
    letao.initSizeClick();
    letao.initAddCar();
})
var Letao = function () {

}
Letao.prototype = {
    initGallery: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    initData: function () {
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: productID,
            },
            success: function (backData) {
                var arr = backData.size.split('-');
                var newArr = [];
                for (var i = +arr[0]; i <= arr[1]; i++) {
                    newArr.push(i);
                }
                backData.size = newArr;
                var result = template('contentTem', backData);
                $('.content').html(result);
                mui('.mui-numbox').numbox();
                letao.initGallery();
            }
        })
    },
    initSizeClick: function () {
        $('.content').on('click', '.size span', function () {
            $(this).addClass('active').siblings().removeClass('active');
        })
    },
    initAddCar: function () {
        $('.mui-btn-danger').click(function () {
            var size = $('.size span.active').html();
            if ($('.size span.active').length == 0) {
                mui.toast('请选择尺码', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var num = mui('.mui-numbox').numbox().getValue();
            if (mui('.mui-numbox').numbox().getValue() == 0) {
                mui.toast('请选择数量', {
                    duration: 'short',
                    type: 'div'
                });
                return;
            }
            $.ajax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: productID,
                    num: num,
                    size: size
                },
                success: function (backData) {
                    console.log(backData);

                    if (backData.error) {
                        window.location.href = './login.html';
                    } else if (backData.success) {
                        mui.confirm('添加成功,是否前往购物车看看', '温馨提示', ['yes', 'no'], function (btnNum) {
                            if (btnNum.index == 0) {
                                window.location.href = './cars.html';
                            } else if (btnNum.index == 1) {
                                mui.toast('请继续购物', {
                                    duration: 'short',
                                    type: 'div'
                                });
                            }

                        });
                    }
                }
            })


        })
    }
}

function GetUrlByParamName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var URL = decodeURI(window.location.search);
    var r = URL.substr(1).match(reg);
    if (r != null) {
        //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码  
        return decodeURI(r[2]);
    };
    return null;
};