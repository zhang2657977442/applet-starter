const userApi = require('./apis/user')
App({
  globalData: {
    userInfo: null,
    isLogin: false
  },
  onLaunch() {
    // 判断登录状态
    this.globalData.isLogin = wx.getStorageSync('token') !== ''
    // 未登录
    if (!this.globalData.isLogin) {
      wx.login({
        success(res) {
          if (res.code) {
            // 使用codeId 去后台获取 openId sessionKey
            userApi.getOpenId(res.code).then((res) => {
              // 储存在本地
              wx.setStorageSync("openId", res.data.openid);
              wx.setStorageSync("session_key ", res.data.session_key);
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  // 退出登录
  Logout() {
    this.globalData.userInfo = null
    this.globalData.isLogin = false
    wx.removeStorage({
      key: "token"
    })
    wx.removeStorage({
      key: "userInfo"
    })
  },
})