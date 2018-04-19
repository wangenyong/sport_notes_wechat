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
        duration: '52',
        duration_suffix: '分钟',
        category: '有氧运动',
        date: '23/3/18 周五'
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
    let category = e.currentTarget.dataset.category;
    console.log(category);

    wx.navigateTo({
      url: '../sportDetail/sportDetail',
    })
  },

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
    // Do something when show.
  },

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
