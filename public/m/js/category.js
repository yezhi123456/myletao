$(function () {
    var letao = new Letao();
    letao.initScroll();
    letao.initlistClick();
    letao.initCategoryRight();
})
var Letao = function () {}
Letao.prototype = {
    initScroll: function () {
        options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        }
        //main的内部滚动
        mui('.mui-scroll-wrapper').scroll(options);
    },
    initlistClick: function () {

        $.ajax({
            url: '/category/queryTopCategory',
            success: function (backData) {
                var result = template('categoryLeftTem', backData);
                $('.category-left ul').html(result);
            }
        })
    },
    initCategoryRight: function () {
        $('.category-left ul').on('click', 'a', function () {
            $(this).parent().addClass('active').siblings().removeClass('active');
            var id = $(this).data('id');
            getData(id);
        })
        getData(1);

        function getData(id) {
            $.ajax({
                url: '/category/querySecondCategory',
                data: {
                    id: id,
                },
                success: function (backData) {
                    var result = template('categoryRightTem', backData);
                    if (!result) {
                        $('.category-right .mui-row').html('<h5>我写不动了.求你别点了</h5>')
                    } else {
                        $('.category-right .mui-row').html(result);
                    }
                }
            })
        }
    }
}