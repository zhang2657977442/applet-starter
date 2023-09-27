const http = require('../service/http')

// 获取用户的OpenId
const getOpenId = (data) => {
    return http._get(`/user/getOpenId?codeId=${data}`)
}

// 微信授权登录
const wxUserLogin = (data) => {
    return http._post('/user/wxUserLogin', data)
}

// 获取用户信息
const getUserInfo = () => {
    return http._get('/user/getUserInfo')
}

module.exports = {
    getOpenId,
    wxUserLogin,
    getUserInfo
}