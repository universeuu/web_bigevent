$(function(){
    // 点击“去注册账号”，隐藏登录div,显示注册div
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登录”，隐藏注册div,显示登录div
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layUI 中获取 form 对象
    var form = layui.form
    
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],

        // 两次密码是否一致的校验规则 
        repwd: function(value){
            // 通过形参 value 拿到的是再次确认密码的值
            // 还需要拿到密码的值 $('.reg-box [name=password]').val()
            // 比较两次密码是否一致，不一致则返回提示消息
            var pword = $('.reg-box [name=password]').val()
            if(pword !== value){
                return '两次密码不一致'
            }
        }  
    })

    // 从 layUI 中获取 layer 对象
    var layer = layui.layer

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e){
        // 1.阻止默认提交行为
        e.preventDefault()
        // 2.使用ajax发送post请求
        var data = {
            username: $('#form_reg [name=username]').val(), 
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res){
            if(res.status !== 0){
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            // console.log('注册成功')
            layer.msg('注册成功，请登录')
            // 模拟手动点击‘去登录’链接：注册成功之后，自动跳转登录页面
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 获取表单中的所有数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 登录成功之后，将服务器响应的 token 保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // ，跳转到后台主页
                location.href = 'index.html'
            }
        })
    })
})