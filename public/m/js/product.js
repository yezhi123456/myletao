var letao;
$(function () {
    letao = new Letao();
    letao.initDown();
    letao.searchClick();
    letao.initmiaoshuClick();
    letao.getNewData({
        search: GetUrlByParamName('search'),
    }, function (backData) {
        var result = template('searchTem', backData);
        $('.content .mui-row').html(result);
    });
    $('.input-search').val(GetUrlByParamName('search'));
});
var Letao = function () {

}
var page = 1;
Letao.prototype = {
    initDown: function () {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: false, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        setTimeout(function () {
                            letao.getNewData({}, function (backData) {
                                letao.initResult(backData);
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                page = 1;
                            })
                        }, 1500);
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                    contentrefresh: '正在加载...',
                    contentnomore: '没了大哥',
                    callback: function () {

                        setTimeout(function () {
                            letao.getNewData({
                                page: ++page,
                            }, function (backData) {
                                if (backData.data.length > 0) {
                                    var result = template('searchTem', backData);
                                    $('.content .mui-row').append(result);
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                                } else {
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                                }
                            })
                        }, 1500);
                    }
                }
            }
        });
    },
    initResult: function (backData) {
        var result = template('searchTem', backData);
        $('.content .mui-row').html(result);
    },
    searchClick: function () {
        $('.btn-search').on('tap', function () {
            letao.getNewData({}, function (backData) {
                letao.initResult(backData);
            });
        })
    },
    getNewData: function (obj, callBack) {
        var search = $('.input-search').val();
        if (!obj) {
            obj = {};
        }
        if (obj.search) {
            search = obj.search;
        }
        $.ajax({
            url: "/product/queryProduct",
            data: {
                pageSize: obj.pageSize || 2,
                page: obj.page || 1,
                price: obj.price,
                num: obj.num,
                proName: search,
            },
            success: function (backData) {
                if (callBack) {
                    callBack(backData);
                }
            }

        });
    },
    initmiaoshuClick: function () {
        $('.miaoshu').on('tap', 'a', function () {
            var sortName = $(this).data('sort');
            var sortNum = $(this).data('sort-style');
            sortNum == 1 ? sortNum = 2 : sortNum = 1;
            if (sortName == 'price') {
                letao.getNewData({
                    price: sortNum,
                }, function (backData) {
                    letao.initResult(backData);
                })
            } else if (sortName == 'num') {
                letao.getNewData({
                    num: sortNum,
                }, function (backData) {
                    letao.initResult(backData);
                })
            }
            $(this).attr('data-sort-style',sortNum);

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