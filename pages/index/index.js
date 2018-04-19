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
    refresh: false
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
      url: 'http://localhost:3000/sports',
      method: 'GET',
      success: function (res) {
        that.setData({
          sports: res.data
        });
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })
  },

  onLoad: function () {
    wx.startPullDownRefresh();

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
  onNewSport: function () {
    wx.navigateTo({
      url: '../sportAdd/sportAdd'
    })
  },
})
