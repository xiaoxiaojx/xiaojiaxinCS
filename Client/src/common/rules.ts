export default
{
    "nickname": {
        "RegExp": "",
        "error": "昵称不能为空, 且不能超过10个字符"
    },
    "userName": {
        "RegExp": /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
        "error": "用户名必须以字母开头，长度为5-16字符，允许字母数字下划线"
    },
    "password": {
        "RegExp": /[a-zA-Z0-9_]{4,15}$/,
        "error": "密码长度必须为5-16字符，允许字母数字下划线"
    },
    "selfIntroduction": {
        "RegExp": "",
        "error": "个人介绍不能为空"
    },
    "sex": {
        "RegExp": "",
        "error": "性别不能为空"
    },
    "email": {
        "RegExp": /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "error": "请填写正确格式的邮箱"
    },
};