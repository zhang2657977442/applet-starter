const userApi = require('../../apis/user')
import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
  },

  onLoad() {
    // 如果已登录，去本地存储取用户信息
    if (app.globalData.isLogin) {
      this.setData({
        hasUserInfo: true,
        userInfo: wx.getStorageSync('userInfo')
      })
    }
  },
  onShow() {
    this.getTabBar().init();
    if (!app.globalData.isLogin) {
      this.setData({
        userInfo: null,
        hasUserInfo: false,
      })
    } else {
      this.getUserInfo()
    }
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // 微信授权登录接口
        userApi.wxUserLogin({
          avatar: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          // 从本地存储中取出openId
          openid: wx.getStorageSync('openId')
        }).then((_res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // 本地存储token和userInfo
          wx.setStorageSync("token", _res.data.token);
          wx.setStorageSync("userInfo", res.userInfo)
          app.globalData.userInfo = res.userInfo
          app.globalData.isLogin = true
          // 获取用户详细信息
          this.getUserInfo()
        })
      }
    })
  },
  toNavigate(e) {
    if (e.currentTarget.dataset.value == 'person') {
      const obj = JSON.stringify(this.data.userInfo)
      wx.navigateTo({
        url: `/pages/center/${e.currentTarget.dataset.value}/index?obj=` + obj
      })
    } else {
      wx.navigateTo({
        url: `/pages/center/${e.currentTarget.dataset.value}/index`
      })
    }

  },
  showDialog() {
    const dialogConfig = {
      context: this,
      title: '确定要退出登录？',
      content: '',
      confirmBtn: '确定',
      cancelBtn: '取消',
    };

    Dialog.confirm(dialogConfig)
      .then(() => this.logout())
      .catch(() => console.log('点击了取消'))
      .finally(() => Dialog.close());
  },


  // 退出登录
  logout() {
    app.Logout()
    this.setData({
      userInfo: null,
      hasUserInfo: false,
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: '退出登录成功',
      theme: 'success',
      direction: 'column',
    });
  },

  // 获取用户详细信息
  getUserInfo() {
    userApi.getUserInfo().then((res) => {
      this.setData({
        'userInfo.id': res.data.id,
        'userInfo.role': res.data.role,
        'userInfo.registerDate': res.data.registerDate,
      })
    })
  },

})