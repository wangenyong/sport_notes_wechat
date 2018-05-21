//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sports: [],
    refresh: false,
    sessionId: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 列表点击
   */
  bindItemClick: function (e) {
    var model = JSON.stringify(e.currentTarget.dataset.sport);
    wx.navigateTo({
      url: '../sportDetail/sportDetail?model=' + model,
    })
  },

  /**
   * 从网络获取运动记录数据
   */
  getSportNotes: function () {
    var that = this;
    wx.request({
      url: 'https://wangenyong.com/sports',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'sessionId': that.data.sessionId
      },
      success: res => {
        that.setData({
          sports: res.data
        });
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 登录
   */
  login: function () {
    var that = this
    // 显示登录Loading
    wx.showLoading({
      title: 'Loading',
    })

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://wangenyong.com/user/authorization', // 这个接口写于后端，用于向微信服务器 换取 session_key 和 openId 的接口
          method: 'POST',
          data: {
            code: res.code // 将wx.login()返回 code 传至第三方服务器
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            // 设置全局及此页面SessionId
            app.globalData.sessionId = res.data.wxtoken
            that.setData({
              sessionId: res.data.wxtoken
            })
            // 本地存储SessionId
            wx.setStorage({
              key: '3rd_session',
              data: res.data.wxtoken,
            });
            // 拉取列表数据
            wx.startPullDownRefresh()
          },
          fail: err => {
            console.log(err)
          }
        })
      }, 
      fail: err => {
        console.log(err);
      },
      complete: () => {
        // 隐藏登录Loading
        wx.hideLoading()
      }
    })
  },

  onLoad: function () {
    var that = this;
    if (app.globalData.sessionId) {
      this.setData({
        sessionId: app.globalData.sessionId
      })
      wx.checkSession({
        success: () => {
          wx.startPullDownRefresh()
        },
        fail: () => {
          that.login()
        }
      })
    } else {
      that.login()
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function (options) {
    if (this.data.refresh) {
      wx.startPullDownRefresh();
      this.setData({
        refresh: false
      })
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    this.getSportNotes();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 创建新的运动数据
  onNewSport: function () {
    wx.navigateTo({
      url: '../sportAdd/sportAdd'
    })
  },
})
