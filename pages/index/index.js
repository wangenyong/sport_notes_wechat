//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sports: [
      {
        time: '52',
        unit: '分钟',
        label: '有氧运动',
        date: '23/3/18 周五'
      },
      {
        time: '1.2',
        unit: '小时',
        label: '上肢力量',
        date: '22/3/18 周四'
      },
      {
        time: '48',
        unit: '分钟',
        label: '腿部力量',
        date: '19/3/18 周一'
      }
    ]
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
    let label = e.currentTarget.dataset.label;
    console.log(label);

    wx.navigateTo({
      url: '../sportDetail/sportDetail',
    })
  },

  onLoad: function () {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onNewSport: function () {
    wx.navigateTo({
      url: '../sportAdd/sportAdd'
    })
  },
})
