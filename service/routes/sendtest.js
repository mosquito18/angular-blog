//sendtest.js

// var send = require('./mail-test');
var send = require('./email.js');


// 创建一个邮件对象
var mail = {
    // 发件人
    from: 'ouxiaojie18<ouxiaojie18@126.com>',
    // 主题
    subject: '测试',
    // 收件人
    to: '530221248@qq.com',
    // 邮件内容，HTML格式
    text: '点击激活：https://www.jianshu.com/p/0bb9e1f6b209' //接收激活请求的链接
};
send(mail);