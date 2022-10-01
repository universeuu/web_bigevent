$(function() {
    // 调用 getUserInfo 函数获取用户信息
    getUserInfo()

    var layer = layui.layer
    // 监听 退出 事件
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地token
            localStorage.removeItem('token')
            // 2.跳转到登录页面
            location.href = 'login.html'
            // 关闭cofrim询问框
            layer.close(index)
          })
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers 就是请求头配置对象  有权限的接口要配置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if(res.status !== 0){
                return layer.msg('获取用户信息失败')
            }
            // 调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 不论成功失败，都调用complete
        // complete: function(res) {
        //     console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if(res.responseJSON.status ===1 &&res.responseJSON.message === '身份认证失败！'){
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         location.href = 'login.html'
        //     }
        // }
    })
}

// 渲染用户头像    user = res.data
function renderAvatar(user) {
    // 1.获取用户名
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.渲染头像
    if(user.user_pic !== null){
        // 如果有图片头像，则渲染图片
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    }else{
        $('.layui-nav-img').hide()
        // 获取名字的第一个字大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}