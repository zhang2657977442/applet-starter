const baseUrl = 'http://localhost:8080/api';
const http = ({
    url = '',
    param = {},
    ...other
} = {}) => {
    // wx.showLoading({
    //     title: '加载中'
    // });
    let timeStart = Date.now();
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            data: param,
            header: {
                'content-type': 'application/json',
                // JWT鉴权标识
                'token': wx.getStorageSync('token')
            },
            ...other,
            complete: (res) => {
                // wx.hideLoading();
                console.log(`耗时${Date.now() - timeStart}ms`);
                if (res.statusCode === 200) {
                    // 判断token是否已经失效
                    if (res.data.code === 40100) {
                        // 清除登录状态
                        getApp().Logout()
                        wx.showToast({
                            title: '登录失效，请重新登录',
                            icon: 'none',
                        })
                        // 重定向登录页面
                        setTimeout(() => {
                            wx.switchTab({
                                url: '/pages/center/index'
                            })
                        }, 1500)

                    }
                    resolve(res.data)
                } else {
                    reject(res)
                    // 统一进行错误提示
                    wx.showToast({
                        title: '网络繁忙',
                        icon: 'error',
                    })
                }
            }
        })
    })
}


const _get = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'get'
    })
}

const _post = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post'
    })
}

const _put = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}

const _delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'delete'
    })
}
module.exports = {
    _get,
    _post,
    _put,
    _delete
}