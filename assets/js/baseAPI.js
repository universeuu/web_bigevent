// 每次调用$.get() $.post() $.ajax()时
// 会先调用 ajaxPrefilter() 函数
// 在这个函数中可以拿到给ajax提供的配置对像
$.ajaxPrefilter(function(options){
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
})