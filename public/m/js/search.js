var letao;
$(function () {
    letao = new Letao();
    //添加历史记录的点击事件
    letao.addHistory();
    //初始化显示历史记录
    letao.initHistory();
    //绑定删除历史记录的点击事件
    letao.deleleHistory();

});
var Letao = function () {

}
Letao.prototype = {
    addHistory: function () {
        $('.btn-search').click(function () {
            var search = $('.input-search').val();
            if (search == '') {
                alert('请输入内容');
                return;
            }
            var arr = window.localStorage.getItem('searchData');
            if (arr != null) {
                arr = JSON.parse(arr);
            } else {
                console.log(1);
                arr = [];
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].search == search) {
                    window.location.href = './product.html';

                    return;
                }
            }
            arr.push({
                search: search,
            });
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            letao.initHistory();
            $('.input-search').val('');
            window.location.href = './product.html';
        })
    },
    initHistory: function () {
        var searchData = window.localStorage.getItem('searchData');
        searchData = JSON.parse(searchData);
        var result = template('historyTem', searchData);
        if (!searchData) {
            $('.history ul').html('<h5>没有历史记录</h5>');
        } else {
            $('.history ul').html(result);
        }
    },
    deleleHistory: function () {
        $('.allDelete').click(function () {
            window.localStorage.removeItem('searchData');
            $('.history ul').html('<h5>没有历史记录</h5>');
        })
        $('.history ul').on('click', '.delete', function () {
            var arr = window.localStorage.getItem('searchData');
            var id = $(this).data('id');
            arr = JSON.parse(arr);
            arr.splice(id, 1);
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            letao.initHistory();
        })

    }
}